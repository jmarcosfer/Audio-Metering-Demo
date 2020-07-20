// Instantiate Essentia
let essentia;
EssentiaModule().then((EssentiaWasmModule) => {
	essentia = new Essentia(EssentiaWasmModule);
	console.log(essentia.version);
})

// UTILITY FUNCTIONS
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
			const ctx = new (window.AudioContext || window.webkitAudioContext);
			console.log(`Got file named ${file.name}`);
			analyseAudio(file, ctx).then(drawAudio);

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

async function analyseAudio(f, context) {
	let descriptors = new Object();
	const SR = context.sampleRate;
	// frame generator params (match momentaryLoudness: 400ms, 0.1s hopSize)
	const frameSize = SR * 0.4;
	const hopSize = SR * 0.1;

	// Decode Audio File
	const buffer = await f.arrayBuffer();
	const decodedAudio = await context.decodeAudioData(buffer);

	const leftChannelArray = decodedAudio.getChannelData(0);
	const rightChannelArray = decodedAudio.getChannelData(1);
	const leftChannelVector = essentia.arrayToVector(leftChannelArray);
	const rightChannelVector = essentia.arrayToVector(rightChannelArray); 

	const framesLeft = essentia.FrameGenerator(leftChannelArray, frameSize, hopSize);
	const framesRight = essentia.FrameGenerator(rightChannelArray, frameSize, hopSize);

	descriptors.leftRMS = [];
	descriptors.rightRMS = [];
	descriptors.phaseCorrelation = [];
	for (let i=0; i<framesLeft.size(); i++) {
		const leftFrame = framesLeft.get(i);
		const rightFrame = framesRight.get(i);
		// RMS:
		descriptors.leftRMS.push(
			essentia.RMS(leftFrame).rms
		);
		descriptors.rightRMS.push(
			essentia.RMS(rightFrame).rms
		);
		// Phase Correlation:
		descriptors.phaseCorrelation.push(
			phaseCorr(leftFrame, rightFrame)
		);
	}

	// Loudness EBUR128:
	const loudnessEBU = essentia.LoudnessEBUR128(leftChannelVector, rightChannelVector, 0.1, SR);

	descriptors.momentaryLoudness = essentia.vectorToArray(loudnessEBU.momentaryLoudness);
	descriptors.shortTermLoudness = essentia.vectorToArray(loudnessEBU.shortTermLoudness);
	descriptors.integratedLoudness = loudnessEBU.integratedLoudness;
	descriptors.loudnessRange = loudnessEBU.loudnessRange;
	
	return descriptors;
}


function drawAudio(signal) {
	/* Visualise descriptors on #audio-container */
	console.log("Computed descriptors. Ready to draw!");
	console.log(`PhaseCorr: \n ${signal.phaseCorrelation}`);
}


// Main block
(function() {
	const dropZone = document.querySelector(".drop-zone");

	// Drag n drop listeners
	dropZone.addEventListener("dragover", dragOverHandler);
	dropZone.addEventListener("drop", dropHandler);
})();