//====================================================================================
//  Main Sketch File
//====================================================================================

//Declare global variables
//let minnows = new Array(100);
let school;
let shark;
let clientWidth, clientHeight;
let separationSlider, alignmentSlider, cohesionSlider; 

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
	shark = new TestShark(0,0,0);
	school = new School();

	//Creating Sliders
	separationSlider = createSlider(20,70,35,5);
	separationSlider.position(20,50);
	alignmentSlider = createSlider(0,4,1,0.1);
	alignmentSlider.position(20,125);
	cohesionSlider = createSlider(0,4,1,0.1);
	cohesionSlider.position(20,200);

	
}

//===================================================================================
// Main Draw Function: Repeated Every Frame
//===================================================================================
function draw() {
	// Redraw Background Color (Necessary?)
	background(248,189,127);
	shark.run(school);
	school.run(shark);

		// Text for slider	
		fill(255);
		textSize(16);
		text('Separation', 35, 90);
		fill(255);
		textSize(16);
		text('Alignment', 35, 165);
		fill(255);
		fill(255);
		textSize(16);
		text('Cohesion', 35, 240);
		fill(255);	
}



