# tts_basics_for_revealjs

## What does it do?
This plug-in provides text-to-speech to your reveal.js slideshow so you can have your slides read out loud. The plug-in works for current versions of Chrome, Firefox and Opera as tested on Windows OS. The plug-in offers the following possibilities:

1. Use the "slide changed" event to initiate reading the innerText of elements that you can specify on the current slide. This allows you to have  visible elements read outloud.

2. Use the "fragement shown" event to read the text content of the textContent of fragment elements as they appear.

3. Use the "slide changed" event read the textContent of hidden elements like slide notes.

The default setup will read the typical text that appears on slides, text in fragments and text in hidden notes. A delay added to the slidechanged event to allows visual transitions to conclude before reading starts. The default 1 second works fine.

## How do you include it into your Reavel.js Slideshow?
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
					{ src: 'plugin/tts_min/tts_min_reveal.js', async: false} // Add text to speech for Chrome, FF using default voice.
				]
			});

			Reveal.addEventListener( 'ready', function( event ) {
			//  Add this if you want to read the opening slide.
			// event.currentSlide, event.indexh, event.indexv
				var thisSlide = Reveal.getCurrentSlide();
				if (tts.On) {
					// Read the innerText for the listed elements of current slide after waiting 1 second to allow transitions to conclude.
					setTimeout(function(){tts.ReadVisElmts(thisSlide,"h1","h2","h3","p","li");}, 1000);
					// Read the textContent for the listed elements of the current slide, even hidden ones, after 1 second. In this case the notes class.
					if (tts.readNotes) setTimeout(function(){tts.ReadAnyElmts(thisSlide,".notes");}, 1000);
				}
			} );
		</script>
```
## How does it work and how can you modify how it works?
Note that after the dependencies part of Reveal.initialize, and just before the end of the script tag there is a ready event listener added so that the first slide can be read outloud. The ready event listener illustrates how to specify which text, and in what order text gets read on a slide. the function tts.ReadVisElmts takes a DOM element as its first argument, in this case the current slide object. The list of identifiers that follows define the order and type of elements from that slide that will be queried for text to read. Without making any changes to the tts_min_reveal.js file The text that appears in h1, h2, h3, p and li tags will be read in that order after a 1 second delay when a slides changes.  The second function tts.ReadAnyElmts works the same way but because it references the textContent attribute it can read the contents of any element including hidden ones. You can edit slidechanged event listener of tts_min_reveal.js to query your own ".readMe1", ".readMe2" classes, for example, to specify which text to read and in what order.

The tts_min_reveal.js script is meant to be minimal. It only addresses the bare minimum of parameters needed for using the HTML 5 speech synthesis API (https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) to make slideshows talk using Firefox, Chrome and Opera. Because I chose to use the "default" voice, I am hoping that this script works in languages other than English without any tweeking. You will notice a difference between browsers as to which tts voice the browser uses. Firefox will attempt to use the tts voice installed locally, and Google will use its proprietary female voice. There are a few self explainatory parameters in the tts_min_reveal.js you can fiddle with at the beginning of the script as shown:
```javascript
var ttsDvIndex = 0; //Used to help identify the default tts voice for Chrome or FF on the user's platform.
var ttsDvRate = 0.85; // used to set speech rate between 0 and 2, 1 = 'normal'- there are other seemingly optional parameters like pitch, language, volume.
tts.On = true; //Set to false to prevent tts production.
tts.Cancel = true; // Set to true if you want reading to stop with a slide change. Otherwise, all readable text is queued for speech output.
tts.readFrags = true; //Set to true to read fragment text content as it appears.
tts.readNotes = true; //set to true to read text content of any <aside class="notes">text content</aside> tag in a slide section
```

Finally, there are two keyboard shortcuts defined for cancelling or toggling tts off/on:
```javascript
Reveal.configure({
  keyboard: {
    81: function() {tts.Synth.cancel()}, // press q to cancel speaking and clear speech queue.
	  84: function() {tts.ToggleSpeech()}  // press t to toggle speech on/off

  }
});
```
