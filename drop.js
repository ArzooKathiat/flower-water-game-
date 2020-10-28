class Drops{
    constructor(x,y){
        var options={
            friction: 0.1
        }
        this.radius = 30;
        this.rain = Bodies.circle(x,y,4,options);
        this.color = color("blue");
        this.rain.lifetime = height;
        this.image = loadImage("../images/drop.png");
        this.height = 25;
        World.add(world,this.rain);
     }

    display(){  

        
        ellipseMode(CENTER);
            var pos = [this.rain.position.x,this.rain.position.y];
            fill(this.color);
            image(this.image,pos[0],pos[1],this.radius,this.height);

       

}

    update(){
        if(frameCount %100 === 0){
            if(this.rain.position.y > height){
                Matter.Body.setPosition(this.rain,{x: random(displayWidth,displayHeight), y: random(displayWidth,displayHeight)});
             }
         }
        }

       
        
         
    
    }    
        
