var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var asteroids, asteroid1, asteroid2, asteroid3;
var spaceship, spaceshipImg,earth,lasers,laser,laser2,left_boundary,right_boundary;
var laser;
var heart, heart1, heart2, heart3;
var life = 0;
var score=0;
var laserShot, asteroidDestroy, bgSound;

function preload() {
  spaceshipImg = loadImage("spaceship.png");
  spaceImg = loadImage("space.jpeg");
  heart1Img = loadImage("heart1.png");
  heart2Img = loadImage("heart2.png");
  heart3Img = loadImage("heart3.png");
  laserImg = loadImage("laser.png");
  asteroid1Img = loadImage("asteroid1.png")
  asteroid2Img = loadImage("asteroid2.png")
  asteroid3Img = loadImage("asteroid3.png")
  earthImg = loadImage("earth.png");
  laserShot = loadSound("laserShot.mp3");
  asteroidDestroy = loadSound("asteroidDestroy.mp3");
  bgSound = loadSound("bgSound.wav");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  spaceship = createSprite(720, 535, 50, 50);
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.5;

  earth = createSprite(730, 650)
  earth.addImage(earthImg)
  earth.scale = 0.7;

  asteroids = new Group();
  lasers = new Group();

  heart1 = createSprite(40, 35, 15, 15);
  heart1.addImage(heart1Img);
  heart1.scale = 0.07;
  heart2 = createSprite(100, 35, 15, 15);
  heart2.addImage(heart2Img);
  heart2.scale = 0.07;
  heart3 = createSprite(160, 35, 15, 15);
  heart3.addImage(heart3Img);
  heart3.scale = 0.07;

  left_boundary = createSprite(90, 0, 400, 1200);
  left_boundary.visible = false
  right_boundary = createSprite(1300, 35, 400, 1200)
  right_boundary.visible = false
  

  bgSound.loop();
}

function draw() {
  bgSound.loop();
  

  bgSound.volume=0.1;
  if(playerCount === 2){
    game.update(1);
  }
  
    if(gameState===1){
      background(spaceImg);
      spawnAsteroids()
      if (keyWentDown("space")) {
        spawnLaser();
  
      }
  if (keyWentUp("space")) {
        console.log("hi")
      }
  if (keyDown("a")) {
        spaceship.x = spaceship.x - 7;
      }
  if (keyDown("d")) {
        spaceship.x = spaceship.x + 7;
      }
  
  if (lasers.isTouching(asteroids)){
        lasers.destroyEach();
        asteroids.destroyEach();
        score+=2;
        asteroidDestroy.play();
        asteroidDestroy.volume=20;
      }
  
  if (asteroids.isTouching(spaceship)) {
        asteroids.destroyEach();
        life = life + 1;
      }
  spaceship.collide(left_boundary)
  spaceship.collide(right_boundary)
  if (life === 1) {
    heart1.visible = false;
  }
  if (life === 2) {
    heart2.visible = false;
  }
  if (life === 3) {
    heart3.visible = false;
    gameState=2;
  }
}if (gameState === 2) {
    asteroids.setVelocityYEach(0);
    asteroids.setLifetimeEach(-1);
    fill("white")
    textSize(10);
    text("Press enter to restart!", 700, 350);

    if(keyDown("r")){
      reset();
    }
   }
   

  drawSprites();

  textSize(25);
  textFont("Algerian");
  text("AsteroidsDestroyed="+score, 1200, 20);
}

function keyPressed(){
  if(keyCode===UP_ARROW){
    game.play();
    

  }
}
function spawnAsteroids() {
  if (frameCount % 120 === 0) {
    asteroid = createSprite(Math.round(random(350, 1140)), 5, 30, 30);
    asteroid.scale = 0.1;
    asteroid.velocityY = 4+score/10;

    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        asteroid.addImage(asteroid1Img)
        break;
      case 2:
        asteroid.addImage(asteroid2Img)
        break;
      case 3:
        asteroid.addImage(asteroid3Img)
        break;
      default: break;
    }
    asteroid.lifetime = 300;
    asteroids.add(asteroid);
  }
}


function spawnLaser() {
  laser = createSprite(spaceship.x - 80, spaceship.y - 60, 5, 25);
  laser2 = createSprite(spaceship.x + 80, spaceship.y - 60, 5, 25);
  laser.addImage(laserImg);
  laser2.addImage(laserImg);
  laser.scale = 0.2;
  laser2.scale = 0.2;
  laser.velocityY = -7;
  laser2.velocityY = -7;
  lasers.add(laser);
  lasers.add(laser2);
  lasers.lfetime=300;
}

function reset() {
  gameState = 1;
  asteroids.destroyEach();
  console.log("reset");
}
