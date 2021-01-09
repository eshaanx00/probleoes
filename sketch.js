const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var obimg
var engine, world;
var ob,obgroup
var bulletG,bullet
var game="home"
function preload(){
ob1img=loadImage("ob1.png")
ob2img=loadImage("ob2.png")
ob3img=loadImage("ob3.png")
spimg=loadImage("Game.png")
spup=loadImage("gameup.png")
bulimg=loadImage("bullet.png")
bg=loadImage("background.jpg")
explosion=loadSound("explosion.mp3")
theme=loadSound("theme.ogg")
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  engine = Engine.create();
    world = engine.world;
   spaceship=createSprite(120,displayHeight/2)
   obgroup=new Group();
   bulletG=new Group()
spaceship.addImage(spimg)
spaceship.scale=0.3
}

function draw() {
  background(bg);  
  Engine.update(engine);
  // theme.play(true)
  if(game==="home"){
    textSize(22)
    fill(random(0,255),random(0,255),random(0,255))
    text("Do you wanna play press space for PC",displayWidth/2-150,100)
    text("If you are on mobile just tap",displayWidth/2-100,150)
    if(keyDown("space")){
      game="play"

    }
  }
  if(game==="play"){
    callob();
    if(keyDown("space")){
      spaceship.y-=9 
      spaceship.addImage(spup) 
    }
    if(keyWentUp("space")){
      spaceship.y+=3
      spaceship.addImage(spimg) 
    }
    for(var i=0;i<obgroup.length;i++){
      if(obgroup.get(i).isTouching(spaceship)){
        obgroup.get(i).destroy()
        game="end"
      }
      
    }
    for(var i=0;i<bulletG.length;i++){
      if(bulletG.get(i).isTouching(obgroup)){
        obgroup.get(i).destroy()
        bulletG.get(i).destroy()
        explosion.play()
  
      }
      
      
    }
  
 if(keyWentDown("ctrl")){
   bullet=createSprite(spaceship.x,spaceship.y)
   bullet.addImage(bulimg)
   bullet.scale=0.7
   bullet.velocityX+=10
   bullet.lifetime=180
   bulletG.add(bullet)
 }
    
    spaceship.y+=4
  }
  if(game==="end"){
    obgroup.setVelocityXEach(0)
    obgroup.setLifetimeEach(0)
    spaceship.y+=5
  }
  

drawSprites()
}
function callob(){
  if (frameCount % 120===0&&game==="play"){
    ob=createSprite(displayWidth-20,random(150,displayHeight-100))
   ob.lifetime=1200
   ob.velocityX=-3
    var ran=Math.round(random(1,3))

    switch (ran){
      case 1: ob.addImage("ob",ob1img);ob.scale=random(0.4,1);break;
        case 2: ob.addImage("ob",ob2img);ob.scale=random(0.2,0.6);break;
          case 3: ob.addImage("ob",ob3img);ob.scale=random(0.4,1);break;
    }
obgroup.add(ob)
  }
}
