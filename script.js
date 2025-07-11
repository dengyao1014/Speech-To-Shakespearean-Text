// Speech recognition object
var speechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
var recognition = new speechRecognition();
var content = "";
var txtInput = $("#text-input");
var btnStart = $("#btn-start");
var btnTranslate = $("#btn-translate");
var output = $("#output");

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
    
    // Use local translation instead of API call
    setTimeout(function() {
        var translatedText = transformToShakespearean(content);
        output.text(translatedText);
    }, 500); // Add small delay for effect
});

// Shakespearean transformation function
function transformToShakespearean(text) {
    // Basic replacement rules
    const rules = [
        { modern: /you are/gi, shakespeare: "thou art" },
        { modern: /your/gi, shakespeare: "thy" },
        { modern: /you/gi, shakespeare: "thee" },
        { modern: /hello|hi/gi, shakespeare: "good morrow" },
        { modern: /goodbye/gi, shakespeare: "fare thee well" },
        { modern: /friend/gi, shakespeare: "fellow" },
        { modern: /yes/gi, shakespeare: "aye" },
        { modern: /no/gi, shakespeare: "nay" },
        { modern: /am not/gi, shakespeare: "am not" },
        { modern: /isn't|is not/gi, shakespeare: "is't not" },
        { modern: /aren't|are not/gi, shakespeare: "art not" },
        { modern: /don't|do not/gi, shakespeare: "dost not" },
        { modern: /doesn't|does not/gi, shakespeare: "doth not" },
        { modern: /didn't|did not/gi, shakespeare: "did not" },
        { modern: /haven't|have not/gi, shakespeare: "hath not" },
        { modern: /hasn't|has not/gi, shakespeare: "hath not" },
        { modern: /won't|will not/gi, shakespeare: "wilt not" },
        { modern: /can't|cannot/gi, shakespeare: "canst not" },
        { modern: /have|has/gi, shakespeare: "hath" },
        { modern: /had/gi, shakespeare: "hadst" },
        { modern: /am/gi, shakespeare: "art" },
        { modern: /are/gi, shakespeare: "art" },
        { modern: /were/gi, shakespeare: "wert" },
        { modern: /will/gi, shakespeare: "shalt" },
        { modern: /shall/gi, shakespeare: "shalt" },
        { modern: /can/gi, shakespeare: "canst" },
        { modern: /do/gi, shakespeare: "dost" },
        { modern: /does/gi, shakespeare: "doth" },
        { modern: /did/gi, shakespeare: "didst" },
        { modern: /if/gi, shakespeare: "an" },
        { modern: /my/gi, shakespeare: "mine" },
        { modern: /i think/gi, shakespeare: "methinks" },
        { modern: /i thought/gi, shakespeare: "methought" },
        { modern: /i am/gi, shakespeare: "I be" },
        { modern: /today/gi, shakespeare: "this day" },
        { modern: /tonight/gi, shakespeare: "this night" },
        { modern: /tomorrow/gi, shakespeare: "on the morrow" },
        { modern: /yesterday/gi, shakespeare: "on the day before" },
        { modern: /here/gi, shakespeare: "hither" },
        { modern: /there/gi, shakespeare: "thither" },
        { modern: /where/gi, shakespeare: "whither" },
        { modern: /father/gi, shakespeare: "sire" },
        { modern: /mother/gi, shakespeare: "dame" },
        { modern: /parents/gi, shakespeare: "forbears" },
        { modern: /before/gi, shakespeare: "ere" },
        { modern: /sir/gi, shakespeare: "good sir" },
        { modern: /lady/gi, shakespeare: "fair lady" },
        { modern: /woman/gi, shakespeare: "maiden" },
        { modern: /man/gi, shakespeare: "fellow" },
        { modern: /people/gi, shakespeare: "gentle folk" },
        { modern: /go/gi, shakespeare: "goeth" },
        { modern: /went/gi, shakespeare: "didst go" },
        { modern: /say/gi, shakespeare: "speaketh" },
        { modern: /said/gi, shakespeare: "spake" },
        { modern: /see/gi, shakespeare: "witness" },
        { modern: /saw/gi, shakespeare: "didst witness" },
        { modern: /know/gi, shakespeare: "knoweth" },
        { modern: /knew/gi, shakespeare: "didst know" },
        { modern: /tell/gi, shakespeare: "telleth" },
        { modern: /told/gi, shakespeare: "didst tell" }
    ];
    
    let result = text;
    
    // Apply replacement rules
    rules.forEach(rule => {
        result = result.replace(rule.modern, rule.shakespeare);
    });
    
    // Add Shakespearean phrases at beginning (sometimes)
    const beginnings = [
        "Hark! ",
        "Prithee, ",
        "Forsooth, ",
        "Verily, ",
        "Lo! ",
        "Alas, ",
        "By my troth, ",
        "Marry, ",
        "Good my lord, ",
        "In faith, "
    ];
    
    // 30% chance to add beginning phrase
    if (Math.random() < 0.3) {
        const randomBeginning = beginnings[Math.floor(Math.random() * beginnings.length)];
        result = randomBeginning + result.charAt(0).toLowerCase() + result.slice(1);
    }
    
    // Add Shakespearean endings (sometimes)
    const endings = [
        " Forsooth!",
        " Prithee!",
        ", I say!",
        ", good sir!",
        ", fair maiden!",
        " Anon!",
        " Huzzah!",
        ", by my troth!",
        ", verily!",
        ", indeed!",
        ", methinks!",
        ", I prithee!",
        " Odds bodkins!",
        " Zounds!",
        " Gadzooks!"
    ];
    
    // 60% chance to add ending phrase
    if (Math.random() < 0.6) {
        const randomEnding = endings[Math.floor(Math.random() * endings.length)];
        if (!result.endsWith('.') && !result.endsWith('!') && !result.endsWith('?')) {
            result += randomEnding;
        } else {
            result = result.slice(0, -1) + randomEnding;
        }
    }
    
    return result;
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


