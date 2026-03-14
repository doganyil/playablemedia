let points = 0;
let pointsPerStep = 1;
let upgradeCost = 0;
let currentLetter = "P";

const pointsDisplay = document.getElementById("points");
const letterDisplay = document.getElementById("nextLetter")
const nextLetterTitle = document.getElementById("nextLetterTitle")

const runPicture = document.getElementById("runningPicture");
let pictureOrder = 1

let shakePercentage = 100;
const maxShakePixels = 20;

textToWrite = "PARKINSON'S DISEASE IS A CONDITION THAT AFFECTS THE NERVOUS SYSTEM AND HOW THE BODY MOVES. IT DEVELOPS GRADUALLY, OFTEN STARTING WITH A SLIGHT TREMOR IN ONE HAND, MUSCLE STIFFNESS, OR SLOWING OF MOVEMENT. WHILE LIVING WITH IT PRESENTS REAL CHALLENGES, THERE IS A LOT OF HOPE AND WAYS TO MANAGE THE SYMPTOMS. FOR PEOPLE WITH PARKINSON'S DISEASE, PHYSICAL ACTIVITY AND EXERCISE CAN HAVE A MAJOR POSITIVE IMPACT ON THEIR QUALITY OF LIFE. HOWEVER, IT CAN BE DIFFICULT TO GET STARTED AND TO MAINTAIN MOTIVATION. THE BARRIERS ARE NOT ONLY PHYSICAL, BUT ALSO SOCIAL AND EMOTIONAL. FIT4CURE IS AN ASSOCIATION THAT AIMS TO PROMOTE A HEALTHY AND ACTIVE LIFE FOR PEOPLE WITH PARKINSON'S. BY MOVING TOGETHER, WE GROW STRONGER"
textToWrite = "AAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
letterIndex = 0
console.log("Length of the text to write " + textToWrite.length)
console.log(textToWrite[1])

lettersTyped = ""

// Function to generate a random letter
function generateNewLetter() {
    currentLetter = textToWrite[letterIndex];
    if (currentLetter === undefined) {
        letterDisplay.innerText = "Scroll down!"
        nextLetterTitle.innerText = "Run complete!";
        return;

    }
    if (currentLetter === " ") {
        letterDisplay.innerText = "SPACE";
        console.log("space thing reached");
    } else {
        // Only display the currentLetter if it is NOT a space
        letterDisplay.innerText = currentLetter;
    }
    console.log(currentLetter)
}

// Listen for keyboard presses
document.addEventListener("keydown", function (event) {

    if (event.key === " ") {
        event.preventDefault();
    }
    // Check if the key pressed matches the current letter (ignoring case)
    console.log("Key pressed:" + event.key)
    if (event.key.toUpperCase() === currentLetter) {
        // Correct! Add HP and update the screen
        points += pointsPerStep;
        if (pictureOrder === 1) {
            runPicture.src = "run2.jpeg";
            pictureOrder = 2;
        } else {
            runPicture.src = "run1.jpeg";
            pictureOrder = 1;
        }
        lettersTyped += event.key.toUpperCase()
        letterIndex += 1
        updateScreen();
        generateNewLetter();

    }
});


// Function to update the shaking intensity
function applyShakeIntensity() {

    // Calculate the actual pixel movement based on the percentage
    let currentPixels = (shakePercentage / 100) * maxShakePixels;

    // Inject that pixel amount into our CSS variable
    letterDisplay.style.setProperty('--shake-pixels', currentPixels + 'px');
}

function changeShakePercentage() {
    logarithmicPoints = Math.log10(points)
    // log10(1) = 0
    // log10(10) = 1
    // log10(100) = 2, etc, remember dodo!
    if (logarithmicPoints >= 1) shakePercentage = 90;
    if (logarithmicPoints > 2) shakePercentage = 80;
    if (logarithmicPoints > 3) shakePercentage = 70;
    if (logarithmicPoints > 4) shakePercentage = 60;
    if (logarithmicPoints > 5) shakePercentage = 50;
    if (logarithmicPoints > 6) shakePercentage = 40;
    if (logarithmicPoints > 7) shakePercentage = 30;
}

const writtenSoFar = document.getElementById("writtenSoFar")
function updateTextWritten() {
    writtenSoFar.innerText = lettersTyped
}

// -------------
//Upgrade system
// -------------
let strongerFingersUpgradeCost = 10
// Elements
const btnStrongerFingers = document.getElementById("btn-stronger-fingers");
const costStrongerFingers = document.getElementById("cost-stronger-fingers");


// Listen for clicks on the Stronger Fingers upgrade
btnStrongerFingers.addEventListener("click", function () {
    // Check if the player has enough points to buy it
    console.log("Reached 1")
    if (points >= strongerFingersUpgradeCost) {
        console.log("REached 2")
        points -= strongerFingersUpgradeCost; // Deduct the cost from total points
        pointsPerStep *= 2;    // Double the points earned per letter
        strongerFingersUpgradeCost = Math.floor(strongerFingersUpgradeCost * 1.9); // Make the next upgrade 2.5x more expensive
        costStrongerFingers.innerText = "Cost: " + strongerFingersUpgradeCost
        console.log("Reached 3")

        updateScreen(); // Refresh the screen immediately
    }
});



const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");


// Function to update the text on the screen
function updateScreen() {
    pointsDisplay.innerText = "Health Points: " + points.toLocaleString('da-DK');
    nextLetterTitle.innerText = "Next letter to type (" + shakePercentage + "% tremors)"
    applyShakeIntensity()
    changeShakePercentage()
    updateTextWritten()

// --- NEW PROGRESS BAR LOGIC ---
    let progressPercentage = (letterIndex / textToWrite.length) * 100;
    progressBar.style.width = progressPercentage + "%";
    
    // Add this new line to update the text!
    progressText.innerText = Math.floor(progressPercentage) + "% completed (" + letterIndex +  " / " + textToWrite.length + ") (Scroll down to see your text progress)";
    

    // Update the cost text with the formatting as well
    costStrongerFingers.innerText = "Cost: " + strongerFingersUpgradeCost.toLocaleString('da-DK');

    // Enable or disable the button based on current points
    if (points >= strongerFingersUpgradeCost) {
        btnStrongerFingers.disabled = false;
        btnStrongerFingers.style.opacity = "1";
        btnStrongerFingers.style.cursor = "pointer";
    } else {
        btnStrongerFingers.disabled = true;
        btnStrongerFingers.style.opacity = "0.3";
        btnStrongerFingers.style.cursor = "not-allowed";
    }
}




