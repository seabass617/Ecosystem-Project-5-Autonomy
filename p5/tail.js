class Tail {
  constructor(fishRadius){
    this.theta = 0;
    this.fishRadius = fishRadius;
    this.period = 10;

    // Set initial location of the tail 
    this.tx1 = -this.fishRadius * cos(this.theta);
    this.ty1 = this.fishRadius * sin(this.theta);
    this.tx2 = -(this.fishRadius*2) * cos(this.theta + PI/8);
    this.ty2 = (this.fishRadius*2) * sin(this.theta + PI/8);
    this.tx3 = -(this.fishRadius*2) * cos(-this.theta + PI/8);
    this.ty3 = -(this.fishRadius*2) * sin(-this.theta + PI/8);

  }

  //===================================================================================
  // Swim Method: Oscillation calculations run to keep the fishy swimming
  //===================================================================================
  swim(fishVelocity) { 
    
    // // Code for moving the tail relative to the velocity
    // if (fishVelocity != 0){
    //  this.period = 40/fishVelocity;// divide by velocity to have it related to this velocity
    // } else {
    //    this.period = 60;
    // }

    this.theta = PI/8 * cos(2*PI * (frameCount/this.period));

    // Update the location of the tail
    this.tx1 = -this.fishRadius * cos(this.theta);
    this.ty1 = this.fishRadius * sin(this.theta);
    this.tx2 = -(this.fishRadius*2) * cos(this.theta + PI/8);
    this.ty2 = (this.fishRadius*2) * sin(this.theta + PI/8);
    this.tx3 = -(this.fishRadius*2) * cos(-this.theta + PI/8);
    this.ty3 = -(this.fishRadius*2) * sin(-this.theta + PI/8);
  }

  //===================================================================================
  // Draw Method: Draw the triangle that acts as the tail 
  //===================================================================================
  draw(r,g,b) {
    fill(r,g,b);
    triangle(this.tx1, this.ty1, this.tx2, this.ty2, this.tx3, this.ty3,);
  }
}
