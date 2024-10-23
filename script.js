// Original word list
const words = [ 
	"triangle", 
	"clock", 
	"calendor", 
	"mirror", 
	"penguin",
	"guitar",
	"telescope",
	"skeleton",
	"scissors",
]; 

// Respective list of hints 
const hints = [ 
	"A shape with three sides", 
	"Used For Time Display", 
	"Tracks Days and Dates", 
	"Reflects Images", 
	"Flightless Bird in cold Regions", 
	"A Musical Instrument With Strings",
	"Tool to See Distant Stars",
	"Bodie's Bone Structure",
	"A Tool to Cut",
]; 

// Initialize display word 
let displayWord = ""; 
let timerInterval;
let timeLeft = 20; 

// Function to shuffle letters 
function shuffle(str) {
    let strArray = Array.from(str);
    for (let i = 0; i < strArray.length - 1; ++i) {
        let j = Math.floor(Math.random() * strArray.length);
        // Swap letters
        let temp = strArray[i];
        strArray[i] = strArray[j];
        strArray[j] = temp;
    }

    
    return strArray.map(letter => `<span class="wordLetter">${letter}</span>`).join("");
}

// Timer function to update the timer display and check if time runs out
function startTimer() {
    clearInterval(timerInterval); 
    timeLeft = 20; 
    document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`; 

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval); 
            refresh(); 
        }
    }, 1000);
}

// Function to check input and display result 
function check() { 
    let input = document.getElementById("input"); 
    let output = document.getElementById("output"); 
	const trimmedInput = input.value.trim(); // trim spaces


    if (trimmedInput.toLocaleLowerCase() === displayWord.toLocaleLowerCase()) {
        output.innerHTML = "Correct Answer"; 
        clearInterval(timerInterval); 
        setTimeout(refresh, 2000);
    } else {
        output.innerHTML = "Incorrect Answer. Try Again"; 
    }
}

// To refresh and show new word 
function refresh() {
    const index = Math.floor(Math.random() * words.length); // Randomly select a word
    displayWord = words[index];
    displayHint = hints[index];

    // Scramble and insert the word
    const scrambleWord = document.getElementById("scrambleWord");
    scrambleWord.innerHTML = shuffle(displayWord).toUpperCase(); // Use innerHTML, not innerText

    // Show the hint
    const hint = document.getElementById("hint");
    hint.innerHTML = "<b>Hint:</b> " + displayHint;

    // Reset result and input
    document.getElementById("output").innerText = "Result:";
    document.getElementById("input").value = '';

    startTimer(); 
}

// Function to reset the timer manually via the refresh button
function resetTimer() {
    startTimer();
}

// Function call when page loads for the first time
refresh();
