# tts_basics_for_revealjs
Add text-to-speech to your reveal.js slideshow and have your slides read out loud with this plug-in.
The plug-in works for current versions of Chrome and Firefox as tested on Windows OS.

The plug-in adds some initialization code to use the "default" tts voice to read the innertext of elements you can specify. It works by using the Reveal "slidechanged" and "fragmentshown" events to start tts reading. A delay can be added to the slidechanged event to allow visual transitions to conclude before reading starts. 1 second works fine.
The plug-in can be added in the same way as other reveal.js plug-ins inside the dependencies part of the script tag towards the end of the slideshow page's body as shown:

Note that after the dependencies part of Reveal.initialize and before the end of the script tag there is a ready event listener added so that the first slide can be read outloud. You can also see how to specify what and in what order text gets read. the function ttsReadElemmentListOfObject takes a DOM element as its first argument, in this case the current slide. The list of identifiers that follows define the order and type of elements that will be queried for text to read. The case shown is a list of typical tags used in a reveal slideshow. You could define your own ".readMe1", ".readMe2" classes to specify what to read and in what order. This way some text could be left visible and unread outloud.   

The tts_min_reveal.js script is pretty minimal. It only addresses the bare minimum parameters for using the HTML 5 speech synthesis API (https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) to make slideshows talk using both Firefox and Chrome. Because I chose to use the "default" voice, I hope that this script will work in languages other than English without any tweeking. There are a few self explainatory parameters in the tts_min_reveal.js you can fiddle with at the beginning of the script.
