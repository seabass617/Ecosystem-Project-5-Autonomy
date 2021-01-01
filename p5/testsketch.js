//====================================================================================
//  Main Sketch File
//====================================================================================

//Declare global variables
//let minnows = new Array(100);
let school;
let clientWidth, clientHeight;

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
  school = new School();
}

//===================================================================================
// Main Draw Function: Repeated Every Frame
//===================================================================================
function draw() {
	// Redraw Background Color (Necessary?)
	background(248,189,127);

	school.run();
}



