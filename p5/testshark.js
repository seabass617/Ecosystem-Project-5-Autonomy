class TestShark extends TestFish {
  constructor(r,g,b){
    super(r,g,b);
    this.topspeed = 3;
    this.fishRadius = 30;
    this.tail = new Tail(this.fishRadius);
    this.maxforce = 0.05;
    this.isHunting = false;
  }

  run(school){
    this.hunt(school);    
    this.meander();
    this.update();
    this.checkEdges();
    this.display();
  }

  // the shark should have a hunting method which basically steers it towards the 
  // closest fish within it's radius. Test fear method first 
  meander(){
    if (!this.isHunting){
    this.acceleration.x += map(noise(this.xoff),0,1,-3,3);
    this.acceleration.y += map(noise(this.yoff),0,1,-3,3);
    // Take the next step through our perlin field
    this.xoff += 0.01;
    this.yoff += 0.01;
    }
  }

  hunt(school){
    let range = 100;
    //potentially area to not create a fuck ton more pvectors every time
    // school.forEach(fish => {
    //   let d = p5.Vector.dist(this.location, fish.location);
    //   if ((d > 0) && (d < range)){
    //     this.isHunting = true;
    //     let steer = this.seek(fish.location);
    //     steer.limit(this.maxforce);
    //     this.applyForce(steer);
    //   } else {
    //     this.isHunting = false;
    //   }
    // });
    //console.log(school);
    for (let i = 0; i <= school.length; i++) {
      console.log("We are in here!");
      let d = p5.Vector.dist(this.location, school[i].location);
      if ((d > 0) && (d < range)){
        console.log("we are here!");
        this.isHunting = true;
        let steer = this.seek(fish.location);
        steer.limit(this.maxforce);
        this.applyForce(steer);
      } else {
        this.isHunting = false;
      }
    }
  }

}