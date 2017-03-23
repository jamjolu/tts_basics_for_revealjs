var tts = {};
tts.Synth = window.speechSynthesis;
tts.Voices = [];
tts.Voices = tts.Synth.getVoices(); // get a list of available voices.
tts.DvIndex = 0; //Used to help identify the default tts voice for Chrome or FF on the users platform.
tts.DvRate = 0.85; // used to set speech rate between 0 and 2, 1 = 'normal'- there are other seemingly optional parameters like pitch, language, volume.
tts.On = true; //Set to false to prevent tts production.

tts.ReadText = function(txt){
	// Use tts to read text. A new speech synthesis utterance instance is required for each tts output for FF.
	// Chrome lets you redefine the SpeechSynthesizerUtterance.txt property-
	// as needed without having to create a new object every time you want speech.
	let ttsSpeechChunk = new SpeechSynthesisUtterance(txt);
	 ttsSpeechChunk.voice = tts.Voices[tts.DvIndex]; //use default voice -- some voice must be assigned for FF to work.
     ttsSpeechChunk.rate = tts.DvRate; 
     tts.Synth.speak(ttsSpeechChunk);	 
};

tts.ReadVisElmts = function(){
	// Uses arguments[0] to denote a DOM element . Then read the innerText of the rest of the list of selectors that are contained in the arguments[0] element.
	// works in Chrome, Opera and FF.
	let focusElmt = arguments[0];
	for (let i=1; i < arguments.length; i++) {
		let xElmts = focusElmt.querySelectorAll(arguments[i]);
		for (let k=0; k < xElmts.length; k++){
			tts.ReadText(xElmts[k].innerText);
		}
	}
	
};

tts.ReadAnyElmts = function(){
	// Uses arguments[0] to denote a DOM element . Then read the textContent of the rest of the list of selectors, even hidden ones, that are contained in the arguments[0] element.
	// works in Chrome, Opera and FF.
	let focusElmt = arguments[0];
	for (let i=1; i < arguments.length; i++) {
		let xElmts = focusElmt.querySelectorAll(arguments[i]);
		for (let k=0; k < xElmts.length; k++){
			tts.ReadText(xElmts[k].textContent);
		}
	}
	
};

tts.ToggleSpeech = function(){
	// turn tts on/off with status announced - This doesn't affect any of the read functions here but can be used in other useer defined functions.
	tts.On = !(tts.On);
	if (tts.On) {
		tts.ReadText("speech On!")
	} else {
		tts.Synth.cancel();
		tts.ReadText("speech Off!")
	};
};



for (var ix = 0; ix < tts.Voices.length; ix++) { 
//find the default voice-- needed for FF, in Chrome voices[0] works as the default.
	if (tts.Voices[ix].default) {
		tts.DvIndex = ix;
	}
};
