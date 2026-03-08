let points = 0;
let pointsPerStep = 1;
let upgradeCost = 0;
let currentLetter = "A";

const pointsDisplay = document.getElementById("points");
const letterDisplay = document.getElementById("nextLetter")

const runPicture = document.getElementById("runningPicture");
let pictureOrder = 1

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
                updateScreen();
                generateNewLetter();
                
            }
        });
// Function to update the text on the screen
        function updateScreen() {
            pointsDisplay.innerText = "Health Points: " + points;
            //upgradeBtn.innerText = "Buy Running Shoes (Cost: " + upgradeCost + " HP)";
            
            // Enable or disable the upgrade button based on if we have enough HP
//            if (points >= upgradeCost) {
  //              upgradeBtn.disabled = false;
    //    } else {
      //          upgradeBtn.disabled = true;
        //    }
        }





