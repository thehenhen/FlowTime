class Moveable {
  
    constructor(xPos, yPos) {
      this.xPos = xPos;
      this.yPos = yPos;
      this.xVelo=0;
      this.yVelo=0;
    }
    
    move(xDif, yDif) {
      this.moveX(xDif);
      this.moveY(yDif);
    }
    
    moveX(dif) {
      this.xPos += dif;
      if (this.xPos > 300) {
        this.xPos = 300;
      }
      if (this.xPos < 0) {
        this.xPos = 0;
      }
    }
    
    moveY(dif) {
      this.yPos += dif;
      if (this.yPos > 500) {
        this.yPos = 500;
      }
      if (this.yPos < 0) {
        this.yPos = 0;
      }
    }
    
    display() {
      throw new TypeError("Method display() of the class Drawable must be overriden and used in its subclass.");
    }
}
  
class Player extends Moveable {
    constructor(speed) {
      super(150, 400);
      this.speed = speed;
    }
    
    step() {
      if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.accel(0 - this.speed);
      }
      if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.accel(this.speed);
      }
    }
    
    display() {
        fill(255);
        circle(this.xPos, this.yPos, objDistance);
    }

    accel(spd){
        this.xVelo+=spd/50;
    }

    update(){
        this.xPos+=this.xVelo;
        if (this.xPos > 300) {
            this.xPos = 300;
            this.xVelo=0;
        }
        if (this.xPos < 0) {
            this.xPos = 0;
            this.xVelo=0;
        }
        this.xVelo*=0.99;
    }
}
  
class Falling extends Moveable {
    constructor(speed) {
      super(random(10,290), 0);
      this.speed = speed;
      this.id=floor(random(0,peppers.length));
    }
    
    fall() {
      super.moveY(this.speed);
    }
    
    display() {
        //circle(this.xPos, this.yPos, objDistance);
        imageMode(CENTER);
        image(peppers[this.id],this.xPos,this.yPos,objDistance,objDistance); 
    }
}
  
class Game1 {
    constructor() {
      this.gameSpeed = 100.0 / getTargetFrameRate();
      this.player = new Player(this.gameSpeed);
      this.pepper = this.pepper = new Falling(this.gameSpeed);
      this.points = 0;
      this.game1=false;
    }
    
    run() {
        background('#d8e1e9');
        this.gameSpeed += 0.1 / getTargetFrameRate();
        this.player.speed = this.gameSpeed;
        this.pepper.speed = this.gameSpeed;
        this.player.step();
        this.pepper.fall();
        this.player.display();
        this.pepper.display();
        this.player.update();
        textSize(30);
        fill(0);
        textFont(f);
        textAlign(CENTER,CENTER);
        text("Points: " + this.points, 150, 50);
        if (this.pepper.yPos >= 500) {
            this.pepper = new Falling(this.gameSpeed);
            this.points=0;
            this.gameSpeed = 100.0 / getTargetFrameRate();
            this.player.speed=this.gameSpeed;
            this.pepper.speed=this.gameSpeed;
        }
        if (this.touch(this.player, this.pepper)) {
            this.points ++;
            this.pepper = new Falling(this.gameSpeed);
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
    
    touch(a, b) {
      return (((a.xPos - b.xPos) ** 2) + ((a.yPos - b.yPos) ** 2)) <= (objDistance ** 2);
    }
}
  
let game;
let objDistance=30;
  

  
