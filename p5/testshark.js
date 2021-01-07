class TestShark extends TestFish {
  constructor(r,g,b){
    super(r,g,b);
    this.topspeed = 3;
    this.fishRadius = 30;
    this.tail = new SharkTail(this.fishRadius);
    this.maxforce = 0.05;
    this.isHunting = false;
  }

  run(school){
    //this.hunt(school);    
    this.meander();
    this.update();
    this.checkEdges();
    this.display();
  }

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

  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.location.add(this.velocity);

    this.tail.swim(this.velocity.mag());

    this.acceleration.mult(0);
  }

  // the shark should have a hunting method which basically steers it towards the 
  // closest fish within it's radius. Test fear method first 
  meander(){
    if (!this.isHunting){
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

  // Initializes a school within this shark object so that it can be used in hunt 


  hunt(school){
    let range = 300;
    //potentially area to not create a fuck ton more pvectors every time
    school.fishes.forEach(fish => {
      let d = p5.Vector.dist(this.location, fish.location);
      if ((d > 0) && (d < range)){
        this.isHunting = true;
        let steer = this.seek(fish.location);
        steer.limit(this.maxforce);
        this.applyForce(steer.mult(2));
      } else {
        this.isHunting = false;
      }
    });

  }

}