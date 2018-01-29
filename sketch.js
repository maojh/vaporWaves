
//Vaporwaves
//A e s t h e t i c   song visualizer
//track: NanniniVap by Giorgio Loggia

var song, amplitude;
var moveY = 0;
var picco = -100;
var passo;
var s = 0.4; //scala

var trasback = 2;
var light = true;

var lines = new Array();
var pictures = new Array();
var smalls = new Array();

var recording = true;

function preload() {
  song = loadSound('assets/U.mp3');
  //lines
  for (var i = 1; i <= 4; i++) {
    lines.push(loadImage("assets/lines/"+ 1 + ".png"));
  }
  //pictures
  for (var i = 1; i <= 12; i++) {
    pictures.push(loadImage("assets/pictures/"+ i + ".png"));
  }
  for (var i = 1; i <= 11; i++) {
    smalls.push(loadImage("assets/smalls/"+ i + ".png"));
  }
  smalls.push(loadImage("assets/smalls/"+ 12 + ".gif"));
}


function setup() {

  createCanvas(windowWidth, windowHeight);

  //audio setup
  song.loop();
  amplitude = new p5.Amplitude();
  song.amp(0.2);
  fft = new p5.FFT();

  // responsive unit
  u = (windowWidth/windowHeight);
  passo = int(35*u);
  console.log(passo);
  noStroke();
  textSize(24);
  scale(0.1);
  background(0)
  frameRate(3);
}

function draw() {
  noStroke();
  push();
    fill(127, 255, 212, 2)
    rect(0,0, width, height);
  pop();

  if(millis()/1000>60) light = false;
    light = true

  // analysis
  //aplitude
  var level = amplitude.getLevel();

  sole(level);

  translate(0, height/3.3); // /2.5 horizon
  moveY += map(level, 0, 1, 0, 50);
  if (moveY >= height/2) {
    moveY = 0; //partenza
    s = 0;
  }

  translate(width/2, moveY);
  scale(s+=0.007);

  //FFT
  var spectrum = fft.analyze();

  if (light) {
    fill(0,0,55, 50);
    stroke(255, 255);
  } else {
    fill(0,0,55, 50);
    stroke(55, 255);
  }
  strokeWeight(2);
  stroke(250, 0, 250)
    fill(123, 104, 238, 20)
  //sinistra
  beginShape();
  for (var i = 0; i< spectrum.length; i+=passo){
    var x1 = map(i, 0, spectrum.length, -width/2, passo);
    var y1 = map( spectrum[i], 0, 255, -picco, picco);
    vertex(x1,y1);
  }
  endShape();
  beginShape();
  for (var i = 0; i< spectrum.length; i+=passo){
    var x2 = map(i, 0, spectrum.length, -width/2, -width);
    var y2 = map( spectrum[i], 0, 255, -picco, picco);
    vertex(x2,y2);
  }
  vertex(x2-1000, y2);
  endShape();
  //destra
  push();
  translate(width-passo/2, 0);
  beginShape();
  for (var i = 0; i< spectrum.length; i+=passo){
    var x2 = map(i, 0, spectrum.length, -width/2, -width);
    var y2 = map( spectrum[i], 0, 255, -picco, picco);
    vertex(x2,y2);
  }
  endShape();
  beginShape();
  for (var i = 0; i< spectrum.length; i+=passo){
    var x1 = map(i, 0, spectrum.length, -width/2, -passo);
    var y1 = map( spectrum[i], 0, 255, -picco, picco);
    vertex(x1,y1);
  }
  vertex(x1+1000, y1);
  endShape();
  pop();

    if(recording) {
     save(); 
    }
}

function sole(level) {
  var size = map(level, 0, 1, 50*u, 1000*u);
  var levelcolor = map(level, 0, 1, 220, 255);
  fill(levelcolor, levelcolor, 0, 255);
  noStroke();
  ellipse(width/2, height/4, size, size);

}

function sfondo(light) {
  var val;
  var dens = 10*u;
  var seconds = millis()/1000;
push();
  if(light) {
  for (var i = 0; i < height; i+=dens) {
    if(i<height/3) {
      val = int(map(i, 0, height/6, 245, 180));
      fill(val, 0, val/2, trasback*10);
    } else {
      val = int(map(i, height/3, height, 50, 205));
      fill(0, val/4, val, trasback);
    }
    rect(0, i, width, dens);
  }
} else {
  for (var i = 0; i < height; i+=dens) {
    if(i<height/3) {
      val = map(i, 0, height/4, 180, 245)/2;
      fill(val, 0, val/2, trasback*10);
    } else {
      val = map(i, height/4, hleight, 180, 245)/2;
      fill(0, val/4, val, trasback);
    }
    rect(0, i, width, dens);
  }
}
pop();
}

//Utilità
//
//Screenshot function
function mousePressed() {
  save("cover.png");
  //play/pause song loop
  push();
  fill(0,255,0);
  noStroke();
  if ( song.isPlaying() ) { // .isPlaying() returns a boolean
    song.pause(); // .play() will resume from .pause() position
    text("Pause", 100, 30);
    reconrding = false;
  } else {
    song.play();
    text("Play", 100, 30);
    reconrding = true;
  }
  pop();
}


//Responsive Canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("size changed");
}
