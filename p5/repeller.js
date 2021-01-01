class Repeller {
  
  constructor() {
    this.location = createVector(clientWidth/2,clientHeight/2);
    this.mass = 5;
    this.scaleFactor = 100; 
  }

  //===================================================================================
  // Dsiplay Function: Displays the food on the viewport
  //===================================================================================
  display(){
    noStroke();
    fill(0,0,0);
    ellipse(this.location.x, this.location.y, this.mass * 5, this.mass * 5)
    noFill();
    stroke(255,255,255);
    ellipse(this.location.x, this.location.y, 200, 200);
  }

  //===================================================================================
  // Calculate Attraction: Calculates the force that the food imparts on a fish
  //===================================================================================
  repel(fish){
    let force = p5.Vector.sub(this.location, fish.location);
    let distance = force.mag();
    fish.topspeed = this.mass;
    fish.topspeed = constrain(fish.topspeed,1,10);
    force.normalize(); 
    let strength = (-this.scaleFactor/ distance);
    
    // Stop when we get to the food
    if (distance <= 100) {
       force.mult(strength);
       fish.changeColor(255,255,255);
    } else {
       force.mult(0);
    }
     // Return the force as a vector
    return force;
  }
}