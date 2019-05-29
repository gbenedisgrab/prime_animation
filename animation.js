class Animation {
  constructor(n) {
    this.primes = [2, 3, 5, 7,11];
    this.n = n;
    let x = 175;
    let y = 12;
    this.space = 80;
    this.pl = new PrimeList(this.primes,x,y,this.space);
    this.value = 1;  // current value of the pf
    this.limit = 4;  //think more about this.
    this.pfList = [];
  }

  show() {
    if (this.num) this.num.show(); // show the flying number;
    this.pl.show(); // disp primelist
    this.pf.show(this.primes); // disp the pf
    for(let p of this.pfList) p.show(this.primes);
    if (this.product) this.product.show();
    fill(0); textSize(20);
    text("value", 80, 220);
    textSize(70);
    text(this.value, 70, 170);
    if (this.times) {
      textSize(30);
      text('x', 190, 155);
      text('=', 340, 155);
    }
    fill(0,0,255);
    textSize(20);
    text("n = "+str(this.n),10,20);
  }

  nextMove() {
    if (this.cur > this.limit) this.cur = 0;
    setTimeout(() => {
      this.pl.setSelector(this.cur);
      setTimeout(
        () => {
          // I need to align all these coordinates so they work.
          let v = createVector(this.pl.x + 25 + this.space * this.cur, 62);
          this.num = new Num(this.primes[this.cur], v, color(0),40);
          this.num.glideTo(createVector(250, 170), 70);
          this.times = true;
          setTimeout(() => {
            //this.product = this.pf.value * this.primes[this.cur];
            let pos = createVector(400,170);
            let val = this.primes[this.cur]*this.value;
            this.product = new Num(val,pos,color(0),70);
            if (this.product.val < this.n) {
              setTimeout(() => {
                delete this.times;
                this.num.glideTo(createVector(this.pl.x + 25 + this.space * this.cur, 250), 40);
                setTimeout(() => {
                  this.product.glideTo(createVector(70,170),70);
                  this.pf.rep[this.cur]++;
                  this.cur++;
                  setTimeout(() => {
                    this.value = this.product.val;
                    delete this.product;
                    this.nextMove();
                  },400);
                }, 500);
              }, 1000);
            } else {
              this.product.flash();
              setTimeout(() => {
                if (this.cur == 0) {
                  this.newPl();
                } else {
                  delete this.product;
                  this.cur = 0;
                  this.nextMove();
                }
              },1200);
            }
          }, 1500);
        }, 1000)
      }, 1000);
  }
  final() {
    for (let f of this.pfList) {
    }
    // do the last animation stuff
  }
  newPl() {  // maybe combine with run();
    this.pf.box = true;
    delete this.product;
    delete this.times;
    delete this.num;
    setTimeout(() => {
      this.pf.box = false;
      if (this.pf.limit) delete this.pf.limit
      this.pf.glideTo(createVector(40,350 + 70*this.pfList.length));
      setTimeout(()=> {
        this.pfList.push(this.pf);
        let rep = this.pf.rep.slice(0);
        this.limit=100;
        for (let i=1;i<rep.length-1;i++) {
          if (rep[i]>rep[i+1]){
            this.limit = i-1;
          }
        }
        if (rep[1]==0) {
          this.final();
          return;
        }
        rep[this.limit+1]--;
        for (let i=0;i<this.limit+1;i++){
          rep[i]=0;
        }
        this.pf =new Pf(rep,createVector(200,250),80);
        this.pf.limit = this.limit+1;
        this.pl.limit = this.limit+1;
        this.cur = 0;
        this.value = 1;  // get a real value function
        for (let i = this.limit+1;i<rep.length;i++){
          this.value *= Math.pow(this.primes[i],rep[i]);
        }
        console.log(rep,this.value);
        // I need to know when to stop
        // I need to add the proper constraint with coloring to
        // show what I am talking about here.
        this.nextMove();
      },500);
    },1000);

    //create a new pl with constraints and load the values
    // run the whole thing again with
  }

  run() {
    this.pf = new Pf([0,0,0,0,0],createVector(200,250),80);
    this.cur = 0;
    this.nextMove();
  }

}
