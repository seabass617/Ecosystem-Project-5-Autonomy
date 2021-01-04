class TestShark extends TestFish {
  constructor(r,g,b){
    super(r,g,b);
    this.topspeed = 3;
    this.fishRadius = 30;
    this.tail = new Tail(this.fishRadius);
  }

  run(){
    this.meander();
    this.update();
    this.checkEdges();
    this.display();
  }

  // the shark should have a hunting method which basically steers it towards the 
  // closest fish within it's radius. Test fear method first 
  meander(){
    this.acceleration.x += map(noise(this.xoff),0,1,-3,3);
    this.acceleration.y += map(noise(this.yoff),0,1,-3,3);
    // Take the next step through our perlin field
    this.xoff += 0.01;
    this.yoff += 0.01;
}
}