class MinnowFood {
  
  constructor(x,y) {
    this.location = createVector(x,y);
    this.mass = foodSlider.value();
    this.scaleFactor = 1; 
  }

  //===================================================================================
  // Dsiplay Function: Displays the food on the viewport
  //===================================================================================
  display(){
    noStroke();
    fill(245,172,114);
    ellipse(this.location.x, this.location.y, this.mass * 5, this.mass * 5)
  }

  //===================================================================================
  // Calculate Attraction: Calculates the force that the food imparts on a fish
  //===================================================================================
  calculateAttraction(fish){
    let force = p5.Vector.sub(this.location, fish.location);
    let distance = force.mag();
    
    // Stop when we get to the food
    if (distance <= 20) {
      force.mult(0);
      fish.velocity.mult(0);
    }
    
    fish.topspeed = this.mass;
    fish.topspeed = constrain(fish.topspeed,1,10)
    force.normalize(); 
    let strength = (this.scaleFactor * this.mass *  fish.mass * distance);
    force.mult(strength);

    // Return the force as a vector
    return force;
  }
}
