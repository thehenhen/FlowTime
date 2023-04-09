let objs;
let hp;
let planePos;
const keyDist = 500;

function setup() {
    createCanvas(300, 500);
    background(146,231,245);
    frameRate(60);
    time = 0;
    objs = [];
    planePos = createVector(width/2, height/2);
    hp = 3;
    keys = 0;
    planeImg = loadImage('/js/plane.png')
}

function clamp(a, b, c) {
    if (b > a) return b;
    if (c < a) return c;
    return a;
}

function draw() {
    background(146,231,245);
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
        noLoop();
        background(191);
        textAlign(CENTER);
        textFont('Arial', 30)
        text("Game over!", width/2, height/2 - 40);
        text("You earned " + keys + " key" + (keys==1?"":"s") + (keys>0?"!":"."), width/2, height/2 + 40);
        cursor(ARROW);
    }
}

function keyPressed() {
    if (key == 'p') noLoop();
}