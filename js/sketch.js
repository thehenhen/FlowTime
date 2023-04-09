console.log("TEST EXTENSION ROONONG")
function setup(){
    createCanvas(300,500);
    textAlign(CENTER,CENTER);
    rectMode(CENTER);
    noStroke();
    f = loadFont("assets/DeliciousHandrawn-Regular.ttf");
    menu=new Menu();
    flow=new FlowTime();
}
function draw(){
    if(menu.menu){
        menu.show();
    }else if(flow.flow){
        flow.show();
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
}

function keyPressed(){
}



function mouseDetect(x1,x2,y1,y2){
    return(mouseX>=x1 && mouseX<=x2 && mouseY>=y1 && mouseY<=y2);
}