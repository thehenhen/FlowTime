console.log("TEST EXTENSION ROONONG")
function setup(){
    createCanvas(300,500);
    background(255);
    textAlign(CENTER,CENTER);
    text("This text was generated using p5.js",width/2,height/2); 
    score=parseInt(localStorage.getItem('score'))||0;

}
let x=0;
let score=0;
function draw(){
    background(0);
    fill(100);
    ellipse(x,height/2,10,10);
    fill(255);
    text(score,100,100);
    x++; 
}

function mousePressed(){
    score++;
    localStorage.setItem('score',score);
}

function keyPressed(){
    score=0;
    localStorage.setItem('score',score);
}