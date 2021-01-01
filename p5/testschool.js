class School {

  constructor(){
    this.fishes = new Array();
    this.populate();
  }

  populate(){
    for ( let i = 0; i < 100; i++ ){
      this.fishes.push(new TestFish(120,180,173));
    }
  }

  run(){
    this.fishes.forEach(fish => {
      fish.run(this.fishes);
    })
  }

}