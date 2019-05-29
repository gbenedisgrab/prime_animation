let a;

function setup() {
  let n = 100;
  a = new Animation(n);
  createCanvas(600, 600);
  a.run();


}

function draw() {
  background(220);
  a.show();
}
