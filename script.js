"use strict";

const grid = document.getElementById("grid");
const resizeButton = document.querySelector("#resize");
const classicButton = document.querySelector("#classic");
const rainbowButton = document.querySelector("#rainbow")
const bwButton = document.querySelector("#bw")
let size = 21;  // default size
let pixels;
let canvasMode = "BW";  // default mode
let pixelArray = [];
let redArray = [];

const RED = [48, 49, 57, 58, 
    68, 69, 70, 71, 72, 76, 77, 78, 79, 80, 
    88, 89, 90, 91, 92, 93, 94, 96, 97, 98, 99, 100, 101, 102, 
    283, 284, 285, 
    305,
    338, 342, 345, 346, 347, 348, 352, 352, 353, 354,
    359, 363, 366, 369, 373, 376,
    380, 381, 382, 383, 384, 387, 388, 389, 390, 391, 394, 398,
    401, 405, 408, 412, 415, 419,
    422, 426, 429, 430, 431, 432, 433, 437, 438, 439, 440];
for (let i = 109; i <= 123; i++) {
    RED.push(i);
}
for (let i = 130; i <= 144; i++) {
    RED.push(i);
}
for (let i = 152; i <= 164; i++) {
    RED.push(i);
}
for (let i = 174; i <= 184; i++) {
    RED.push(i);
}
for (let i = 196; i <= 204; i++) {
    RED.push(i);
}
for (let i = 217; i <= 225; i++) {
    RED.push(i);
}
for (let i = 239; i <= 245; i++) {
    RED.push(i);
}
for (let i = 261; i <= 265; i++) {
    RED.push(i);
}
for (let i = 109; i <= 123; i++) {
    RED.push(i);
}

createCanvas(size);
addCanvasEventListeners();

function createCanvas(sideLength) {
    for (let i = 0; i < sideLength; i++) {
        pixelArray.push([]);
    }
    for (let i = 0; i < sideLength; i++) {
        for (let j = 0; j < sideLength; j++) {
            let pixel = document.createElement("div");
            pixel.className = "pixel";
            pixel.style.backgroundColor = "rgb(255, 255, 255)";
            grid.appendChild(pixel);
            pixelArray[j].push(pixel);
            if (RED.includes(i*21 + (j+1))) {
                redArray.push(pixel);
                pixel.className = "pixel red";
            }
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
        pixel.addEventListener("mouseenter", pixelEventListener);
    });
}

function pixelEventListener(event) {
    let pixel = event.target;
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
        if (rgbNumbers[2] == 85 && pixel.className.includes("red")) {  // if the rgb value is (85, 85, 85), it's the second darkest possible shade
            pixel.style.backgroundColor = "rgb(123, 0, 0)";
            pixel.removeEventListener("mouseenter", pixelEventListener);
        } else {
            pixel.style.backgroundColor = `rgb(${rgbNumbers[0]-85}, ${rgbNumbers[1]-85}, ${rgbNumbers[2]-85})`;
        }
    }
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