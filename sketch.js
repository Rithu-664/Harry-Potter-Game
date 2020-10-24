var back, backImg;
var harry, harryImg;
var gem, gemImg, gemGroup;
var snitch, snitchImg, snitchGroup;
var score = 0;
var obstacle, obsImg, obsGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var Soundbgm;

function preload() {
  backImg = loadImage("ski.jpg");
  harryImg = loadImage("harry flying.png");
  gemImg = loadImage("gem.png");
  snitchImg = loadImage("snitch.png");
  obsImg = loadImage("bludger.png");
  Soundbgm = loadSound("harry potter theme.mp3");
}

function setup() {
  createCanvas(400, 400);

  back = createSprite(200, 200, 500, 500);
  back.addImage(backImg);
  back.scale = 1.9;
  back.velocityX = -7;

  harry = createSprite(50, 200, 20, 20);
  harry.addImage(harryImg);
  harry.scale = 0.2;

  gemGroup = new Group();

  snitchGroup = new Group();

  obsGroup = new Group();
  
     Soundbgm.loop();
   
}

function draw() {
  
  
  fill("pink");
  textSize(30);
  text("Score:" + score, 150, 50);
  if (gameState === PLAY) {
 
    if (back.x < 0) {
      back.x = back.width / 2;
    }

    if (keyDown("right")) {
      harry.x = harry.x + 3;
    }

    if (keyDown("left")) {
      harry.x = harry.x - 3;
    }

    if (keyDown("up")) {
      harry.y = harry.y - 3;
    }

    if (keyDown("down")) {
      harry.y = harry.y + 3;
    }

    if (harry.isTouching(gemGroup)) {
      score = score + 5;
      gemGroup.destroyEach();
    }

    if (harry.isTouching(snitchGroup)) {
      background("turquoise");
      harry.visible = false;
      gemGroup.setVisibleEach(false);
      back.destroy();
      snitch.visible = false;
      obstacle.visible = false;
      score = score + 150;
      fill("pink");
      textSize(50);
      text("YOU WON :D", 50, 200);
      gameState = END;
    }

    if (harry.isTouching(obsGroup)) {
      background("black");
      harry.visible = false;
      gemGroup.setVisibleEach(false);
      back.destroy();
      snitchGroup.destroyEach();
      obstacle.visible = false;
      fill("pink");
      textSize(20);
      text("OH NO! YOU GOT HIT BY A BLUDGER", 20, 200);
      gameState = END;
    }

    spawnGems();
    spawnSnitch();
    spawnObstacle();

    drawSprites();

  }

  if (gameState === END) {
    back.destroy();
    gemGroup.destroyEach();
    harry.destroy();
    snitchGroup.setVelocityXEach(0);
    obsGroup.setVelocityYEach(0);
  }
}

function spawnGems() {
  if (World.frameCount % 80 === 0) {
    gem = createSprite(300, 200, 20, 20);
    gem.addImage(gemImg);
    gem.scale = 0.1;
    gem.velocityX = -6;
    gem.y = Math.round(random(100, 300));

    gemGroup.add(gem);

  }
}

function spawnSnitch() {
  if (World.frameCount % 400 === 0) {
    snitch = createSprite(300, 200, 20, 20);
    snitch.addImage(snitchImg);
    snitch.scale = 0.2;
    snitch.velocityX = -25;
    snitch.y = Math.round(random(100, 300));

    snitchGroup.add(snitch);
  }

}

function spawnObstacle() {
  if (World.frameCount % 150 === 0) {
    obstacle = createSprite(200,0,20, 20);
    obstacle.addImage(obsImg);
    obstacle.scale = 0.4;
    obstacle.x = Math.round(random(100, 300));
    obstacle.velocityY = 6;
    obstacle.debug = true;
    obstacle.setCollider("rectangle", 0, 0, 75, 30);

    obsGroup.add(obstacle);

  }
}