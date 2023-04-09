class Menu{
    constructor(){
        this.menu=getItem('menu');
        if(this.menu==null){
            this.menu=true;
            storeItem('menu',true);
        }
    }

    show(){
        background('#d8e1e9');
        fill('#7392B7');
        textFont(f);
        textSize(50);
        text("FLOWTIME",150,100); 
        fill(255);
        if(mouseDetect(75,225,275,325)){
            fill('#cad1d9');
        }
        rect(150,300,150,50,10);
        fill('#7392B7');
        textSize(20);
        
        //textFont('Georgia');
        text("Ge t S tar ted",150,300);
    }
}