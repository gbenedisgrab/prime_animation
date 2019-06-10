class Num {
  constructor(val, pos, color, size) {
    this.val = val
    this.pos = pos;
    this.c = color;
    this.font = size;
    this.visible = true;
  }
  glideTo(posChange,font) {
    let dur = speed.value()*1.5;
    this.trans = new Transition(dur);
    this.glide = posChange.sub(this.pos);
    this.fontChange = font - this.font;
    setTimeout(()=> { // cleanup
      this.pos.add(this.glide);
      this.font += this.fontChange;
      delete this.trans;
      delete this.glide;
      delete this.fontChange;
    }, dur)
  }
  flash() {
    let dur = speed.value()*5;
    this.trans = new Transition(dur);
    this.flash = true;
    setTimeout(()=> {
      delete this.trans;
      this.flash = false;
    },dur);
  }

  showFlash() {
    this.visible = floor(this.trans.value()/0.15) % 2 == 0;
    fill(255,0,0);
    textSize(20);
    text("too big",this.pos.x+30,this.pos.y-60);
    textSize(this.font);
  }

  showGlide() {
    let pct = this.trans.value();
    textSize(this.font + pct * this.fontChange);
    return p5.Vector.add(this.pos,p5.Vector.mult(this.glide,pct));

  }
  show() {
    fill(this.c);
    // let showPos = this.pos;
    textSize(this.font);
    // this could be cleaner.
    if (this.flash == true) this.showFlash();
    if (this.glide) {
      let showPos = this.showGlide();
      text(this.val, showPos.x, showPos.y);
    } else {
      text(this.val, this.pos.x, this.pos.y);
    }


  }
}
