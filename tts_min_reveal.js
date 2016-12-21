var ttsSynth = window.speechSynthesis;
var ttsVoices = [];
ttsVoices = ttsSynth.getVoices();
var ttsDvIndex = 0; //Used to help identify the default tts voice for Chrome or FF on the users platform.
var ttsDvRate = 0.85; // used to set speech rate between 0 and 2, 1 = 'normal'- there are other seemingly optional parameters like pitch, language, volume.
var ttsCancel = true; // Set to true if you want reading to stop with a slide change. Otherwise, all readable text is queued for speech output.

for (var ix = 0; ix < ttsVoices.length; ix++) { 
//find the default voice-- needed for FF, in Chrome voices[0] works as the default.
	if (ttsVoices[ix].default) {
		ttsDvIndex = ix;
	}
}

function ttsReadText(txt) { 
// Use tts to read txt. You need to create a new utterance instance for each tts output for FF.
// Chrome lets you redefine the SpeechSynthesizerUtterance.txt property
// as needed without having to create a new object every time you want speech.
	let ttsSpeaker = new SpeechSynthesisUtterance(txt);
	 ttsSpeaker.voice = ttsVoices[ttsDvIndex]; //use default voice -- some voice must be assigned for FF to work.
     ttsSpeaker.rate = ttsDvRate; 
     ttsSynth.speak(ttsSpeaker);
}

function ttsReadElementListOfObject() {
	// Uses arguments[0] to denote a DOM object . Then read the innerText of the rest of the list of selectors that are contained in the arguments[0] object.
	// works in Chrome and FF. 
	let focusElmt = arguments[0];
	for (let i=1; i < arguments.length; i++) {
		let xElmts = focusElmt.querySelectorAll(arguments[i]);
		for (let k=0; k < xElmts.length; k++){
			ttsReadText(xElmts[k].innerText);
		}
	}
}


	
Reveal.addEventListener( 'slidechanged', function( event ) {
	var thisSlide = Reveal.getCurrentSlide();
	if (ttsCancel) ttsSynth.cancel();
	// Read the innerText for the listed elements of current slide after waiting 1 second to allow transitions to conclude.
	// We'll read a list of tags here in the order shown. You can use other selectors like a ".readMe" class.
	setTimeout(function(){ttsReadElementListOfObject(thisSlide,"h1","h2","h3","p","li");}, 1000);
	} );
	
Reveal.addEventListener( 'fragmentshown', function( event ) {
// This reads the text content of fragments as they are shown.
// event.fragment = the fragment DOM element
	let txt = event.fragment.textContent;
	ttsReadText(txt);
	} );
			