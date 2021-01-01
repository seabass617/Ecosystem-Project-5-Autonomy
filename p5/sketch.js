//====================================================================================
//  Main Sketch File
//====================================================================================

//Declare global variables
//let minnows = new Array(100);
let sharkminnowsystem;
let clientWidth, clientHeight;
let scareRadiusSlider, scareIntensitySlider; 
let radiusToggleButton, scareToggleButton;

//===================================================================================
// Responsiveness
//===================================================================================
function windowResized() {
	console.log("resized");
	clientHeight = document.getElementById('window').clientHeight;
	clientWidth = document.getElementById('window').clientWidth;
	resizeCanvas(clientWidth, clientHeight);
}

//===================================================================================
// Main Setup Function: Initialize Variables
//===================================================================================
function setup() {
	
	// Window Detection
	clientHeight = document.getElementById('window').clientHeight;
	clientWidth = document.getElementById('window').clientWidth;
	
	// Creating Canvas
	canvas = createCanvas (clientWidth, clientHeight);
	canvas.position(0,0);
	canvas.style('z-index', '-10');

	// Background Color
	background(248,189,127);

	// Creating an instance a shark minnow system
	sharkminnowsystem = new SystemSharkMinnow();

	// Creating Sliders/Buttons
	scareRadiusSlider = createSlider(100,400,200,10);
	scareRadiusSlider.position(20,50);
	scareIntensitySlider = createSlider(100,500,200,10);
	scareIntensitySlider.position(20,125);
	radiusToggleButton = createButton('Toggle Scare Radius');
	radiusToggleButton.position(20, 200);
	radiusToggleButton.mousePressed(toggleScareRadius);
	radiusToggleButton = createButton('Toggle Scare Color');
	radiusToggleButton.position(20, 250);
	radiusToggleButton.mousePressed(toggleScareColor);
}

//===================================================================================
// Main Draw Function: Repeated Every Frame
//===================================================================================
function draw() {
	//Redraw Background Color (Necessary?)
	background(248,189,127);

	sharkminnowsystem.run();

	// Text for slider	
	fill(255);
	textSize(16);
	text('Scare Radius', 35, 90);
	fill(255);
	textSize(16);
	text('Scare Intensity', 35, 165);
	fill(255);
}

//===================================================================================
// Toggle Functions: Used for buttons
//===================================================================================
function toggleScareRadius() {
	sharkminnowsystem.toggleSharkScareRadius();
}


function toggleScareColor() {
	sharkminnowsystem.toggleScareColor();
}


