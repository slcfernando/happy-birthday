"use strict";

const grid = document.getElementById("grid");
const resizeButton = document.querySelector("#resize");
const classicButton = document.querySelector("#classic");
const rainbowButton = document.querySelector("#rainbow")
const bwButton = document.querySelector("#bw")
let size = 16;  // default size
let pixels;
let canvasMode = "CLASSIC";  // default mode

createCanvas(size);
addCanvasEventListeners();
classicButton.disabled = true;

resizeButton.addEventListener("click", () => {
    do {
        size = prompt("Enter square grid side length:");
        if (size === null) {
            break;
        } else if (size < 10 || size > 80) {
            alert("Please enter from 10-80 only.");
        } 
    } while (size < 10 || size > 80);

    if (size) {
        deleteCanvas();
        createCanvas(size);
        addCanvasEventListeners();
    }
})
classicButton.addEventListener("click", () => {
    setCanvasMode("CLASSIC");
});
rainbowButton.addEventListener("click", () => {
    setCanvasMode("RAINBOW");
});
bwButton.addEventListener("click", () => {
    setCanvasMode("BW");
});

function createCanvas(sideLength) {
    for (let i = 0; i < sideLength; i++) {
        for (let j = 0; j < sideLength; j++) {
            let pixel = document.createElement("div");
            pixel.className = "pixel";
            pixel.style.backgroundColor = "rgb(255, 255, 255)";
            grid.appendChild(pixel);
        }
    }
    pixels = document.querySelectorAll(".pixel");
    grid.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
}

function deleteCanvas() {
    pixels.forEach((pixel) => pixel.remove());
}

function addCanvasEventListeners() {
    pixels.forEach((pixel) => {
        pixel.addEventListener("mouseenter", () => {
            if (canvasMode == "CLASSIC") {
                if (pixel.style.backgroundColor == "rgb(255, 255, 255)") {
                    pixel.style.backgroundColor = "rgb(210, 210, 210)";
                } else {
                    pixel.style.backgroundColor = "rgb(255, 255, 255)";
                }
            } else if (canvasMode == "RAINBOW") {
                pixel.style.backgroundColor = `rgb(${Math.floor((Math.random() * 256))}, ${Math.floor((Math.random() * 256))}, ${Math.floor((Math.random() * 256))})`;
            } else if (canvasMode == "BW") {
                let rgbLength = pixel.style.backgroundColor.length;
                let rgbNumbers = pixel.style.backgroundColor.substring(4,rgbLength-1).split(", ");
                if (rgbNumbers[0] == 3) {  // if the rgb value is (3, 3, 3), it's reached the darkest possible shade
                    pixel.style.backgroundColor = "rgb(255, 255, 255)";
                } else {
                    pixel.style.backgroundColor = `rgb(${rgbNumbers[0]-28}, ${rgbNumbers[1]-28}, ${rgbNumbers[2]-28})`;
                }
            }
        })
    });
}

function setCanvasMode(mode) {
    clearCanvas();
    classicButton.disabled = false;
    rainbowButton.disabled = false;
    bwButton.disabled = false;

    switch (mode) {
        case "CLASSIC":
            canvasMode = "CLASSIC";
            classicButton.disabled = true;
            break;
        case "RAINBOW":
            canvasMode = "RAINBOW";
            rainbowButton.disabled = true;
            break;
        case "BW":
            canvasMode = "BW";
            bwButton.disabled = true;
            break;
    }
}

function clearCanvas() {
    pixels.forEach((pixel) => pixel.style.backgroundColor = "rgb(255, 255, 255)");
}