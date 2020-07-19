// Instantiate Essentia
let essentia;
EssentiaModule().then((EssentiaWasmModule) => {
	essentia = new Essentia(EssentiaWasmModule);
	console.log(essentia.version);
})

// Utility functions
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
			analyseAudio(file, ctx).then(function(signal) {
				drawAudio(signal);
			});

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

function drawAudio(signal) {
	/* Visualise descriptors on #audio-container */

}

async function analyseAudio(f, context) {
	/*
		- Decode audio file (audioCtx?)
		- Compute descriptors: Loudness R128, RMS, Phase Correlation
	*/

	const buffer = await f.arrayBuffer();
	const decodedAudio = await context.decodeAudioData(buffer);

	const leftChannelArray = decodedAudio.getChannelData(0);
	const rightChannelArray = decodedAudio.getChannelData(1);
	const leftChannelVector = essentia.arrayToVector(leftChannelArray);
	const rightChannelVector = essentia.arrayToVector(rightChannelArray); 

	// RMS:
	const leftRMS = essentia.RMS(leftChannelVector);
	const rightRMS = essentia.RMS(rightChannelVector);
	console.log(`Computed RMS: ${leftRMS.rms}\n ${rightRMS.rms}`);

	const loudnessEBU = essentia.LoudnessEBUR128(leftChannelVector, rightChannelVector, 0.1, context.sampleRate);
	console.log(`Computed momentary loudness: ${loudnessEBU.shortTermLoudness}`);
}

// Main block
(function() {
	const dropZone = document.querySelector(".drop-zone");

	// Drag n drop listeners
	dropZone.addEventListener("dragover", dragOverHandler);
	dropZone.addEventListener("drop", dropHandler);
})();