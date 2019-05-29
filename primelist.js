class PrimeList {
  constructor(primes,x,y,spacing) {
    this.primes = primes
    this.x = x;
    this.y = y;
    this.sp = spacing;
  }
  setSelector(pos) {
    if (this.sel) {
      this.move = pos * this.sp + this.x - this.sel;
      this.start = new Date().getTime();
    } else this.sel = pos * 100 + this.x;
  }

  show() {
    //show the primes first
    fill(0);
    stroke(0);
    strokeWeight(1);
    textSize(40);
    for (let i in this.primes) {
      if (this.limit && i > (this.limit-1)) fill(140);
      text(this.primes[i], this.x+25 + i * this.sp, this.y + 50);
    }
    fill(0);
    if (this.sel) {
      let cur = this.sel;
      if (this.move) {
        let now = new Date().getTime();
        if ((now - this.start) > 400) {
          this.sel += this.move;
          delete this.move;
          cur = this.sel;
        } else {
          let pct = (now - this.start) / 400
          cur = this.sel + this.move*pct;
        }
      }
      let s = 70;
      let top = 52;
      stroke(100, 110, 200);
      strokeWeight(5);
      line(cur, this.y, cur + s, this.y);
      line(cur + s, this.y, cur + s, this.y + s);
      line(cur + s, this.y + s, cur, this.y + s);
      line(cur, this.y + s, cur, this.y);
      strokeWeight(0);
    }

    if (this.limit) {
      stroke(255,0,0);
      strokeWeight(4);
      line(this.x + this.limit* this.sp,this.y,this.x + this.limit* this.sp,this.y+70);
      strokeWeight(0);
    }
  }
}
