class SystemSharkMinnow {

  constructor(){
    this.minnows = new Array;
    this.sharks = new Array;
    this.repeller = new Repeller;
    this.populate();
    this.fishes = this.minnows.concat(this.sharks);
    this.allowScareColor = true;
  }

  //===================================================================================
  // Populate Function: Populates the system with fish and a shark
  //===================================================================================
  populate(){
    for ( let i = 0; i < 1; i++ ){
      this.minnows.push(new Minnow(120,180,173));
    }

    this.minnows.push(new TestFish(0,0,0));
    //this.sharks.push(new Shark(62,78,80));
  }
  //===================================================================================
  // Run Function: Repeated Every Frame
  //===================================================================================
  run(){
    // Apply the repelling effect of the shark to the minnows
    //this.applyRepeller(this.sharks[0]);
    
    //Run all the fish in the system 
    //console.log(this.minnows);
    this.fishes.forEach( fish => fish.run(this.minnows) );
    
  }

  //===================================================================================
  // Apply Repeller Function: Sharks scare the minnows
  //===================================================================================
  applyRepeller(shark){
    this.minnows.forEach( minnow => {
      let force = shark.scare(minnow);
      //If they are in the radius, their force magnitude won't be zero, so apply that force and make it scared
      if (force.mag() != 0){
        minnow.applyForce(force);
        minnow.isScared(this.allowScareColor);
      } else {
        minnow.notScared();
      }
    })
  }

  //===================================================================================
  // Toggle Functions Associated with Buttons
  //===================================================================================
  toggleSharkScareRadius() {
    this.sharks.forEach( shark => {
      shark.toggleDrawRadius();
    });
  }

  toggleScareColor() {
    this.allowScareColor = this.allowScareColor === true ? false : true;
  }
}