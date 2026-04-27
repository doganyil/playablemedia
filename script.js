let points = 0;
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
// Reduced max shake from 20 to 8 for a smoother default experience
const maxShakePixels = 8; 

textToWrite = "AAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

textToWrite = "PARKINSON'S DISEASE IS A CONDITION THAT AFFECTS THE NERVOUS SYSTEM AND HOW THE BODY MOVES. IT DEVELOPS GRADUALLY, OFTEN STARTING WITH A SLIGHT TREMOR IN ONE HAND, MUSCLE STIFFNESS, OR SLOWING OF MOVEMENT. WHILE LIVING WITH IT PRESENTS REAL CHALLENGES, THERE IS A LOT OF HOPE AND WAYS TO MANAGE THE SYMPTOMS. FOR PEOPLE WITH PARKINSON'S DISEASE, PHYSICAL ACTIVITY AND EXERCISE CAN HAVE A MAJOR POSITIVE IMPACT ON THEIR QUALITY OF LIFE. HOWEVER, IT CAN BE DIFFICULT TO GET STARTED AND TO MAINTAIN MOTIVATION. THE BARRIERS ARE NOT ONLY PHYSICAL, BUT ALSO SOCIAL AND EMOTIONAL. FIT4CURE IS AN ASSOCIATION THAT AIMS TO PROMOTE A HEALTHY AND ACTIVE LIFE FOR PEOPLE WITH PARKINSON'S. BY MOVING TOGETHER, WE GROW STRONGER"

letterIndex = 0
lettersTyped = ""

// POP UP FOR MOTION SICKNESS
const modalOverlay = document.getElementById("motion-sickness-modal");
const closeModalBtn = document.getElementById("close-modal-btn");

closeModalBtn.addEventListener("click", function() {
    modalOverlay.classList.add("hidden");
});

// --- NEW SETTINGS LOGIC ---
const settingsBtn = document.getElementById("settings-btn");
const settingsModal = document.getElementById("settings-modal");
const closeSettingsBtn = document.getElementById("close-settings-btn");
const disableShakeCheckbox = document.getElementById("disable-shake");
const opacitySlider = document.getElementById("opacity-slider");
const contrastSlider = document.getElementById("contrast-slider");

let isShakeDisabled = false;

// Open settings
settingsBtn.addEventListener("click", () => {
    settingsModal.classList.remove("hidden");
});

// Close settings
closeSettingsBtn.addEventListener("click", () => {
    settingsModal.classList.add("hidden");
});

// Disable shake toggle
disableShakeCheckbox.addEventListener("change", (event) => {
    isShakeDisabled = event.target.checked;
    applyShakeIntensity(); // Update immediately when clicked
});

// Adjust Opacity (Applied specifically to the letter)
opacitySlider.addEventListener("input", (event) => {
    let val = event.target.value;
    // Keep it between 10% and 100% so it doesn't disappear completely
    if (val < 10) val = 10;
    if (val > 100) val = 100;
    letterDisplay.style.setProperty('--letter-opacity', val / 100);
});

// Adjust Contrast (Applied specifically to the letter)
contrastSlider.addEventListener("input", (event) => {
    let val = event.target.value;
    if (val < 10) val = 10;
    // Allow going over 100% just in case they want it, but cap at 200%
    if (val > 200) val = 200;
    letterDisplay.style.setProperty('--letter-contrast', val + '%');
});


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
    } else {
        if (lettersSeen === 2) {
            currentLetter = textToWrite[letterIndex] + textToWrite[letterIndex + 1]
            letterDisplay.innerText = currentLetter;
        }

        if (lettersSeen === 3) {
            currentLetter = textToWrite[letterIndex] + textToWrite[letterIndex + 1] + textToWrite[letterIndex + 2]
            letterDisplay.innerText = currentLetter;
        }
        if (lettersSeen === 4) {
            currentLetter = textToWrite[letterIndex] + textToWrite[letterIndex + 1] + textToWrite[letterIndex + 2] + textToWrite[letterIndex + 3]
            letterDisplay.innerText = currentLetter;
        }


        else {
            letterDisplay.innerText = currentLetter;
        }
    }
}

// Listen for keyboard presses
document.addEventListener("keydown", function (event) {

    if (event.key === " ") {
        event.preventDefault();
    }
    if (event.key.toUpperCase() === currentLetter[0]) {
        // Correct! Add HP and update the screen
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
    // If the user turned it off in settings, set pixels to 0
    if (isShakeDisabled) {
        letterDisplay.style.setProperty('--shake-pixels', '0px');
    } else {
        // Calculate the actual pixel movement based on the percentage
        let currentPixels = (shakePercentage / 100) * maxShakePixels;
        // Inject that pixel amount into our CSS variable
        letterDisplay.style.setProperty('--shake-pixels', currentPixels + 'px');
    }
}

const writtenSoFar = document.getElementById("writtenSoFar")
function updateTextWritten() {
    writtenSoFar.innerText = lettersTyped
}

// ---------------
//Upgrade system
// ---------------

// Stronger Fingers upgrade
let physicalUpgradeOneCost = 10
const btnStrongerFingers = document.getElementById("btn-stronger-fingers");
const costStrongerFingers = document.getElementById("cost-stronger-fingers");
const physicalOneEffect = document.getElementById("physical-one-effect")
let scaleCost = 4

btnStrongerFingers.addEventListener("click", function () {
    if (points >= physicalUpgradeOneCost) {
        points -= physicalUpgradeOneCost;
        pointsPerLetter *= 2;
        physicalUpgradeOneCost = Math.floor(physicalUpgradeOneCost * scaleCost) * costAfterReduced;
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

        physicalUpgradeTwoCost = Math.floor(physicalUpgradeTwoCost * 3) * costAfterReduced;
        costPhysicalUpgradeTwo.innerText = "Cost: " + physicalUpgradeTwoCost
        updateScreen();
    }
});

// LSVT Big Therapy
let physicalUpgradeThreeCost = 500
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
            physicalUpgradeThreeCost = Math.floor(physicalUpgradeThreeCost * 1.8) * costAfterReduced;

            costPhysicalUpgradeThree = "Cost: " + physicalUpgradeThreeCost
            physicalThreeEffect.innerText = "LSVT trains the brain to make larger movements to counteract the shrinking, slow movements." + newLine + newLine + "Adds a 'Critical hit' chance." + newLine + newLine + "You have a " + criticalChance + "% chance to get 5x Health Points "
        }

        updateScreen();
    }
});


// ----------------
// MENTAL UPGRADES
// ----------------

// Carbidopa Levodopa
let mentalUpgradeOneCost = 1000
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
            mentalUpgradeOneCost = Math.floor(mentalUpgradeOneCost * 3) * costAfterReduced;
            costMentalUpgradeOne.innerText = "Cost: " + mentalUpgradeOneCost
            updateScreen();
        }
        updateScreen();
    }
});



// Tremors BEGONE!
let mentalUpgradeTwoCost = 10
const btnMentalUpgradeTwo = document.getElementById("btn-mental-two")
const costMentalUpgradeTwo = document.getElementById("cost-mental-two")
const mentalTwoEffect = document.getElementById("mental-two-effect")

btnMentalUpgradeTwo.addEventListener("click", function () {
    if (points >= mentalUpgradeTwoCost) {
        points -= mentalUpgradeTwoCost;

        if (shakePercentage === 20) {
            mentalUpgradeTwoCost = "MAXED OUT!"
        } else {
            shakePercentage -= 10
            mentalUpgradeTwoCost = Math.floor(mentalUpgradeTwoCost * 4) * costAfterReduced;
            costMentalUpgradeTwo.innerText = "Cost: " + mentalUpgradeTwoCost
            mentalTwoEffect.innerText = "Reduces the shakiness of letters by 10%" + newLine + "(scales log10 (so, 10x))" + newLine + newLine + "Current tremors: " + shakePercentage + " %"

            updateScreen();
        }
        updateScreen();
    }
});


// Community support group
let mentalUpgradeThreeCost = 5000
const btnMentalUpgradeThree = document.getElementById("btn-mental-three")
const costMentalUpgradeThree = document.getElementById("cost-mental-three")
const mentalThreeEffect = document.getElementById("mental-three-effect")

let costReduced = 0
let costAfterReduced = 1


btnMentalUpgradeThree.addEventListener("click", function () {
    if (points >= mentalUpgradeThreeCost) {
        points -= mentalUpgradeThreeCost;

        if (costReduced === 65) {
            mentalUpgradeThreeCost = "MAXED OUT!"
        } else {
            costReduced += 5
            costAfterReduced = (1 - costReduced / 100)
            mentalUpgradeThreeCost = Math.floor(mentalUpgradeThreeCost * 2.5) * costAfterReduced;
            costMentalUpgradeThree.innerText = "Cost: " + mentalUpgradeThreeCost
            mentalThreeEffect.innerText = "Working out together boosts natural dopamine!" + newLine + newLine + "Reduce all future upgrades by " + costReduced + "%"

            updateScreen();
        }
        updateScreen();
    }
});

const allUpgrades = [
    { button: btnStrongerFingers, getCost: () => physicalUpgradeOneCost },
    { button: btnPhysicalUpgradeTwo, getCost: () => physicalUpgradeTwoCost },
    { button: btnPhysicalUpgradeThree, getCost: () => physicalUpgradeThreeCost },
    { button: btnMentalUpgradeOne, getCost: () => mentalUpgradeOneCost },
    { button: btnMentalUpgradeTwo, getCost: () => mentalUpgradeTwoCost },
    { button: btnMentalUpgradeThree, getCost: () => mentalUpgradeThreeCost }
];

function checkAffordability() {
    for (let upgrade of allUpgrades) {

        let currentCost = upgrade.getCost(); 
        let btn = upgrade.button;            

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
    nextLetterTitle.innerText = "Next letter to type"
    applyShakeIntensity()
    updateTextWritten()

    let progressPercentage = (letterIndex / textToWrite.length) * 100;
    progressBar.style.width = progressPercentage + "%";

    progressText.innerText = Math.floor(progressPercentage) + "% completed (" + letterIndex + " / " + textToWrite.length + ") (Scroll down to see your text progress)";

    updateCosts()
    checkAffordability()
}

updateScreen()