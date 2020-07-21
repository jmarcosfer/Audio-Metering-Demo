// Audio Constants
const ctx = new (window.AudioContext || window.webkitAudioContext);
const SR = ctx.sampleRate;
// frame generator params (match momentaryLoudness: 400ms, 0.1s hopSize)
const frameSize = SR * 0.4;
const hopSize = SR * 0.1;


// Instantiate Essentia
let essentia;
EssentiaModule().then((EssentiaWasmModule) => {
	essentia = new Essentia(EssentiaWasmModule);
	console.log(essentia.version);
})

// UTILITY FUNCTIONS

// Audio Processing
function phaseCorr(frameLeft, frameRight) {
	// convert to float32array
	const L = essentia.vectorToArray(frameLeft);
	const R = essentia.vectorToArray(frameRight);

	const n = L.length;
	if (n == 0) return null;

	let sumL = 0,
		sumR = 0,
		sumLR = 0,
		sumL2 = 0,
		sumR2 = 0;
	
	// compute sums
	L.forEach((Li, i) => {
		const Ri = R[i];
		sumL += Li;
		sumR += Ri;
		sumLR += Li * Ri;
		sumL2 += Li * Li;
		sumR2 += Ri * Ri;
	});

	return (n * sumLR - sumL * sumR) / Math.sqrt((n * sumL2 - sumL * sumL) * (n * sumR2 - sumR * sumR));

}

async function analyseAudio(f) {
	let descriptors = new Object();

	// Decode Audio File
	const buffer = await f.arrayBuffer();
	const decodedAudio = await ctx.decodeAudioData(buffer);

	// Separate channels needed for phase correlation
	const leftChannelArray = decodedAudio.getChannelData(0);
	const rightChannelArray = decodedAudio.getChannelData(1);

	// Sum into mono track:
	let monoSumArray = leftChannelArray.map(function(sample, idx) {
		return (sample + rightChannelArray[idx]) / 2
	});
	descriptors.mono = monoSumArray;

	// Cut frames
	const framesLeft = essentia.FrameGenerator(leftChannelArray, frameSize, hopSize);
	const framesRight = essentia.FrameGenerator(rightChannelArray, frameSize, hopSize);
	const framesMono = essentia.FrameGenerator(monoSumArray, frameSize, hopSize);

	const monoRMS = [];
	const phaseCorrelation = [];
	for (let i=0; i<framesLeft.size(); i++) {
		const leftFrame = framesLeft.get(i);
		const rightFrame = framesRight.get(i);
		const monoFrame = framesMono.get(i);
		// RMS:
		monoRMS.push(
			essentia.RMS(monoFrame).rms
		);
		// Phase Correlation:
		phaseCorrelation.push(
			phaseCorr(leftFrame, rightFrame)
		);
	}
	descriptors.rms = Float32Array.from(monoRMS);
	descriptors.phaseCorrelation = Float32Array.from(phaseCorrelation);

	// Loudness EBUR128:
	const leftChannelVector = essentia.arrayToVector(leftChannelArray);
	const rightChannelVector = essentia.arrayToVector(rightChannelArray);
	const loudnessEBU = essentia.LoudnessEBUR128(leftChannelVector, rightChannelVector, 0.1, SR);

	descriptors.momentaryLoudness = essentia.vectorToArray(loudnessEBU.momentaryLoudness);
	descriptors.shortTermLoudness = essentia.vectorToArray(loudnessEBU.shortTermLoudness);
	descriptors.integratedLoudness = loudnessEBU.integratedLoudness;
	descriptors.loudnessRange = loudnessEBU.loudnessRange;
	
	return descriptors;
}


function drawAudio(descriptors) {
	/* Visualise descriptors on #audio-container */
	// Grab container ref from DOM:
	const channelTop = document.querySelector("#waveform");
	const channelBottom = document.querySelector("#loudness-data");

	// Instantiate FAV.js objects
	const displayTop = new fav.Display("waveform", "wave", channelTop.clientWidth, channelTop.clientHeight);
	const displayBottom = new fav.Display("loudness-data", "line", channelBottom.clientWidth, channelBottom.clientHeight);
	displayBottom.addLayer("line");
	displayBottom.addLayer("line");

	console.log(descriptors);
	let wave = new fav.Signal(descriptors.mono, SR);
	let phase = new fav.Signal(descriptors.phaseCorrelation, SR/hopSize);
	let rms = new fav.Signal(descriptors.rms, SR/hopSize);
	let mLoudness = new fav.Signal(descriptors.momentaryLoudness, SR/hopSize);
	let stLoudness = new fav.Signal(descriptors.shortTermLoudness, SR/hopSize);

	wave.smooth(20).draw(displayTop, 
		[phase.scale(60).offset(60).smooth(10),
			100,
			rms.normalize().reflect().scale(80).offset(15).smooth(15)
		]);

	rms.normalize().smooth(20).draw(displayBottom[0],
		"rgba(149, 0, 255, 0.5)"
		); // light purple
	mLoudness.normalize().smooth(20).draw(displayBottom[1],
		"rgba(255, 255, 255, 0.5)"
		); // white
	stLoudness.normalize().smooth(20).draw(displayBottom[2],
		"rgba(31, 244, 255, 0.5)"
		); // light blue
}


// Event Handlers

function dragOverHandler(e) {
	e.preventDefault();
}

function fileUploadHandler(e) {
	e.preventDefault();

	let numFiles = null;
	let file;
	// Get file from drag event
	if (e.type == "change") numFiles = e.target.files.length;
	if (e.type == "drop") numFiles = e.dataTransfer.files.length;
	if (numFiles == 1) {
		if (e.type == "change") file = e.target.files[0];
		if (e.type == "drop") file = e.dataTransfer.files[0];
		// Check that it's an audio file
		if (file.type.indexOf("audio") >= 0) {
			// Audio Processing:
			console.log(`Got file named ${file.name}`);
			analyseAudio(file)
			.then(drawAudio)
			.catch((e) => { console.log(`Error in handling promise: ${e}`) });

			// Styling:

		} else {
			alert("We couldn't accept your file. Make sure you're uploading an audio file");
		}
	} else if (numFiles > 1) {
		alert("Sorry, you can only upload 1 file at a time. Try again.");
	} else {
		alert("0 files were provided. Please upload a file.")
	}
}


// Main block
(function() {
	const dropZone = document.querySelector(".drop-zone");
	const uploadButton = document.querySelector("#upload");

	// Drag n drop listeners
	dropZone.addEventListener("dragover", dragOverHandler);
	dropZone.addEventListener("drop", fileUploadHandler);

	// Select file button listener
	uploadButton.addEventListener("change", fileUploadHandler);
})();