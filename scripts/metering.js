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

	const leftChannelArray = decodedAudio.getChannelData(0);
	const rightChannelArray = decodedAudio.getChannelData(1);
	const leftChannelVector = essentia.arrayToVector(leftChannelArray);
	const rightChannelVector = essentia.arrayToVector(rightChannelArray);
	descriptors.left = leftChannelArray;
	descriptors.right = rightChannelArray;

	const framesLeft = essentia.FrameGenerator(leftChannelArray, frameSize, hopSize);
	const framesRight = essentia.FrameGenerator(rightChannelArray, frameSize, hopSize);

	const leftRMS = [];
	const rightRMS = [];
	const phaseCorrelation = [];
	for (let i=0; i<framesLeft.size(); i++) {
		const leftFrame = framesLeft.get(i);
		const rightFrame = framesRight.get(i);
		// RMS:
		leftRMS.push(
			essentia.RMS(leftFrame).rms
		);
		rightRMS.push(
			essentia.RMS(rightFrame).rms
		);
		// Phase Correlation:
		phaseCorrelation.push(
			phaseCorr(leftFrame, rightFrame)
		);
	}
	descriptors.leftRMS = Float32Array.from(leftRMS);
	descriptors.rightRMS = Float32Array.from(rightRMS);
	descriptors.phaseCorrelation = Float32Array.from(phaseCorrelation);

	// Loudness EBUR128:
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
	const audioContainer = document.querySelector("#audio-container");

	// Instantiate FAV.js objects
	const display = new fav.Display("audio-container", "wave", audioContainer.clientWidth, audioContainer.clientHeight);

	console.log(descriptors);
	let wave = new fav.Signal(descriptors.left, SR);
	let phase = new fav.Signal(descriptors.phaseCorrelation, SR/hopSize);

	wave.smooth(20).draw(display, 
		[phase.scale(60).offset(60).smooth(10),
			100,
			50
		]);
}


// Event Handlers
function dragOverHandler(e) {
	e.preventDefault();
}

function dropHandler(e) {
	e.preventDefault();

	// Get file from drag event
	const numFiles = e.dataTransfer.files.length
	if (numFiles == 1) {
		const file = e.dataTransfer.files[0];
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

	// Drag n drop listeners
	dropZone.addEventListener("dragover", dragOverHandler);
	dropZone.addEventListener("drop", dropHandler);
})();