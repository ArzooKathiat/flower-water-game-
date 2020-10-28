const World = Matter.World;
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;


var canvas, backgroundImage;
var plant, plant_image;
var worm, worm2,worm3, wormImage;
var maxDrops = 50;
var drops = [];
var drop, buttonImg;
var backgroundImg;
var button; 
var gameState = 0;
var shade,shade2;
var score = 0;
var button2, bImg;
var button3, btImg;

  function preload(){
    getBackgroundImg();
    plant_image = loadImage("../images/PLANT.gif")
    
    wormImage = loadAnimation("../images/giphy-0.png","../images/giphy-1.png","../images/giphy-2.png","../images/giphy-3.png","../images/giphy-4.png","../images/giphy-5.png")
    buttonImg = loadImage("../images/button.png");
    bImg = loadImage("../images/blankbutton.png");
   btImg = loadImage("../images/button3.png");
  }



function setup(){
    canvas = createCanvas(displayWidth, displayHeight);
    engine = Engine.create();
   world = engine.world;

  plant = createSprite(displayWidth/2,displayHeight-200)
  plant.addImage(plant_image);
    plant.scale = 0.5


    worm = createSprite(displayWidth/2,displayHeight-160)
    worm.addAnimation("worm",wormImage)
    worm.scale = 0.3

    worm2 = createSprite(displayWidth-700,displayHeight-160)
    worm2.addAnimation("worm",wormImage)
    worm2.scale = 0.3

    worm3 = createSprite(displayWidth-580,displayHeight-160)
    worm3.addAnimation("worm",wormImage)
    worm3.scale = 0.3

    button = createSprite(displayWidth-400,displayHeight-70,25,25);
  button.addImage(buttonImg);
  button.scale = 0.5

  button2 = createSprite(displayWidth-900,displayHeight-70,25,25);
  button2.addImage(bImg);
  button2.scale = 0.5

  button3 = createSprite(displayWidth-1100,displayHeight-70,25,25);
  button3.addImage(btImg);
  button3.scale = 0.5
}


function draw(){
  if(backgroundImg){
  background(backgroundImg);


  Engine.update(engine);
  
    

  if(mousePressedOver(button)){
    for(var i=0; i<maxDrops; i=i+30){
      drops.push(new Drops(random(0,2000),random(0,2000)));
    }
  
    //display drops
    for(var p=0; p<drops.length; p++){
       drops[p].display();
    }
   
    //update drops
    for(var q=0; q<drops.length; q++){
       drops[q].update();
    }
    
    worm.visible = false;
    worm2.visible = false;
    worm3.visible = false;

    score = score+1;
  }
 
  if(mousePressedOver(button2)){
    gameState = 1;
  }

  if(mousePressedOver(button3)){
    gameState = 0;
  }
  
  drawSprites();

  if(gameState === 0){
    fill("white")
    textSize(30)
    text("Its DayTime! Water Your Plant Before the Bugs Eat It!",250,150);
    shade2 = createSprite(600,140,750,60);
    shade2.shapeColor = "#2d6187"

    bg = "images/day.jpg";
    fill("black")
    stroke(3)
    textSize(20)
    text("click here",840,660); 
  
    button.visible = true;
  
  }

 
  if(gameState === 1){
    bg = "images/niiight.png";
      button.visible = false;

      worm.visible = true;
      worm2.visible = true;
      worm3.visible = true;
    fill("white")
    textSize(30)
    text("Its NightTime! Don't Forget to Water Your Plants in the Day!",250,150);
    shade = createSprite(650,140,820,60);
    shade.shapeColor = "#414141"
  }

  
  backgroundImg = loadImage(bg);
}
}

async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=06 && hour<=20){
      bg = "images/day.jpg";
     
      
  }
  else{
      bg = "images/niiight.png";
      button.destroy();
      worm.visible = true;
      worm2.visible = true;
      worm3.visible = true;
      gameState = 1;
  }

  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}