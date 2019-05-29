class Transition {
  constructor(duration) { // add easing?
    this.start = new Date().getTime();
    this.duration = duration;
  }
  value() {
    let now = new Date().getTime();
    if ((now - this.start) > this.duration ) return 1;
    else return (now-this.start) / this.duration;
  }
}
