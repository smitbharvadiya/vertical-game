var charactor,charactorImg;
var Background,backgroundImage;
var bee,beeImg,beesGroup;

var gameState = "play";

var score = 0;

function preload(){
  
  backgroundImage=loadImage("BG_1.jpg");
  charactorImg=loadAnimation("charactor1.png","charactor2.png");
  beeImg=loadAnimation("bee1.png","bee2.png");
  
}

function setup(){
  createCanvas(400,500);
  
  Background=createSprite(200,170,100,10);
  Background.addImage(backgroundImage);
  Background.scale=0.69;
  Background.velocityY = 0.8;
  
  charactor=createSprite(200,300,10,10);
  charactor.addAnimation("fly",charactorImg);
  charactor.scale=0.7;
  
  beesGroup = new Group();
  cloudsGroup = new Group();
  
  score = 0;
}

function draw(){
  background("white");
    
  //adding gameState play
  if (gameState === "play") {   
    
     score = score + Math.round(getFrameRate() /60);
    
    //moving with arrow keys
    if(keyDown("left_arrow")){
      charactor.x = charactor.x - 3.5;
    }
    
    if(keyDown("right_arrow")){
      charactor.x = charactor.x + 3.5;
    }
    
    //jumping when space key is preesed
    if(keyDown("space")){
      charactor.velocityY = -10;
    }
     
    
    //adding gravity
    charactor.velocityY = charactor.velocityY + 0.4;
  
  if(Background.y > 312){
      Background.y = 250
    }

  }
  
  spawnBee();
  
   if(beesGroup.isTouching(charactor) || charactor.y > 600 || charactor.y < 0){
      gameState = "end"
    }
  
    drawSprites();
  
    stroke("black");
    textSize(15);
    fill("black");
    text("Score: "+ score, 320,50);
  
    //gameState End 
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 120,255);
     Background.velocityY=0;
    beesGroup.setVelocityYEach(0);
    beesGroup.destroyEach();
    charactor.x=200;
    charactor.y=200;
    
  }

  
  function spawnBee() {
  //write code here to spawn the doors in the tower
  if (frameCount % 200 === 0) {
    var bee = createSprite(200, -50);
    bee.scale=0.5;
    //generating doors at random position
    bee.x = Math.round(random(10,390));
    
    //adding image
    bee.addAnimation("fly",beeImg);
    
    //giving velocity
    bee.velocityY = 1.5;
    
    //giving depth
    charactor.depth = bee.depth;
    charactor.depth +=1;
   
    //assign lifetime to the variable
    //bee.lifetime = 500;

    
    //add each door to the group
    beesGroup.add(bee);
  }
}

}