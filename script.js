let points = 100000000;
let pointsPerLetter = 1;
let upgradeCost = 0;
let currentLetter = "P";
let newLine = "\n"

const pointsDisplay = document.getElementById("points");
const letterDisplay = document.getElementById("nextLetter")
const nextLetterTitle = document.getElementById("nextLetterTitle")

const runPicture = document.getElementById("runningPicture");
let pictureOrder = 1

let shakePercentage = 100;
const maxShakePixels = 20;

textToWrite = "AAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

textToWrite = "PARKINSON'S DISEASE IS A CONDITION THAT AFFECTS THE NERVOUS SYSTEM AND HOW THE BODY MOVES. IT DEVELOPS GRADUALLY, OFTEN STARTING WITH A SLIGHT TREMOR IN ONE HAND, MUSCLE STIFFNESS, OR SLOWING OF MOVEMENT. WHILE LIVING WITH IT PRESENTS REAL CHALLENGES, THERE IS A LOT OF HOPE AND WAYS TO MANAGE THE SYMPTOMS. FOR PEOPLE WITH PARKINSON'S DISEASE, PHYSICAL ACTIVITY AND EXERCISE CAN HAVE A MAJOR POSITIVE IMPACT ON THEIR QUALITY OF LIFE. HOWEVER, IT CAN BE DIFFICULT TO GET STARTED AND TO MAINTAIN MOTIVATION. THE BARRIERS ARE NOT ONLY PHYSICAL, BUT ALSO SOCIAL AND EMOTIONAL. FIT4CURE IS AN ASSOCIATION THAT AIMS TO PROMOTE A HEALTHY AND ACTIVE LIFE FOR PEOPLE WITH PARKINSON'S. BY MOVING TOGETHER, WE GROW STRONGER"

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
        if (lettersSeen === 2) {
            currentLetter = textToWrite[letterIndex] + textToWrite[letterIndex + 1]
            // Only display the currentLetter if it is NOT a space
            letterDisplay.innerText = currentLetter;
        }

        if (lettersSeen === 3) {
            currentLetter = textToWrite[letterIndex] + textToWrite[letterIndex + 1] + textToWrite[letterIndex + 2]
            // Only display the currentLetter if it is NOT a space
            letterDisplay.innerText = currentLetter;
        }
        if (lettersSeen === 4) {
            currentLetter = textToWrite[letterIndex] + textToWrite[letterIndex + 1] + textToWrite[letterIndex + 2] + textToWrite[letterIndex + 3]
            // Only display the currentLetter if it is NOT a space
            letterDisplay.innerText = currentLetter;
        }


        else {
            // Only display the currentLetter if it is NOT a space
            letterDisplay.innerText = currentLetter;
        }
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
    if (event.key.toUpperCase() === currentLetter[0]) {
        // Correct! Add HP and update the screen
        console.log("Random number: " + Math.random() * 100)
        if (criticalChance > Math.random() * 100) {
            pointsMultiplied = pointsPerLetter * 5
            points += pointsMultiplied
        } else {
            points += pointsPerLetter;
        }

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

// ---------------
//Upgrade system
// ---------------

// Stronger Fingers upgrade
// ------
let physicalUpgradeOneCost = 10
const btnStrongerFingers = document.getElementById("btn-stronger-fingers");
const costStrongerFingers = document.getElementById("cost-stronger-fingers");
const physicalOneEffect = document.getElementById("physical-one-effect")
scaleCost = 5

btnStrongerFingers.addEventListener("click", function () {
    if (points >= physicalUpgradeOneCost) {
        points -= physicalUpgradeOneCost;
        pointsPerLetter *= 2;
        physicalUpgradeOneCost = Math.floor(physicalUpgradeOneCost * scaleCost);
        costStrongerFingers.innerText = "Cost: " + physicalUpgradeOneCost
        updateScreen();
    }
});


// Better finger and eye correlation
let physicalUpgradeTwoCost = 100
const btnPhysicalUpgradeTwo = document.getElementById("btn-physical-two")
const costPhysicalUpgradeTwo = document.getElementById("cost-physical-two")

btnPhysicalUpgradeTwo.addEventListener("click", function () {
    if (points >= physicalUpgradeTwoCost) {
        points -= physicalUpgradeTwoCost;

        scaleCost = scaleCost - 0.5
        physicalOneEffect.innerText = "Doubles your health points per letter!" + newLine + newLine + "(Scales " + scaleCost + "x)"

        physicalUpgradeTwoCost = Math.floor(physicalUpgradeTwoCost * 10);
        costPhysicalUpgradeTwo.innerText = "Cost: " + physicalUpgradeTwoCost
        updateScreen();
    }
});

// LSVT Big Therapy
let physicalUpgradeThreeCost = 10
const btnPhysicalUpgradeThree = document.getElementById("btn-physical-three")
const costPhysicalUpgradeThree = document.getElementById("cost-physical-three")
const physicalThreeEffect = document.getElementById("physical-three-effect")

let criticalChance = 0
btnPhysicalUpgradeThree.addEventListener("click", function () {
    if (points >= physicalUpgradeThreeCost) {
        points -= physicalUpgradeThreeCost;



        if (criticalChance === 90) {
            physicalUpgradeThreeCost = "MAXED OUT!"
        } else {
            criticalChance += 15
            physicalUpgradeThreeCost = Math.floor(physicalUpgradeThreeCost * 10);
            costPhysicalUpgradeTwo.innerText = "Cost: " + physicalUpgradeThreeCost
            physicalThreeEffect.innerText = "LSVT trains the brain to make larger movements to counteract the shrinking, slow movements." + newLine + newLine + "Adds a 'Critical hit' chance." + newLine + newLine + "You have a " + criticalChance + "% chance to get 5x Health Points "
        }




        updateScreen();
    }
});


// ----------------
// MENTAL UPGRADES
// ----------------

// Carbidopa Levodopa
let mentalUpgradeOneCost = 10
const btnMentalUpgradeOne = document.getElementById("btn-mental-one")
const costMentalUpgradeOne = document.getElementById("cost-mental-one")
let lettersSeen = 1

btnMentalUpgradeOne.addEventListener("click", function () {
    if (points >= mentalUpgradeOneCost) {
        points -= mentalUpgradeOneCost;

        lettersSeen += 1

        if (lettersSeen === 4) {
            mentalUpgradeOneCost = "MAXED OUT!"
        } else {
            mentalUpgradeOneCost = Math.floor(mentalUpgradeOneCost * 10);
            costMentalUpgradeOne.innerText = "Cost: " + mentalUpgradeOneCost
            updateScreen();
        }
        updateScreen();
    }
});

// Tremors BEGONE!
let mentalUpgradeTwoCost = 1000
const btnMentalUpgradeTwo = document.getElementById("btn-mental-two")
const costMentalUpgradeTwo = document.getElementById("cost-mental-two")

// Community support group
let mentalUpgradeThreeCost = 10000
const btnMentalUpgradeThree = document.getElementById("btn-mental-three")
const costMentalUpgradeThree = document.getElementById("cost-mental-three")
let costReduced = 0

btnMentalUpgradeThree.addEventListener("click", function () {
    if (points >= mentalUpgradeThreeCost) {
        points -= mentalUpgradeThreeCost;

        lettersSeen += 1

        if (lettersSeen === 4) {
            mentalUpgradeThreeCost = "MAXED OUT!"
        } else {
            mentalUpgradeThreeCost = Math.floor(mentalUpgradeThreeCost * 10);
            costMentalUpgradeThree.innerText = "Cost: " + mentalUpgradeThreeCost
            updateScreen();
        }
        updateScreen();
    }
});

// Replace your upgradeMap with this array of objects:
const allUpgrades = [
    { button: btnStrongerFingers, getCost: () => physicalUpgradeOneCost },
    { button: btnPhysicalUpgradeTwo, getCost: () => physicalUpgradeTwoCost },
    { button: btnPhysicalUpgradeThree, getCost: () => physicalUpgradeThreeCost },
    { button: btnMentalUpgradeOne, getCost: () => mentalUpgradeOneCost },
    { button: btnMentalUpgradeTwo, getCost: () => mentalUpgradeTwoCost },
    { button: btnMentalUpgradeThree, getCost: () => mentalUpgradeThreeCost }
];

// Replace your checkAffordability functions with this single loop:
function checkAffordability() {
    // Loop through every upgrade in our list
    for (let upgrade of allUpgrades) {

        let currentCost = upgrade.getCost(); // Grabs the live, updated cost
        let btn = upgrade.button;            // Grabs the specific button

        // Enable or disable the button based on current points
        if (points >= currentCost) {
            btn.disabled = false;
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
        } else {
            btn.disabled = true;
            btn.style.opacity = "0.3";
            btn.style.cursor = "not-allowed";
        }
    }
}



function updateCosts() {
    costStrongerFingers.innerText = "Cost: " + physicalUpgradeOneCost.toLocaleString('da-DK');
    costPhysicalUpgradeTwo.innerText = "Cost: " + physicalUpgradeTwoCost.toLocaleString('da-DK');
    costPhysicalUpgradeThree.innerText = "Cost: " + physicalUpgradeThreeCost.toLocaleString('da-DK');
    costMentalUpgradeOne.innerText = "Cost: " + mentalUpgradeOneCost.toLocaleString('da-DK');
    costMentalUpgradeTwo.innerText = "Cost: " + mentalUpgradeTwoCost.toLocaleString('da-DK');
    costMentalUpgradeThree.innerText = "Cost: " + mentalUpgradeThreeCost.toLocaleString('da-DK');
}






const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");


// Function to update the text on the screen
function updateScreen() {
    pointsDisplay.innerText = "Health Points: " + points.toLocaleString('da-DK');
    nextLetterTitle.innerText = "Next letter to type (" + shakePercentage + "% tremors)"
    applyShakeIntensity()
    changeShakePercentage()
    updateTextWritten()

    let progressPercentage = (letterIndex / textToWrite.length) * 100;
    progressBar.style.width = progressPercentage + "%";

    progressText.innerText = Math.floor(progressPercentage) + "% completed (" + letterIndex + " / " + textToWrite.length + ") (Scroll down to see your text progress)";

    updateCosts()
    checkAffordability()

}
