// App Globals
let appData = {
	// Audio Constants
	ctx: new (window.AudioContext || window.webkitAudioContext),
	init: () => {
		appData.SR = appData.ctx.sampleRate;
		// frame generator params (match momentaryLoudness: 400ms, 0.1s hopSize)
		appData.frameSize = appData.SR * 0.4;
		appData.hopSize = appData.SR * 0.1;
	},
	decodedAudio: null,
	uploadedFile: null,
	descriptors: null,
	bufferNode: null,
	playbackState: "stopped",
	playStartTime: null,
	pausedTime: null,
	cursorCanvas: null
};
appData.init();

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
	const decodedAudio = await appData.ctx.decodeAudioData(buffer);
	appData.decodedAudio = decodedAudio;

	// Separate channels needed for phase correlation
	const leftChannelArray = decodedAudio.getChannelData(0);
	const rightChannelArray = decodedAudio.getChannelData(1);

	// Sum into mono track:
	let monoSumArray = leftChannelArray.map(function(sample, idx) {
		return (sample + rightChannelArray[idx]) / 2
	});
	descriptors.mono = monoSumArray;

	// Cut frames
	const framesLeft = essentia.FrameGenerator(leftChannelArray, appData.frameSize, appData.hopSize);
	const framesRight = essentia.FrameGenerator(rightChannelArray, appData.frameSize, appData.hopSize);
	const framesMono = essentia.FrameGenerator(monoSumArray, appData.frameSize, appData.hopSize);

	const monoRMS = [];
	const phaseCorrelation = [];
	for (let i=0; i<framesLeft.size(); i++) {
		const leftFrame = framesLeft.get(i);
		const rightFrame = framesRight.get(i);
		const monoFrame = framesMono.get(i);
		// RMS:
		monoRMS.push(
			20 * Math.log10(Math.abs(essentia.RMS(monoFrame).rms)) // linear amp converted to dBFS
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
	const loudnessEBU = essentia.LoudnessEBUR128(leftChannelVector, rightChannelVector, 0.1, appData.SR);

	descriptors.momentaryLoudness = essentia.vectorToArray(loudnessEBU.momentaryLoudness);
	descriptors.shortTermLoudness = essentia.vectorToArray(loudnessEBU.shortTermLoudness);
	descriptors.integratedLoudness = loudnessEBU.integratedLoudness;
	descriptors.loudnessRange = loudnessEBU.loudnessRange;
	
	appData.descriptors = descriptors;
	return descriptors;
}

// Visuals
function drawAudio(descriptors) {
	/* Visualise descriptors on #audio-container */
	// Grab container ref from DOM:
	const channelTop = document.querySelector("#waveform");
	const channelBottom = document.querySelector("#loudness-data");

	// Instantiate FAV.js objects
	const displayTop = new fav.Display("waveform", "wave", channelTop.clientWidth, channelTop.clientHeight);
	const displayBottom = new fav.Display("loudness-data", "fill", channelBottom.clientWidth, channelBottom.clientHeight);
	displayBottom.addLayer("fill");
	displayBottom.addLayer("fill");

	console.log(descriptors);
	let wave = new fav.Signal(descriptors.mono, appData.SR);
	let phase = new fav.Signal(descriptors.phaseCorrelation, appData.SR/appData.hopSize);
	let rms = new fav.Signal(descriptors.rms, appData.SR/appData.hopSize);
	let mLoudness = new fav.Signal(descriptors.momentaryLoudness, appData.SR/appData.hopSize);
	let stLoudness = new fav.Signal(descriptors.shortTermLoudness, appData.SR/appData.hopSize);

	wave.smooth(20).draw(displayTop, 
		[phase.scale(60).offset(60).smooth(10),
			100,
			rms.normalize().scale(65).offset(8).smooth(15)
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
	
	// Canvas Events:
	appData.cursorCanvas = document.querySelector("#loudness-data").lastChild;
	appData.cursorCanvas.addEventListener("mousemove", mousemoveCanvasHandler);
}

// Playback
function playSound() {
	appData.bufferNode = appData.ctx.createBufferSource();
	appData.bufferNode.buffer = appData.decodedAudio;
	appData.bufferNode.connect(appData.ctx.destination);

	if (appData.pausedTime != null && appData.playbackState === "paused") {
		appData.playStartTime = Date.now() - appData.pausedTime;
		appData.bufferNode.start(0, appData.pausedTime / 1000);
	} else {
		appData.playStartTime = Date.now();
		appData.bufferNode.start(0);
	}
	
	appData.playbackState = "playing";
}

function pauseSound() {
	appData.bufferNode.stop(0);
	appData.playbackState = "paused";
	appData.pausedTime = Date.now() - appData.playStartTime;
}


// Event Handlers

function playPauseHandler(e) {
	if (appData.ctx.state === "suspended") {
		appData.ctx.resume();
	}

	if (appData.playbackState === "stopped" || appData.playbackState === "paused") {
		playSound();
		e.target.classList.remove("stopped");
		e.target.classList.add("playing");
	} else if (appData.playbackState === "playing") {
		pauseSound();
		e.target.classList.remove("playing");
		e.target.classList.add("stopped");
	}
	// switch css class for "playing"
	
}

function stopHandler(e) {
	// call stopSound() if appData.playBackState = "paused" or "playing"
	if (appData.playbackState === "paused" || appData.playbackState === "playing") {
		appData.bufferNode.stop(0);
		appData.pausedTime = null;
		appData.playbackState = "stopped";
	}
}

function dragOverHandler(e) {
	e.preventDefault();
}

function fileUploadHandler(e) {

	let numFiles = null;
	let file;
	// Get file from drag event
	if (e.type == "change") numFiles = e.target.files.length;
	if (e.type == "drop") {numFiles = e.dataTransfer.files.length; e.preventDefault();}
	if (numFiles == 1) {
		if (e.type == "change") file = e.target.files[0];
		if (e.type == "drop") file = e.dataTransfer.files[0];
		// Check that it's an audio file
		if (file.type.indexOf("audio") >= 0) {
			appData.uploadedFile = file;
			// Audio Processing:
			console.log(`Got file named ${file.name}`);
			analyseAudio(file)
			.then(drawAudio)
			.catch((e) => { console.log(`Error in handling promise: ${e}`) });

		} else {
			alert("We couldn't accept your file. Make sure you're uploading an audio file");
		}
	} else if (numFiles > 1) {
		alert("Sorry, you can only upload 1 file at a time. Try again.");
	} else {
		alert("0 files were provided. Please upload a file.")
	}
}

function mousemoveCanvasHandler(e) {
	const dataDisplay = document.querySelector("#data-display");
	let rect = e.target.getBoundingClientRect();
	let x = e.clientX - rect.left;
	let normMousePos = x / e.target.clientWidth;

	let mLoudnessIdx = Math.floor(normMousePos * (appData.descriptors.momentaryLoudness.length - 1) );
	let stLoudnessIdx = Math.floor(normMousePos * (appData.descriptors.shortTermLoudness.length - 1) );
	let rmsIdx = Math.floor(normMousePos * (appData.descriptors.rms.length - 1) );
	let phaseIdx = Math.floor(normMousePos * (appData.descriptors.phaseCorrelation.length - 1) );
	
	let mLoudnessStr = `Momentary loudness: ${appData.descriptors.momentaryLoudness[mLoudnessIdx]} LUFS`;
	let stLoudnessStr = `Short Term loudness: ${appData.descriptors.shortTermLoudness[stLoudnessIdx]} LUFS`;
	let rmsStr = `RMS loudness: ${appData.descriptors.momentaryLoudness[rmsIdx]} dbFS`;
	let phaseStr = `Phase correlation: ${appData.descriptors.phaseCorrelation[phaseIdx]}\n (-1: out-of-phase\n 0: decorrelated, full stereo width\n 1: correlated, false stereo)`;
	
	dataDisplay.innerHTML = `<div> ${mLoudnessStr} </div> <div> ${stLoudnessStr} </div> <div> ${rmsStr} </div> <div> ${phaseStr}`;
}

// Main block
(function() {
	// GRAB ELEMENTS
	const dropZone = document.querySelector(".drop-zone");
	const uploadButton = document.querySelector("#upload");
	const playButton = document.querySelector("#play-pause");
	const stopButton = document.querySelector("#stop");

	// SET LISTENERS
	// Drag n drop
	dropZone.addEventListener("dragover", dragOverHandler);
	dropZone.addEventListener("drop", fileUploadHandler);

	// Select file button
	uploadButton.addEventListener("change", fileUploadHandler);

	// Play
	playButton.addEventListener("click", playPauseHandler);
	// Stop
	stopButton.addEventListener("click", stopHandler);
})();