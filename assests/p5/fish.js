//===================================================================================
// Fish Class: 
// Creates a fish, behavior are executed in the run function. 
// Magnitude of flocking forces are adjusted in the flocking function. 
//===================================================================================

class Fish {
  	
	constructor(r,g,b){
		this.location = new createVector(random(clientWidth), random(clientHeight));
		this.velocity = new createVector(0,0);
		this.acceleration = new createVector(0,0);
    this.topspeed = 4;
    this.maxforce = 0.05;
    this.angle = this.velocity.heading();
    this.fishRadius = 10;
    this.tail = new Tail(this.fishRadius);
    this.color = {red:r, green:g, blue: b};
    this.flocking = false;
    this.distance = distanceSlider.value();

    // Used for perlin steps on meander
    this.xoff = 0 + random(500);
    this.yoff = 1000 + random(500);
  }
  


  //===================================================================================
  // Run Function
  //===================================================================================

  run(school,shark){
    this.flock(school);
    this.fear(shark);
    this.meander();
    this.update();
    this.checkEdges();
    this.display();
  }

  //===================================================================================
  // ApplyForce Method: Applies a force to the fish 
  //===================================================================================

  applyForce(force) {
    // let f = p5.Vector.div(force, this.mass); // You can manipulate with mass here
    this.acceleration.add(force);
  }

  //===================================================================================
  // Flock Function: Run all flocking behaviors here
  //===================================================================================

	flock(school){
    let separation = this.separate(school);
    let alignment = this.align(school);
    let cohesion = this.cohere(school);

    // If the magnitude of all the flocking forces is zero then you are not flocking!
    if ( (separation.mag() + alignment.mag() + cohesion.mag()) === 0 ){
      this.isflocking = false;
    } else {
      this.isflocking = true;
    }

    separation.mult(separationSlider.value());
    alignment.mult(alignmentSlider.value());
    cohesion.mult(cohesionSlider.value());

    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);
  }
  
  //===================================================================================
  // Update Function: Update velocity, and location, make the tail swim too
  //===================================================================================

	update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.location.add(this.velocity);

    this.tail.swim(this.velocity.mag());

    this.acceleration.mult(0);
	}



  //===================================================================================
  // Display Function: Used to display different components of the fish
  //===================================================================================

  display(){
    // Don't add a heading unless it exists
    if (this.velocity.heading() != 0) {
      this.angle = this.velocity.heading();
    }

    noStroke();
    fill(this.color.red,this.color.green,this.color.blue);
    push();
    ellipseMode(CENTER);
    translate(this.location.x, this.location.y);
    rotate(this.angle);
    ellipse(0, 0, this.fishRadius*2, this.fishRadius*2);
    fill(255);
    this.tail.draw(this.color.red,this.color.green,this.color.blue);
    pop();
  }


  //===================================================================================
  // Meander Method: Fish will randomly move around the screen 
  //===================================================================================

  meander(){
    if (!this.isflocking){
    	let x = map(noise(this.xoff),0,1,-3,3);
      let y = map(noise(this.yoff),0,1,-3,3);

      let meanderforce =  new p5.Vector(x,y);
      meanderforce.limit(this.maxforce);
      meanderforce.mult(1.0);
      this.applyForce(meanderforce);

      // Take the next step through our perlin field
      this.xoff += 0.01;
      this.yoff += 0.01;
    }
  }

  //===================================================================================
  // Change Color Method: Change the color of the fish 
  //===================================================================================

  changeColor(r,g,b){
    this.color.red = r;
    this.color.green = g;
    this.color.blue = b;
  }


  //===================================================================================
  // CheckEdges Method: Allows for the fish to wrap around edges of the viewport
  //===================================================================================

	checkEdges(){
		if (this.location.x > clientWidth) {
      this.location.x = 0;
    }
    else if (this.location.x < 0) {
      this.location.x = clientWidth;
    }
    
    
    if (this.location.y > clientHeight) {
      this.location.y = 0;
    }
    else if (this.location.y < 0) {
      this.location.y = clientHeight;
    }

  }

  //===================================================================================
  // Steer Method: Calculates and returns a steering for to a desired location
  //===================================================================================

  seek(target) {
    let desired = p5.Vector.sub(target,this.location);
    desired.normalize();
    desired.mult(this.topspeed);
    let steer = p5.Vector.sub(desired,this.velocity);
    steer.limit(this.maxforce);
    return steer;
  }


  //===================================================================================
  // Separate Method: Calculates and returns a separation force 
  //===================================================================================

  separate(school) {
    let desiredsepartion = 35;
    let steer = new p5.Vector(0,0);
    let count = 0; 
    
    // Find the neighbors in your range
    school.forEach(fish => {
      let d = p5.Vector.dist(this.location, fish.location);
      if ((d > 0) && (d < desiredsepartion)){
        // Calculate the repelling force between you and that fish
        let diff = p5.Vector.sub(this.location, fish.location);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
        count++;
      }
    });

    // Average the steering forces
    if (count > 0) {
      steer.div(count);
    }
    // As as that steering vector is greater than zero
    if (steer.mag() > 0){
      // implement steering
      steer.normalize();
      steer.mult(this.topspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }

    return steer;
  }

  
  //===================================================================================
  // Alignment Method: Calculates and returns an alignment force with neighbors
  //===================================================================================

  align(school){

    let neighborhood = distanceSlider.value(); 
    let sum = new p5.Vector(0,0);
    let count = 0;

    school.forEach(neighbor => {
      let d = p5.Vector.dist(this.location,neighbor.location);
      if ((d > 0) && (d < neighborhood)){
        sum.add(neighbor.velocity);
        count++
      }
    });

    if (count > 0){
      sum.div(count); // Average
      sum.normalize();
      sum.mult(this.topspeed);
      let steer = p5.Vector.sub(sum,this.velocity);
      steer.limit(this.maxforce);
      
      return steer
    
    } else {
      return new p5.Vector(0,0);
    }

  }

  
  //===================================================================================
  // Cohesion Method: Calculates and returns a cohesion force so that you stick with the group
  //===================================================================================

  cohere(school){

    let neighborhood = distanceSlider.value(); 
    let sum = new p5.Vector(0,0);
    let count = 0;

    school.forEach(neighbor => {
      let d = p5.Vector.dist(this.location,neighbor.location);
      if ((d > 0) && (d < neighborhood)){
        sum.add(neighbor.location);
        count++
      }
    });

    if (count > 0){
      sum.div(count); // Average
      return this.seek(sum);
    } else {
      return new p5.Vector(0,0);
    }

  }

  //===================================================================================
  // Fear of Shark Method: If there is a shark nearby, run away!
  //===================================================================================
  fear(shark){
    
    let feardistance = skittishSlider.value(); 
    let d = p5.Vector.dist(this.location, shark.location);
    
    // If we are withing scare range
    if ((d > 0) && (d < feardistance)){
      this.changeColor(255,255,255);
      
      // Get a vector pointing in the opposite direction of shark
      let steer = p5.Vector.sub(this.location, shark.location);
      steer.normalize();
      steer.div(d*d); // Weight it by the distance^2
      
      //Reynolds steering theory
      steer.normalize();
      steer.mult(7); // Weight it some more
      steer.sub(this.velocity);
      steer.limit(this.maxforce);

      steer.mult(10.0); // area to scale
      this.applyForce(steer); //apply to the fishy

    } else {
      this.changeColor(120,180,173);
    }

  }

}