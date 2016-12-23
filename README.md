# tts_basics_for_revealjs
##What does it do?
Add text-to-speech to your reveal.js slideshow and have your slides read out loud with this plug-in.
The plug-in works for current versions of Chrome and Firefox as tested on Windows OS.
The plug-in adds some initialization code to use the "default" tts voice to read the innertext of elements you can specify. It works by using the Reveal "slidechanged" and "fragmentshown" events to start tts reading. The default setup will read the typical text that appears on slides except code segments. A delay can be added to the slidechanged event to allow visual transitions to conclude before reading starts. The default 1 second works fine.

##How do you include it into your Reavel.js Slideshow?
The plug-in can be added in the same way as other reveal.js plug-ins inside the dependencies part of the script tag towards the end of the slideshow page's body tag as shown below. Note the location of the tts_min_reveal.js file in the plugin/tts_min directory. This code fragment is from the reveal_tts_demo.html:
```javascript
<script>
			// More info https://github.com/hakimel/reveal.js#configuration
			Reveal.initialize({
				controls: true,
				progress: true,
				history: true,
				center: true,
				transition: 'slide', // none/fade/slide/convex/concave/zoom

				// More info https://github.com/hakimel/reveal.js#dependencies
				dependencies: [
					{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
					{ src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
					{ src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
					{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
					{ src: 'plugin/zoom-js/zoom.js', async: true },
					{ src: 'plugin/notes/notes.js', async: true },
					{ src: 'plugin/tts_min/tts_min_reveal.js', async: true} // Add text to speech for Chrome, FF using default voice.
				]
			});
			
			Reveal.addEventListener( 'ready', function( event ) {
			// Read the opening slide.
			// event.currentSlide, event.indexh, event.indexv
				var thisSlide = Reveal.getCurrentSlide();
				// Read the innerText for the listed elements of current slide after waiting 1 second to allow transitions to conclude.
				setTimeout(function(){ttsReadElementListOfObject(thisSlide,"h1","h2","h3","p","li");}, 1000);
			} );
		</script>
```
## How does it work and how can you modify how it works?
Note that after the dependencies part of Reveal.initialize, and just before the end of the script tag there is a ready event listener added so that the first slide can be read outloud. The ready event listener illustrates how to specify which text, and in what order text gets read on a slide. the function ttsReadElementListOfObject takes a DOM element as its first argument, in this case the current slide object. The list of identifiers that follows define the order and type of elements from that slide that will be queried for text to read. The case shown is a list of typical tags used in a reveal slideshow.  Without making any changes to the tts_min_reveal.js file The text that appears in h1, h2, h3, p and li tags will be read in that order with a 1 second delay when the slides change.  There is also a routine that reads the text content of fragments as they are shown. This allows for reading most slide text, but not code segments. Also, because only the innerText of current slide object is queried only visible text is read. You could edit the ttsReadElementListOfObject call in the slidechanged event listener of tts_min_reveal.js to query your own ".readMe1", ".readMe2" classes to specify which text to read and in what order. This way you could chose some text to be visible and not read.

The tts_min_reveal.js script is meant to be minimal. It only addresses the bare minimum of parameters needed for using the HTML 5 speech synthesis API (https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) to make slideshows talk using both Firefox and Chrome. Because I chose to use the "default" voice, I hope that this script will work in languages other than English without any tweeking. There are a few self explainatory parameters in the tts_min_reveal.js you can fiddle with at the beginning of the script.
