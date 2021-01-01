class Fish {
	
	constructor(r,g,b){
		this.location = new createVector(random(clientWidth), random(clientHeight));
		this.velocity = new createVector(0,0);
		this.acceleration = new createVector(0,0);
    this.topspeed = 5;
    this.maxforce = 0.05;
    this.angle = this.velocity.heading();
    this.fishRadius = 10;
    this.tail = new Tail(this.fishRadius);
    this.color = {red:r, green:g, blue: b};


    this.xoff = 0 + random(500);
    this.yoff = 1000 + random(500);
  }
  


  //===================================================================================
  // Update Function: All fish calculations will be processed here once per frame
  //===================================================================================
  run(){
    // Think about scaling the meander, it will dictate how natural schooling appears
    this.meander();
    this.update();
    this.checkEdges();
    this.display();
  }

  //===================================================================================
  // Update Function: All fish calculations will be processed here once per frame
  //===================================================================================
	update(){
    // Scalefactor used if you need to adjust the strength of the acceleration vector 
    let scaleFactor = 1;
    this.acceleration.mult(scaleFactor);

    // Update the location via vector addition 
		this.velocity = this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.location = this.location.add(this.velocity);
    
    // Make the tail swim 
    this.tail.swim(this.velocity.mag());
    
    // Ensure that you acceleration isn't accumulating over time 
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
  // ApplyForce Method: Applies a force to the fish 
  //===================================================================================
  applyForce(force) {
    // let f = p5.Vector.div(force, this.mass); // You can manipulate with mass here
    this.acceleration.add(force);
  }


  //===================================================================================
  // Meander Method: Fish will randomly move around the screen 
  //===================================================================================
  meander(){
    	this.acceleration.x += map(noise(this.xoff),0,1,-3,3);
      this.acceleration.y += map(noise(this.yoff),0,1,-3,3);
      // Take the next step through our perlin field
      this.xoff += 0.01;
			this.yoff += 0.01;
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
  steer(target) {
    let desired = p5.Vector.sub(target,this.location);
    desired.normalize();
    desired.mult(this.topspeed);
    steer = p5.Vector.sub(desired,this.velocity);
    // Make steer negative if you want to repel
    return steer;
  }

  // THINK ABOUT HOW THIS WILL BE DIFFERENT FOR SHARKS AND MINNOWS
  //===================================================================================
  // Separate Method: Calculates and returns a separation force 
  //===================================================================================
  separate(school) {
    let desiredsepartion = 20;
    let steer = new p5.Vector(0,0);
    let count = 0; 
    //console.log(school);
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

}