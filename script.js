let points = 0;
let pointsPerStep = 1;
let upgradeCost = 0;
let currentLetter = "A";

const pointsDisplay = document.getElementById("points");
const letterDisplay = document.getElementById("nextLetter")
const nextLetterTitle = document.getElementById("nextLetterTitle")

const runPicture = document.getElementById("runningPicture");
let pictureOrder = 1

let shakePercentage = 100;
const maxShakePixels = 20;

lettersTyped = ""

// Function to generate a random letter
        function generateNewLetter() {
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            currentLetter = alphabet[randomIndex];
            letterDisplay.innerText = currentLetter;
        }

        // Listen for keyboard presses
        document.addEventListener("keydown", function(event) {
            // Check if the key pressed matches the current letter (ignoring case)
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
    console.log("Math " + Math.log10(10000000))
    console.log("Points in log10 is " + logarithmicPoints)
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


// Function to update the text on the screen
function updateScreen() {
    pointsDisplay.innerText = "Health Points: " + points;
    nextLetterTitle.innerText = "Next letter to type (" + shakePercentage + "% tremors)"
    applyShakeIntensity()
    changeShakePercentage()
    updateTextWritten()


            //upgradeBtn.innerText = "Buy Running Shoes (Cost: " + upgradeCost + " HP)";
            
            // Enable or disable the upgrade button based on if we have enough HP
//            if (points >= upgradeCost) {
  //              upgradeBtn.disabled = false;
    //    } else {
      //          upgradeBtn.disabled = true;
        //    }
        }




