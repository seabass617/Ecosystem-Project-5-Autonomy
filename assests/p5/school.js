//===================================================================================
// School Class: 
// Manages populating a school of fish
// Also runs each fish 
//===================================================================================
class School {

  constructor(){
    this.fishes = new Array();
    this.populate();
  }

  populate(){
    for ( let i = 0; i < 250; i++ ){
      this.fishes.push(new Fish(120,180,173));
    }
  }

  run(shark){
    this.fishes.forEach(fish => {
      fish.run(this.fishes, shark);
    })
  }

}