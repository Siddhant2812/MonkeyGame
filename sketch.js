var monkey, jungle;
var monkeyAni,jungleBg;
var rockImage,bananaImage;
var obstacleGroup,foodGroup;
var ground;
var score;

function preload(){
  monkeyAni=loadAnimation("monkey_01.png","monkey_02.png","monkey_03.png","monkey_04.png","monkey_05.png","monkey_06.png","monkey_07.png","monkey_08.png","monkey_09.png","monkey_10.png");
  
  jungleBg = loadImage("jungle2.jpg");
  rockImage = loadImage("stone.png");
  bananaImage = loadImage("banana.png");
}

function setup() {
  createCanvas(800,400);
  
  jungle = createSprite(0,0,800,400);
  jungle.shapeColor = "white";
  jungle.x = jungle.width/2;
  jungle.addImage(jungleBg);
  
  monkey = createSprite(50,350,20,20);
 // monkey.shapeColor = "green";
  monkey.addAnimation(monkeyAni)
  monkey.scale =1.5;
  
  ground = createSprite(400,350,800,10);
  ground.visible = false;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
  score = 0;
  monkey.debug =true;
}

function draw() {
  background(220);
  
  monkey.collide(ground);
  console.log(monkey.scale);
  console.log(monkey.y);
    
  //ground controls(26)
  jungle.velocityX = -5;
  
  if(jungle.x<0){
    jungle.x = jungle.width/2;
    }
    
   //scoring control
    score = score+Math.round(frameRate/60);
    
    //monkey jumping controls(35)
    if(keyDown("space")){
      monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY+0.8;
    
    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
      monkey.scale = monkey.scale+0.01;
    }
    
    if(obstacleGroup.isTouching(monkey)){
      monkey.scale = monkey.scale-0.01;
    }
    food();
    obstacles();
  /*else if(gamestate === END){
    jungle.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }*/
  
  drawSprites();
}
function food(){
  var rand = random(180,200);
  if(frameCount%80===0){
   var banana = createSprite(420,rand,40,40);
    banana.shapeColor="red";
    banana.velocityX = -5;
   // banana.scale = 0.05;
    banana.lifetime=95;
    banana.addImage(bananaImage);
    foodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount%300===0){
    var rock = createSprite(420,350,30,30);
    rock.velocityX = -5;
   // rock.scale = 0.12;
    rock.lifetime=95;
    rock.addImage( rockImage);
    rock.setCollider("circle",0,0,225);
    //rock.debug=true;
    obstacleGroup.add(rock);
  }
}