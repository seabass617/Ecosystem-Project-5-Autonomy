//====================================================================================
//  Main Sketch File
//====================================================================================

//Declare global variables
//let minnows = new Array(100);
let school;
let shark;
let clientWidth, clientHeight;
let separationSlider, alignmentSlider, cohesionSlider, distanceSlider,
skittishSlider; 

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
	
	//pixelDensity(3);
	// Window Detection
	clientHeight = document.getElementById('window').clientHeight;
	clientWidth = document.getElementById('window').clientWidth;
	
	// Creating Canvas
	canvas = createCanvas (clientWidth, clientHeight);
	canvas.position(0,0);
	canvas.style('z-index', '-10');

	// Background Color
	background(248,189,127);

		//Creating Sliders
		separationSlider = createSlider(0,10,6,0.1);
		separationSlider.position(20,50);
		alignmentSlider = createSlider(0,10,5,0.1);
		alignmentSlider.position(20,100);
		cohesionSlider = createSlider(0,4,1,0.1);
		cohesionSlider.position(20,150);
		distanceSlider = createSlider(20,200,50,5);
		distanceSlider.position(20,200);
		skittishSlider = createSlider(100,300,150,5);
		skittishSlider.position(20,250);


	// Creating an instance a shark minnow system
	shark = new TestShark(0,0,0);
	school = new School();
	//shark.setSchool(school);
}

//===================================================================================
// Main Draw Function: Repeated Every Frame
//===================================================================================
function draw() {
	// Redraw Background Color (Necessary?)
	background(248,189,127);
	school.run(shark);
	shark.run(school);


		// Text for slider	
		fill(255);
		textSize(18);
		text('Separation', 35, 40);
		fill(255);
		textSize(18);
		text('Alignment', 35, 90);
		fill(255);
		textSize(18);
		text('Cohesion', 35, 140);
		fill(255);	
		textSize(18);
		text('Neighborhood', 35, 190);
		fill(255);	
		textSize(18);
		text('Skittishness', 35, 240);
		fill(255);

}



