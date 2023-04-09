console.log("TEST EXTENSION ROONONG")
let peppers=[];
let p1,p2,p3;
let person;
function setup(){
    createCanvas(300,500);
    textAlign(CENTER,CENTER);
    rectMode(CENTER);
    noStroke();
    f = loadFont("assets/DeliciousHandrawn-Regular.ttf");
    p1 = loadImage("assets/pepper1.png");
    p2 = loadImage("assets/pepper2.png");
    p3 = loadImage("assets/pepper3.png");
    person = loadImage("assets/person.png");
    planeImg = loadImage('/assets/plane.png');
    peppers[0]=p1;
    peppers[1]=p2;
    peppers[2]=p3;
    menu=new Menu();
    flow=new FlowTime();
    game1 = new Game1();
    time = 0;
    objs = [];
    planePos = createVector(width/2, height/2);
    hp = 3;
    keys = 0;
    
}
function draw(){
    if(menu.menu){
        menu.show();
    }else if(flow.flow){
        flow.show();
    }else if(game1.game1){
        game1.run();
    }else if(game2){
        minigame2Display();
    }
}

function mousePressed(){
    if(mouseDetect(75,225,275,325) && menu.menu){
        menu.menu=false;
        flow.flow=true;
        storeItem('menu',false);
        storeItem('flow',true);
    }
    if(mouseDetect(75,225,400,450) && flow.flow && (flow.stage==0 || flow.stage==1 || flow.stage==2 || flow.stage==3)){
        if(flow.stage!=3){
            flow.stage++;
        }else{
            flow.stage--;
            flow.seconds=0;
            storeItem('seconds',0);
        }
        storeItem('stage',flow.stage);
        if(flow.stage==2){
            flow.startHour=hour();
            flow.startMin=minute();
            flow.startSec=second();
            flow.startTotal=flow.startHour*3600+flow.startMin*60+flow.startSec;
            storeItem('startSec',flow.startSec);
            storeItem('startMin',flow.startMin);
            storeItem('startHour',flow.startHour);
            storeItem('startTotal',flow.startTotal);
        }
    }
    //rect(150,150,264,30);
    if(mouseDetect(20,280,135,165) && flow.flow && flow.stage==1){
        flow.typing=true;
    }
    if(flow.flow && flow.stage==1 && !mouseDetect(20,280,135,165) && !mouseDetect(75,225,400,450)){
        flow.typing=false;
    }
    if(flow.flow && mouseDetect(265,295,5,35)){
        menu.menu=true;
        flow.flow=false;
        flow.stage=0;
        flow.goal="";
        flow.seconds=0;
        storeItem('menu',true);
        storeItem('flow',false);
        storeItem('stage',0);
        storeItem('goal',"");
        storeItem('seconds',0);
    }
    if(flow.flow && flow.stage==2 && mouseDetect(75,225,300,350)){
        flow.stage=4;
        storeItem('stage',flow.stage);
    }
    if(mouseDetect(25,125,325,375) && flow.flow && flow.stage==3){
        flow.flow=false;
        game1.game1=true;
    }
    if(mouseDetect(5,35,5,35) && game1.game1 && !flow.flow){
        flow.flow=true;
        game1.game1=false;
    }
    if(mouseDetect(175,275,325,375) && flow.flow && flow.stage==3){
        flow.flow=false;
        game2=true;
    }
    if(mouseDetect(5,35,5,35) && game2 && !flow.flow){
        flow.flow=true;
        game2=false;
    }
}



function mouseDetect(x1,x2,y1,y2){
    return(mouseX>=x1 && mouseX<=x2 && mouseY>=y1 && mouseY<=y2);
}