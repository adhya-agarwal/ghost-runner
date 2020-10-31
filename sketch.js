var tower, towerimage;
var door,doorimage,doorsgroup;
var rail,railimage,railgroup;
var ghost, ghostimage;
var invisibleblock,invisibleblockgroup;
var gamestate="play";


function preload(){
  towerimage=loadImage("tower.png");
  doorimage=loadImage("door.png");
  railimage=loadImage("climber.png");
  ghostimage=loadImage("ghost-standing.png")
  
}

function setup() {
  createCanvas(600, 600);
  
 tower=createSprite(300,300)
  tower.addImage(towerimage);
  tower.velocityY=1;
  
  doorsgroup=new Group()
  railgroup=new Group()
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostimage);
  ghost.scale=0.3;
  
  invisibleblockgroup=new Group();
  
}

function draw() {
  background(0);
  if (gamestate==="play"){
  if(tower.y>400){
    tower.y=300;
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-5;
  }
  
   if(keyDown("right_arrow")){
    ghost.x=ghost.x+5;
  }
  
   if(keyDown("space")){
    ghost.velocityY=-6;
  }
  
  ghost.velocityY=ghost.velocityY+0.5;
  
  
      if(railgroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
  
  if(invisibleblockgroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gamestate="end";
  }
 
  spawndoors();
  drawSprites();
}
   if(gamestate==="end"){
    textSize(30)
    fill("white");
    text("GAMEOVER",200,300);
  }
}



function spawndoors(){
  
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage(doorimage);
    door.x=Math.round(random(120,400))
    door.velocityY=1;
    door.lifetime=800;
    doorsgroup.add(door);
    
    rail=createSprite(200,10);
    rail.addImage(railimage);
    rail.x=door.x
    rail.velocityY=1;
    rail.lifetime=800;
    railgroup.add(rail);
    
    invisibleblock=createSprite(200,15);
    invisibleblock.width=rail.width;
    invisibleblock.height=2;
    invisibleblock.x=door.x;
    invisibleblock.velocityY=1;
    invisibleblockgroup.add(invisibleblock)
    invisibleblock.debug=true;
    
  
    ghost.depth=door.depth;
    ghost.depth+=1;
  }
}