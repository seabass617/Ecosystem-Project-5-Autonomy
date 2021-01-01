class Shark extends Fish {
	
	constructor(r,g,b){
    super(r,g,b);
    this.fishRadius = 30; 
    this.mass = 5;
    this.tail = new Tail(this.fishRadius);
    this.topspeed = 3;
    this.drawRadius = true;
  }
  
  //===================================================================================
  // Scare Function: Calculates the scare force of the shark
  //===================================================================================
  scare(minnow) {
    // Calculate the force to scare the minnow
    let force = p5.Vector.sub(this.location, minnow.location);
    let distance = force.mag();
    force.normalize(); 
    let strength = (-scareIntensitySlider.value()/ distance);
    
    // Stop when we get to the food
    if (distance <= scareRadiusSlider.value()) {
       force.mult(strength);
    } else {
       force.mult(0);
    }
     // Return the force as a vector
    return force;
  }

  //===================================================================================
  // Display Function: Used to display different components of the fish
  //===================================================================================
  display(){
    super.display();
    if (this.drawRadius){
      noFill();
      stroke(255,255,255);
      ellipse(this.location.x, this.location.y, scareRadiusSlider.value() *2, scareRadiusSlider.value() *2);  
    } 
  }

  //===================================================================================
  // Toggle Function: Used to toggle between drawing or not drawing the scare radius
  //===================================================================================

  toggleDrawRadius(){
    this.drawRadius = this.drawRadius === true ? false : true;
  }

}