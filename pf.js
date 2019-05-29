class Pf {
  constructor(rep,pos,sp) {
    this.rep = rep;
    this.space = sp;
    this.pos = pos;
  }
  glideTo(pos) {
    let dur = 400;
    this.trans = new Transition(dur);
    this.glide = pos.sub(this.pos);
    setTimeout(()=> { // cleanup
      this.pos.add(this.glide);
      delete this.glide;
    }, dur)
  }
  show(primes) {
    if (!this.rep) return;

    let showPos = this.pos;
    if (this.glide) {
      let pct = this.trans.value();
      showPos = p5.Vector.add(this.pos, p5.Vector.mult(this.glide,pct));
    }

    for (let i in this.rep) {
      let x = showPos.x;
      let y = showPos.y;
      // figure out the logic here
      // I need a way to circle the constraint


      if (this.rep[i] != 0 || i == this.limit) {
        if (i == this.limit) fill(255,0,0);
        else fill(0);
        textSize(40);
        strokeWeight(0);
        text(primes[i], x + i * this.space, y);
        if (this.rep[i] > 1 || i == this.limit) {
          textSize(30);
          text(this.rep[i], x + i * this.space + 30, y-30);
        }
      }
    }
    if (this.box) {
      let h = 250;
      let v = 60;
      stroke(255,0,0);
      strokeWeight(4);
      line(showPos.x-20, showPos.y-v, showPos.x + h - 20, showPos.y-v);
      line(showPos.x + h -20, showPos.y-v, showPos.x + h -20, showPos.y + 20);
      line(showPos.x + h - 20, showPos.y + 20, showPos.x -20, showPos.y + 20);
      line(showPos.x -20, showPos.y + 20, showPos.x -20, showPos.y-v);
      fill(255,0,0);
      strokeWeight(0);
      text('add to list',this.x,this.y+v+20);
    }
  }

}
