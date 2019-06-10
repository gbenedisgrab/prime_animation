let a,b,speed,n;

function run(){
  a.run();
  //I need to figure out how to end all the processes
}

function setup() {
  createCanvas(600, 600);
  createButton("speed");
  speed=createSlider(1,500,250);
  createButton("n"); // this should only change at the start
  n=createSlider(2,10000,100); // can this be bigger
  b=createButton("restart").mousePressed(run);
  a = new Animation();
  a.run();
}


function draw() {
  background(220);
  a.show();
}
