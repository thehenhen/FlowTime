class FlowTime{
    constructor(){
        this.flow=getItem('flow')||false;
        this.stage=getItem('stage')||0;
        this.goal=getItem('goal')||"";
        this.typing=false;

        this.now=second();
        this.prev=second();


        this.startHour=getItem('startHour')||0;
        this.startMin=getItem('startMin')||0;
        this.startSec=getItem('startSec')||0;
        this.startTotal=getItem('startTotal')||0;

        this.showHour=0;
        this.showMin=0;
        this.showSec=0;
        this.total=0;
        this.diff=getItem('diff')||0;
        this.seconds=getItem('seconds')||0;
        this.breakMsg=getItem('break')||"";
        this.recommended;
    }

    show(){
        if(this.stage==0){
            this.showOverview();
        }else if(this.stage==1){
            this.showStarting();
        }else if(this.stage==2){
            this.showWorking();
        }else if(this.stage==3){
            this.showBreak();
        }else if(this.stage==4){
            this.showAccomplished();
        }
    }

    showOverview(){
        background('#d8e1e9');
        fill('#7392B7');
        textFont(f);
        textSize(20);
        textAlign(CENTER,CENTER);
        text("The Flowtime Technique is a system  to help\nwith produc tivi ty and work efficiency.\n I t has an emphasis on flexibility and helping\n you get into a flow. ",150,120);
        text("First, pick a goal  to aim for.\nThen, ge t s tar ted until you ge t  tired\n or lose produc tivi ty. Take a break and\nplay some of our minigames.\nThen, repea t until you reach your goal! ",150,280);
        fill(255);
        if(mouseDetect(75,225,400,450)){
            fill('#cad1d9');
        }
        rect(150,425,150,50,10); 
        fill('#7392B7');
        textSize(20);
        text("Continue",150,425);
        fill(255);
        if(mouseDetect(265,295,5,35)){
            fill('#cad1d9');
        }
        rect(280,20,30,30,5);
        stroke(0);
        line(270,10,290,30);
        line(270,30,290,10);
        noStroke();
    }

    showStarting(){
        background('#d8e1e9');
        textFont(f);
        fill('#7392B7');
        textAlign(LEFT,CENTER);
        textSize(20);
        text("Please enter your goal: ",20,100);
        fill(255);
        if(mouseDetect(20,280,135,165)){
            fill('#cad1d9');
            cursor(TEXT);
        }else if(this.typing){
            fill(220);
            cursor(ARROW);
        }else{
            cursor(ARROW);
        }
        rect(150,150,264,30);
        fill('#7392B7');
        textSize(15);
        textFont('Courier');
        if(this.goal!=""){
            text(this.goal,20,150);
        }else{
            text("Type your goal here...",20,150);
        }
        textFont(f);
        stroke(0);
        line(18,165,282,165); 
        noStroke();
        textSize(20);
        text("Current time: ",20,250);
        textSize(40);
        text(hour()+":"+minute(),120,245); 
        fill(255);
        if(mouseDetect(75,225,400,450)){
            fill('#cad1d9');
        }
        rect(150,425,150,50,10);
        textAlign(CENTER,CENTER);
        textSize(25);
        fill('#7392B7');
        text("Start Working!",150,425);
        fill(0);
        textSize(15);
        textFont('Courier');
        if(this.typing && millis()%1000>500){
            rect(textWidth(this.goal)+20,150,2,20);
        }
        fill(255);
        if(mouseDetect(265,295,5,35)){
            fill('#cad1d9');
        }
        rect(280,20,30,30,5);
        stroke(0);
        line(270,10,290,30);
        line(270,30,290,10);
        noStroke();
    }

    showWorking(){
        this.total=hour()*3600+minute()*60+second();
        this.diff=this.total-this.startTotal;
        storeItem('diff',this.diff);


        background('#d8e1e9');
        textFont(f);
        fill('#7392B7');
        textAlign(CENTER,CENTER);
        textSize(50);
        text("WORKING",150,80);

        this.showSec=this.diff%60;
        if(this.showSec<10){
            this.showSec="0"+this.showSec;
        }

        this.showMin=floor(this.diff/60);
        if(this.showMin<10){
            this.showMin="0"+this.showMin;
        }


        this.showHour=floor(this.diff/3600);



        text(this.showHour+":"+this.showMin+":"+this.showSec,150,140);

        
        textSize(30);
        text("Goal:",150,200);
        textSize(25);
        text(this.goal,150,250);
        fill(255);
        if(mouseDetect(75,225,300,350)){
            fill('#cad1d9');
        }
        rect(150,325,150,50,10);
        fill(255);
        if(mouseDetect(75,225,400,450)){
            fill('#cad1d9');
        }
        rect(150,425,150,50,10);
        fill('#7392B7');
        textSize(20);
        text("Goal Accomplished!",150,325);
        text("Take a Break",150,425);
        this.prev=this.now;
        fill(255);
        if(mouseDetect(265,295,5,35)){
            fill('#cad1d9');
        }
        rect(280,20,30,30,5);
        stroke(0);
        line(270,10,290,30);
        line(270,30,290,10);
        noStroke();
    }

    showBreak(){
        this.showSec=this.diff%60;

        this.showMin=floor(this.diff/60);

        this.showHour=floor(this.diff/3600);

        background('#d8e1e9');
        textFont(f);
        fill('#7392B7');
        textSize(50);
        textAlign(CENTER,CENTER);
        text("BREAK",150,80);
        textSize(30);
        text("You worked for:",150,150);
        if(this.showHour==0){
            this.breakMsg=this.showMin+" minutes and "+this.showSec+" seconds";
        }else{
            this.breakMsg=this.showHour+" hours, "+this.showMin+" minutes,\n and "+this.showSec+" seconds.";
        }
        text(this.breakMsg,150,200);
        storeItem('break',this.breakMsg);
        textSize(20);
        if(this.diff<=1500){
            this.recommended=5;
        }else if(this.diff<=3000){
            this.recommended=8;
        }else if(this.diff<=5400){
            this.recommended=10;
        }else{
            this.recommended=15;
        }
        text("A "+this.recommended+" minute break is recommended.",150,250);
        text("Try one of our minigames!",150,290);
        fill(255);
        if(mouseDetect(25,125,325,375)){
            fill('#cad1d9');
        }
        rect(75,350,100,50,10);
        fill('#7392B7');
        textSize(20);
        text("Minigame 1",75,350);

        fill(255);
        if(mouseDetect(175,275,325,375)){
            fill('#cad1d9');
        }
        rect(225,350,100,50,10);
        fill('#7392B7');
        textSize(20);
        text("Minigame 2",225,350);

        fill(255);
        if(mouseDetect(75,225,400,450)){
            fill('#cad1d9');
        }
        rect(150,425,150,50,10);
        fill('#7392B7');
        textSize(20);
        text("Continue Working",150,425);

        fill(255);
        if(mouseDetect(265,295,5,35)){
            fill('#cad1d9');
        }
        rect(280,20,30,30,5);
        stroke(0);
        line(270,10,290,30);
        line(270,30,290,10);
        noStroke();
    }

    showAccomplished(){
        background('#d8e1e9');
        textFont(f);
        fill('#7392B7');
        textSize(40);
        textAlign(CENTER,CENTER);
        text("CONGRATULATIONS!",150,80);
        textSize(30);
        text("You completed this goal: ",150,140);
        text(this.goal,150,180);
        text("Take a well-deserved break.",150,300);
        fill(255);
        if(mouseDetect(265,295,5,35)){
            fill('#cad1d9');
        }
        rect(280,20,30,30,5);
        stroke(0);
        line(270,10,290,30);
        line(270,30,290,10);
        noStroke();
    }
}

function keyTyped(){
    if(flow.flow && flow.stage==1 && key!="Enter"){
        flow.goal+=key;
    }
    storeItem('goal',flow.goal);
    return false;
}

function keyReleased(){
    if(flow.flow && flow.stage==1 && keyCode==BACKSPACE){
        flow.goal = flow.goal.substring(0, flow.goal.length -1);
    }
}