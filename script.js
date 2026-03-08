const myImage = document.getElementById("runningPicture");


setInterval(function() {

// 3. Check the current file name using getAttribute
let currentFile = myImage.getAttribute("src");

// 4. Swap the images based on what is currently showing
if (currentFile === "run1.jpeg") {
    myImage.src = "run2.jpeg";
} else {
    myImage.src = "run1.jpeg";
}

}, 500);
