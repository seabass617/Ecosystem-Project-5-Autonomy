class Minnow extends Fish {
	
	constructor(r,g,b){
    super(r,g,b);
    this.topspeed = 2;
    //below is only for testing
    this.location = new createVector((clientWidth/2) + 100 , clientHeight/2 );

  }

  //===================================================================================
  // Scare Functions: Will change color and speed of scared minnows
  //===================================================================================
  isScared(showscare){
    // Conditional to allow for toggling of changing color or not
    if (showscare){
      this.changeColor(255,255,255);
    }
    this.topspeed = 5;
  }

  notScared(){
    this.changeColor(120,180,173);
    this.topspeed = 2;
  }
  
  //===================================================================================
  // Scare Functions: Will change color and speed of scared minnows
  //===================================================================================
  run(school){
        // Think about scaling the meander, it will dictate how natural schooling appears
        //this.meander();
        //console.log(school);
        let separationforce = this.separate(school);
        //weight your forces here
        separationforce.mult(2.0);
        //console.log(separationforce);
        this.applyForce(separationforce);
        this.update();
        this.checkEdges();
        this.display();
  }


}