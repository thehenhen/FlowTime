let objs;
let hp;
let planePos;
const keyDist = 500;
let game2=false;

function clamp(a, b, c) {
    if (b > a) return b;
    if (c < a) return c;
    return a;
}

function minigame2Display(){
    background('#d8e1e9');
    // if (mouseX > 25 && mouseX < width-25 && mouseY > 25 && mouseY < height-30) cursor("js/plane.png", 16, 16);
    planePos.x = clamp(mouseX-20, 0, width-40);
    planePos.y = clamp(mouseY-25, 0, height-40);
    image(planeImg, planePos.x, planePos.y);

    if ((time++ % (15-(min(5,time/100)))) == 0) {
        objs.push([createVector(random(width*2)-width/2, -50), createVector(random(5)-5/2, 3).normalize().mult(3 + time/300)])
    }
    if (time % keyDist == 0) {
        keys = min(keys, 3);
    }
    for (let obj = 0; obj < objs.length; obj++) {
        let o = objs[obj];
        o[0].add(o[1]);
        if (dist(o[0].x, o[0].y, planePos.x+25, planePos.y+25) < 25) {
            hp--;
            objs.splice(obj--, 1);
        }
        if (dist(o[0].x, o[0].y, width/2, height/2) > 1000) objs.splice(obj--, 1);

        fill(255,0,0);
        circle(o[0].x, o[0].y, 10);
    }
    console.log(objs);
    fill(0);
    textFont('Arial', 20);
    text("Distance Travelled: " + time, 20, 40);

    // game over
    if (hp <= 0) {
        //noLoop();
        background(191);
        textAlign(CENTER);
        textFont('Arial', 30)
        text("Game over!", width/2, height/2 - 40);
        text("You earned " + keys + " key" + (keys==1?"":"s") + (keys>0?"!":"."), width/2, height/2 + 40);
        cursor(ARROW);
    }
    fill(255);
    if(mouseDetect(5,35,5,35)){
        fill('#cad1d9');
    }
    rect(20,20,30,30,5);
    stroke(0);
    line(15,20,25,10);
    line(15,20,25,30);
    noStroke(); 
}

function keyPressed() {
    if (key == 'p') noLoop();
}