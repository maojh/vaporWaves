
//Vaporwaves
//A e s t h e t i c   song visualizer

var song, amplitude;
var moveY = 0;
var picco = -50;
var passo = 40;
var s = 0.4; //scala

function preload() {

  song = loadSound('assets/U.mp3');

  //nuvole
  // nuvola1 = loadImage("immagini/nuvola1.jpg");
  // nuvola2 = loadImage("immagini/nuvola2.jpg");
  // nuvola3 = loadImage("immagini/nuvola3.jpg");

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

  noStroke();
  textSize(24);
  scale(0.1);
}

function draw() {
  fill(2, 1);
  noStroke();
  rect(0, 0, width, height);

  //display test
    fill(20, 255);
    noStroke();
    rect(85, 10, 100, 40);
    fill(0,255,0,255);
    text(int(millis()/1000), 100, 40);


  // analysis
  //aplitude
  var level = amplitude.getLevel();
  //display amplitude, sole?
  var size = map(level, 0, 1, 50, 500);
  var levelcolor = map(level, 0, 1, 220, 255);
  fill(levelcolor, levelcolor, 0, 255);
  noStroke();
  ellipse(width/4, height/4, size, size);

  translate(0, height/2.7); // /2.5 horizon
  moveY += map(level, 0, 1, 0, 50);
  if (moveY >= height) {
    moveY = 0; //partenza
    s = 0;

  }
  translate(width/2, moveY);
  scale(s+=0.007);

  //FFT
  var spectrum = fft.analyze();
  // noStroke();
  //   fill(0,255,0); // spectrum is green
  //   for (var i = 0; i< spectrum.length; i++){
  //     var x = map(i, 0, spectrum.length, 0, width);
  //     var h = -height + map(spectrum[i], 0, 255, height, 0);
  //     rect(x, height, width / spectrum.length, h )
  //   }

  fill(255,0,255, 50);
  stroke(255, 240, 255);
//   stroke(levelcolor, random(levelcolor), random(levelcolor)); // waveform is red
   strokeWeight(0.5);
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




  //  beginShape();
  //  for (var i = spectrum.length; i > 0; i-=passo){
  //    var x = map(i, spectrum.length, 0+passo, passo/2.6, width/2);
  //    var y = map( spectrum[i], 0, 255, -picco, picco);
  //    vertex(x,y);
  //  }
  // endShape();
  // beginShape();
  //   for(var i = 0; i< spectrum.length; i+=passo){
  //      var x = map(i, 0, spectrum.length, width/2+passo/4, width);
  //      var y = map( spectrum[i], 0, 255, -picco, picco);
  //     vertex(x,y);
  //    }
  //  pop();
  // endShape();



  // var waveform = fft.waveform();
  // noFill();
  // beginShape();
  //  stroke(255,0,0); // waveform is red
  //  strokeWeight(1);
  //  for (var i = 0; i< waveform.length; i++){
  //    var x = map(i, 0, waveform.length, 0, width);
  //    var y = map( waveform[i], -1, 1, 0, height);
  //    vertex(x,y);
  //  }
  // endShape();

}




//Utilità
//
//Screenshot function
function mousePressed() {
    // save();

  //play/pause song loop
  push();
  fill(0,255,0);
  noStroke();
  if ( song.isPlaying() ) { // .isPlaying() returns a boolean
      song.pause(); // .play() will resume from .pause() position
        text("Pause", 100, 30);
  } else {
    song.play();
      text("Play", 100, 30);
  }
  pop();
}

//Responsive Canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("size changed");
}
