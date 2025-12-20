const disclaimer = document.getElementById("disclaimer");

var string = "better.boyne.dev";
var stringProgress = 0;

disclaimer.onclick = (_) => {
    disclaimer.className = "bigger-is-better";
    if (stringProgress >= string.length-1) {
        disclaimer.classList.add("underline");
    }
    if (stringProgress >= string.length) {
        document.location.replace("https://better.boyne.dev")
    }
    stringProgress++;
    disclaimer.innerText = string.slice(0, stringProgress);
    
}