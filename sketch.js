console.log("TEST EXTENSION ROONONG")
function setup(){
    createCanvas(300,500);
    background(255);
    textAlign(CENTER,CENTER);
    text("This text was generated using p5.js",width/2,height/2); 
}
let x=0;
function draw(){
    background(255);
    fill(0);
    ellipse(x,height/2,10,10);
    x++; 
}