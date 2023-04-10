let objs;
let hp;
let planePos;
const keyDist = 500;
let game2=false;
let temp;
let highScore2;
let bgs;
let clouds;

function clamp(a, b, c) {
    if (b > a) return b;
    if (c < a) return c;
    return a;
}

function minigame2Display(){
    background('#92E7F5');
    // if (mouseX > 25 && mouseX < width-25 && mouseY > 25 && mouseY < height-30) cursor("js/plane.png", 16, 16);
    for (let bg = 0; bg < bgs.length; bg++) {
        let bgScale = 10;
        image(...bgs[bg], bgs[bg][0].width/bgScale, bgs[bg][0].height/bgScale);
        bgs[bg][2] += 3 + time/350;
    }

    planePos.x = clamp(mouseX-25, 0, width-40);
    planePos.y = clamp(mouseY-25, 0, height-40);
    imageMode(CORNER);
    image(planeImg, planePos.x+5, planePos.y);
    
    if (time % 75 == 0) {
        bgs.push([clouds[int(random(4))], random(width-40)-30, -50]);
    }
    if ((time++ % (15-(min(5,int(time/100))))) == 0) {
        objs.push([createVector(random(width*2)-width/2, -50), createVector(random(5)-5/2, 3).normalize().mult(3 + time/300)])
    }
    if (time % keyDist == 0) {
        keys = min(keys, 3);
    }
    ellipseMode(CENTER);
    for (let obj = 0; obj < objs.length; obj++) {
        let o = objs[obj];
        o[0].add(o[1]);
        if (dist(o[0].x, o[0].y, planePos.x+25, planePos.y+25) < 25) {
            hp--;
            objs.splice(obj--, 1);
            if(hp==0){
                temp=time;
                if(temp>highScore2){
                    highScore2=temp;
                    storeItem('high2',highScore2);
                }
            }
        }
        if (dist(o[0].x, o[0].y, width/2, height/2) > 1000) objs.splice(obj--, 1);

        fill(255,0,0);
        image(bomb,o[0].x, o[0].y);
    }
    fill(0);
    textAlign(LEFT,CENTER)
    textFont(f, 30);
    text("Distance Travelled: " + time, 40, 100);
    for(let i=0;i<hp-1;i++){
        image(planeImg,i*50+10,450);
    }
    // game over
    if (hp <= 0) {
        background('#92E7F5');
        textAlign(CENTER,CENTER);
        textFont(f, 30)
        text("Game over!", 150, 200);
        text("Distance Travelled: " + temp, 150, 250);
        textSize(25);
        text("High Score: "+highScore2,150,290);
        //text("You earned " + keys + " key" + (keys==1?"":"s") + (keys>0?"!":"."), width/2, height/2 + 40);
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