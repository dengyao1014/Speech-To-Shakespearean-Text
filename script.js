// Speech recognition object
var speechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
var recognition = new speechRecognition();
var content = "";
var txtInput = $("#text-input");
var btnStart = $("#btn-start");
var btnTranslate = $("#btn-translate");
var output = $("#output");

// API endpoint
var serverURL = "https://api.funtranslations.com/translate/shakespeare.json";

// Set speech recognition parameters
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;

// Translate button click event
btnTranslate.click(function(){
    // Check if there's text to translate
    if (!content.trim()) {
        alert("Please record some text before translating!");
        return;
    }
    
    // Show loading status
    output.text("Translating...");
    
    // Construct API request URL
    var apiURL = serverURL + "?text=" + encodeURIComponent(content);
    
    // Send API request
    fetch(apiURL)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(json => {
          if (json.contents && json.contents.translated) {
              var translatedText = json.contents.translated;
              output.text(translatedText);
          } else {
              throw new Error('Translation result format incorrect');
          }
      })
      .catch(errorHandler);
});

// Error handling function
function errorHandler(error) {
    console.error("Error occurred:", error);
    output.text("Sorry, the server encountered an issue or the API request limit has been reached! Please try again later.");
    
    // Fun Translations API has a free limit of 5 requests per hour, inform the user
    if (error.message.includes('429')) {
        output.text("Free API Limit: Fun Translations API has a free usage limit of 5 requests per hour. Please try again later.");
    }
}

// Speech recognition result event
recognition.onresult = function(event) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    content += transcript + " ";
    txtInput.val(content);
};

// Speech recognition end event
recognition.onend = function() {
    btnStart.text("Continue Recording");
    btnStart.removeClass("recording");
};

// Speech recognition error event
recognition.onerror = function(event) {
    console.error("Speech recognition error:", event.error);
    btnStart.text("Start Recording");
    btnStart.removeClass("recording");
    
    if (event.error === 'not-allowed') {
        alert("Microphone access was denied. Please allow microphone access to use the speech recognition feature.");
    } else if (event.error === 'no-speech') {
        alert("No speech was detected. Please try again.");
    } else {
        alert("Speech recognition error: " + event.error);
    }
};

// Start recording button click event
btnStart.click(function() {
    try {
        if (!btnStart.hasClass("recording")) {
            recognition.start();
            btnStart.text("Recording...");
            btnStart.addClass("recording");
        } else {
            recognition.stop();
            btnStart.text("Continue Recording");
            btnStart.removeClass("recording");
        }
    } catch (e) {
        console.error("Error starting speech recognition:", e);
        alert("Could not start speech recognition. Please ensure you're using a modern browser that supports Web Speech API, such as Chrome.");
        btnStart.text("Start Recording");
        btnStart.removeClass("recording");
    }
});

// Text input event - allows user to manually edit text
txtInput.on('input', function(){
    content = $(this).val();
});

// Page load initialization
$(document).ready(function() {
    btnStart.text("Start Recording");
    btnStart.removeClass("recording");
    
    // Set default text in output
    output.text("Shakespearean translation will appear here...");
    
    // Check if browser supports speech recognition
    if (!speechRecognition) {
        alert("Your browser does not support speech recognition. Please use Chrome, Edge, or Safari.");
        btnStart.prop('disabled', true);
        btnStart.text("Recording Not Supported");
    }
});


