/*

- Copy your game project code into this file
- for the p5.Sound library look here https://p5js.org/reference/#/libraries/p5.sound
- for finding cool sounds perhaps look here
https://freesound.org/




*/
var gameChar_x;
var gameChar_y;
var gameChar_width;
var floorPos_y;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var collectables;
var canyons;
var mountains;
var clouds;
var trees_x;

// add in game score
var game_score;

//add flagpole
var flagpole;

//add in lives
var lives

//add in game over
var gameOver;

// store array of platform objects
var platforms;
//used to detect if gameChar is on a a platfrom
var onPlatform;

var enemies;

var hitByEnemy;


var jumpSound;
var coin;
var falling;
var walking;
var levelComplete;
var bgSound
var flagLogo;

var emitters=[];

function preload()
{

    flagLogo = loadImage ('pixil-frame-0.png');
    soundFormats('mp3','wav');

    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.9);

    coin = loadSound('assets/coin.mp3');
    coin.setVolume(0.9);

    falling = loadSound('assets/falling.mp3')
    falling.setVolume(0.9);

    levelComplete = loadSound('assets/level complete.mp3')
    levelComplete.setVolume(0.9);

    walking = loadSound('assets/mixkit-game-ball-tap-2073.mp3')
    walking.setVolume(0.9);

    bgSound = loadSound('assets/bgsound.mp3', soundLoaded);
    bgSound.setVolume(0.3);
}

function soundLoaded(){

}

function createPlatform(x,y,length){
    return new Platform(x,y,length);
}

//add createEnemy
function createEnemy(x,y,range){
    return new Enemy(x,y,range); 
}

function setup()
{ // setup the canvas and initialise the game variables
    createCanvas(1024, 576);
    //init lives
    lives=3;
    // init gameOver to false
    gameOver = false;
    //init starting variables
    init();

    mousePressed = mousePressed;

}

function init(){    
    floorPos_y = height * 3/4;
    gameChar_x = width/2;
    gameChar_y = floorPos_y;
    gameChar_width = 40;

    //init game_score to 0
    game_score = 0;

    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    onPlatform = false; 
    hitByEnemy = false;

    //creat 2 platfors
    platforms=[];
    platforms.push(createPlatform(400,floorPos_y-100,100));
    platforms.push(createPlatform(600,floorPos_y-200,100));
    platforms.push(createPlatform(200,floorPos_y-50,100));

    //creat enemies
    enemies = [];
    enemies.push(createEnemy(1500,floorPos_y-30,100));
    enemies.push(createEnemy(300,floorPos_y-30,100));
    enemies.push(createEnemy(1750,floorPos_y-30,100));
    enemies.push(createEnemy(-100,floorPos_y-30,100));
    enemies.push(createEnemy(950,floorPos_y-30,100));
    enemies.push(createEnemy(100,floorPos_y-30,100));

    //initialise collecables, canyons, mountains, clouds and trees
    setupCollectables(); 
    setupCanyon();   
    setupMountains();
    setupClouds();

    trees_x = [-900,-600,-500,-350,0,400,500,750,1200,1300,1500,2000];
    trees_y = floorPos_y - 50;
    flagpole = {x_pos: 1950, isReached:false};

    var emitter1 = new Emitter(650,floorPos_y+75,0,-1,8,color(200,0,0));
    var emitter2 = new Emitter(850,floorPos_y+75,0,-1,8,color(200,0,0));
    var emitter3 = new Emitter(1650,floorPos_y+75,0,-1,8,color(200,0,0));
    var emitter4 = new Emitter(-750,floorPos_y+75,0,-1,8,color(200,0,0));
    emitters.push(emitter1);
    emitters.push(emitter2);
    emitters.push(emitter3);
    emitters.push(emitter4);

    for(var i=0;i<emitters.length;i++){
        emitters[i].startEmitter(200,100);
    }

    //    bgSound.stop();
    //    bgSound.loop();

}

function setupCollectables() {
    collectables = [
        {x_pos: 10, y_pos: floorPos_y - 20, size: 40, isFound: false},
        {x_pos: 200, y_pos: floorPos_y - 20, size: 40, isFound: false},
        {x_pos: 1000, y_pos: floorPos_y - 20, size: 40, isFound: false},
        {x_pos: -100, y_pos: floorPos_y - 20, size: 40, isFound: false},
        {x_pos: -500, y_pos: floorPos_y - 20, size: 40, isFound: false},
        {x_pos: -1000, y_pos: floorPos_y - 20, size: 40, isFound: false}
    ];
}


function setupCanyon() {
    // Initialise canyons array with positions and widths
    canyons = [
        {x_pos: 600, width: 100},
        {x_pos: 800, width: 100},
        {x_pos: 1600, width: 100},
        {x_pos: -800, width: 100}
    ];
}

function setupMountains() {
    //Initialise mountains array with positions, heights, and widths 
    mountains = [
        {pos_x: 400, pos_y: floorPos_y - 200, height: 400, width: 300},
        {pos_x: 500, pos_y: floorPos_y - 150, height: 300, width: 150},
        {pos_x: 300, pos_y: floorPos_y - 175, height: 350, width: 200},
        {pos_x: 1300, pos_y: floorPos_y - 200, height: 400, width: 300},
        {pos_x: 1400, pos_y: floorPos_y - 150, height: 300, width: 150},
        {pos_x: 1200, pos_y: floorPos_y - 175, height: 350, width: 200},
        {pos_x: 2000, pos_y: floorPos_y - 200, height: 400, width: 300},
        {pos_x: 2100, pos_y: floorPos_y - 150, height: 300, width: 150},
        {pos_x: 1900, pos_y: floorPos_y - 175, height: 350, width: 200},
        {pos_x: -400, pos_y: floorPos_y - 200, height: 400, width: 300},
        {pos_x: -300, pos_y: floorPos_y - 150, height: 300, width: 150},
        {pos_x: -500, pos_y: floorPos_y - 175, height: 350, width: 200}

    ];
}

function setupClouds(){
    // Initialise clouds array with random positions and sizes
    clouds = [
        {pos_x: random(10, width), pos_y: random(20, 100), size: random(50, 80)},
        {pos_x: random(10, width), pos_y: random(100, 200), size: random(50, 80)},
        {pos_x: random(10, width), pos_y: random(200, 250), size: random(50, 80)}
    ];
}

function draw()
{   // Main drawing function, called every frame

    // Set camera position based on game character's position 
    cameraPosX = gameChar_x - width / 2;

    ///////////DRAWING CODE//////////
    // Draws the sky and ground
    background(100, 155, 255); 
    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height - floorPos_y); 

    //draw score
    drawGameScore();

    //draw life tokens
    drawLifeTokens();

    // Translate the canvas for camera effect
    push();
    translate(-cameraPosX, 0);

    // draw the canyon
    drawCanyon();

    // draw the clouds
    drawClouds();
    animateClouds();

    // draw the mountains
    drawMountains();

    // draw the trees
    drawTrees();

    // draw the collectable
    drawCollectables();

    //draw flag
    drawFlagpole();

    // draw platforms
    drawPlatforms();

    //draw enemies
    drawEnemies();

    //draw the fire
    drawFire();

    manageBgAudio();

    // platform
    function createPlatform(x,y,length){
        return new Platform(x,y,length);
    }

    //add createEnemy
    function createEnemy(x,y,range){
        return new Enemy(x,y,range); 
    }

    //add drawEnemies
    function drawEnemies(){
        //draw enemies
        for(var i=0;i<enemies.length;i++){
            enemies[i].draw();
        }
    }

    if (gameOver) {
        drawGameOver();
        drawResetButton();
    }


    //check if game over
    if(gameOver){
        drawGameOver();
        gameChar_x = width/2;
        gameChar_y = floorPos_y;
        //draw game char 
        drawGameCharStanding();
        //return 
        return;
    }

    // the game character
    if(onPlatform && isLeft){
        //hand1
        push();
        translate(gameChar_x-3.5,gameChar_y-42);
        rotate(25);
        fill(121,13,13);
        rect(0,0,5,20);
        fill(188,184,65);
        rect(0,0,5,10);
        pop();

        //body
        fill(121,13,13);
        rect(gameChar_x-3.5,gameChar_y-42,7,25);

        push();
        //leg
        translate(gameChar_x-3,gameChar_y-17);
        rotate(25);
        fill(121,13,13);
        rect(0,0-2,6,20);
        fill(188,184,65);
        rect(0,0-2,6,10);
        pop();

        push();
        //leg2
        translate(gameChar_x-3,gameChar_y-17);
        rotate(-25);
        fill(121,13,13);
        rect(0,0,6,20);
        fill(188,184,65);
        rect(0,0,6,10);
        pop();

        //hand1
        push();
        translate(gameChar_x-2,gameChar_y-40);
        rotate(-30);
        fill(121,13,13);
        rect(0,0,5,20);
        fill(188,184,65);
        rect(0,0,5,10);
        pop();

        //head
        fill(121,13,13);
        ellipse(gameChar_x,gameChar_y-48,7,15);
        //eye
        fill(139,211,251);
        ellipse(gameChar_x-1,gameChar_y-50,3,3);

    }

    else if (onPlatform && isRight){
        //hand1
        push();
        translate(gameChar_x-3.5,gameChar_y-42);
        rotate(25);
        fill(121,13,13);
        rect(0,0,5,20);
        fill(188,184,65);
        rect(0,0,5,10);
        pop();

        //BODY
        fill(121,13,13);
        rect(gameChar_x-3.5,gameChar_y-42,7,25);
        //head
        fill(121,13,13);
        ellipse(gameChar_x,gameChar_y-48,7,15);

        push();
        //leg
        translate(gameChar_x-3,gameChar_y-17);
        rotate(25);
        fill(121,13,13);
        rect(0,0-2,6,20);
        fill(184,188,65);
        rect(0,0-2,6,10);
        pop();

        push();
        //leg2
        translate(gameChar_x-3,gameChar_y-17);
        rotate(-25);
        fill(121,13,13);
        rect(0,0,6,20);
        fill(184,188,65);
        rect(0,0,6,10);
        pop();

        //hand1
        push();
        translate(gameChar_x-2,gameChar_y-40);
        rotate(80);
        fill(121,13,13);
        rect(0,0,5,20);
        fill(188,184,65);
        rect(0,0,5,10);
        pop();

        //eye
        fill(139,211,251);
        ellipse(gameChar_x+1,gameChar_y-50,3,3);

    }

    if (isLeft && isFalling)
    {
        // add your jumping-left code
        //hand1
        push();
        translate(gameChar_x-3.5,gameChar_y-42);
        rotate(25);
        fill(121,13,13);
        rect(0,0,5,20);
        fill(188,184,65);
        rect(0,0,5,10);
        pop();


        //body
        fill(121,13,13);
        rect(gameChar_x-3.5,gameChar_y-42,7,25);

        push();
        //leg
        translate(gameChar_x-3,gameChar_y-17);
        rotate(25);
        fill(121,13,13);
        rect(0,0-2,6,20);
        fill(188,184,65);
        rect(0,0-2,6,10);
        pop();

        push();
        //leg2
        translate(gameChar_x-3,gameChar_y-17);
        rotate(-25);
        fill(121,13,13);
        rect(0,0,6,20);
        fill(188,184,65);
        rect(0,0,6,10);
        pop();

        //hand1
        push();
        translate(gameChar_x-2,gameChar_y-40);
        rotate(-30);
        fill(121,13,13);
        rect(0,0,5,20);
        fill(188,184,65);
        rect(0,0,5,10);
        pop();

        //head
        fill(121,13,13);
        ellipse(gameChar_x,gameChar_y-48,7,15);
        //eye
        fill(139,211,251);
        ellipse(gameChar_x-1,gameChar_y-50,3,3);

    }
    else if (isRight && isFalling)
    {
        // add your jumping-right code
        //hand1
        push();
        translate(gameChar_x-3.5,gameChar_y-42);
        rotate(25);
        fill(121,13,13);
        rect(0,0,5,20);
        fill(188,184,65);
        rect(0,0,5,10);
        pop();

        //BODY
        fill(121,13,13);
        rect(gameChar_x-3.5,gameChar_y-42,7,25);
        //head
        fill(121,13,13);
        ellipse(gameChar_x,gameChar_y-48,7,15);

        push();
        //leg
        translate(gameChar_x-3,gameChar_y-17);
        rotate(25);
        fill(121,13,13);
        rect(0,0-2,6,20);
        fill(184,188,65);
        rect(0,0-2,6,10);
        pop();

        push();
        //leg2
        translate(gameChar_x-3,gameChar_y-17);
        rotate(-25);
        fill(121,13,13);
        rect(0,0,6,20);
        fill(184,188,65);
        rect(0,0,6,10);
        pop();

        //hand1
        push();
        translate(gameChar_x-2,gameChar_y-40);
        rotate(80);
        fill(121,13,13);
        rect(0,0,5,20);
        fill(188,184,65);
        rect(0,0,5,10);
        pop();

        //eye
        fill(139,211,251);
        ellipse(gameChar_x+1,gameChar_y-50,3,3);
    }
    else if (isLeft)
    {
        // add your walking left code

        //hand1
        push();
        translate(gameChar_x-3.5,gameChar_y-42);
        rotate(25);
        fill(121,13,13);
        rect(0,0,5,20);
        fill(188,184,65);
        rect(0,0,5,10);
        pop();

        //body
        fill(121,13,13);
        rect(gameChar_x-3.5,gameChar_y-42,7,25);

        push();
        //leg
        translate(gameChar_x-3,gameChar_y-17);
        rotate(25);
        fill(121,13,13);
        rect(0,0-2,6,20);
        fill(188,184,65);
        rect(0,0-2,6,10);
        pop();

        push();
        //leg2
        translate(gameChar_x-3,gameChar_y-17);
        rotate(-25);
        fill(121,13,13);
        rect(0,0,6,20);
        fill(188,184,65);
        rect(0,0,6,10);
        pop();

        //hand1
        push();
        translate(gameChar_x-2,gameChar_y-40);
        rotate(-30);
        fill(121,13,13);
        rect(0,0,5,20);
        fill(188,184,65);
        rect(0,0,5,10);
        pop();

        //head
        fill(121,13,13);
        ellipse(gameChar_x,gameChar_y-48,7,15);
        //eye
        fill(139,211,251);
        ellipse(gameChar_x-1,gameChar_y-50,3,3);

    }
    else if (isRight)
    {
        // add your walking right code
        //hand1
        push();
        translate(gameChar_x-3.5,gameChar_y-42);
        rotate(25);
        fill(121,13,13);
        rect(0,0,5,20);
        fill(188,184,65);
        rect(0,0,5,10);
        pop();

        //BODY
        fill(121,13,13);
        rect(gameChar_x-3.5,gameChar_y-42,7,25);
        //head
        fill(121,13,13);
        ellipse(gameChar_x,gameChar_y-48,7,15);

        push();
        //leg
        translate(gameChar_x-3,gameChar_y-17);
        rotate(25);
        fill(121,13,13);
        rect(0,0-2,6,20);
        fill(184,188,65);
        rect(0,0-2,6,10);
        pop();

        push();
        //leg2
        translate(gameChar_x-3,gameChar_y-17);
        rotate(-25);
        fill(121,13,13);
        rect(0,0,6,20);
        fill(184,188,65);
        rect(0,0,6,10);
        pop();

        //hand1
        push();
        translate(gameChar_x-2,gameChar_y-40);
        rotate(80);
        fill(121,13,13);
        rect(0,0,5,20);
        fill(188,184,65);
        rect(0,0,5,10);
        pop();

        //eye
        fill(139,211,251);
        ellipse(gameChar_x+1,gameChar_y-50,3,3);
    }

    else if (onPlatform){
        fill(121,13,13);
        rect(gameChar_x-7.5,gameChar_y - 43.5,15,25);
        fill(139,211,251);
        ellipse(gameChar_x,gameChar_y - 35.5,7,7);
        //legs
        fill(121,13,13);
        rect(gameChar_x-7.5,gameChar_y - 18.5,5,20);
        rect(gameChar_x + 2.5,gameChar_y - 18.5,5,20);
        fill(188,184,65);
        rect(gameChar_x-7.5,gameChar_y - 18.5,5,10);
        rect(gameChar_x + 2.5,gameChar_y - 18.5,5,10);
        //head
        fill(121,13,13);
        ellipse(gameChar_x, gameChar_y - 48.5, 15,15);
        fill(188,184,65);
        ellipse(gameChar_x, gameChar_y - 48.5,7.5,10);
        //arms
        fill(121,13,13);
        rect(gameChar_x-12.5,gameChar_y - 43.5,5,20);
        rect(gameChar_x + 7,gameChar_y -43.5,5,20);
        fill(188,184,65);
        rect(gameChar_x-12.5,gameChar_y - 43.5,5,10);
        rect(gameChar_x + 7,gameChar_y - 43.5,5,10);
        //eyes
        fill(139,211,251)
        ellipse(gameChar_x - 2, gameChar_y- 50.5, 3,3);
        ellipse(gameChar_x + 2, gameChar_y - 50.5,3,3);
    }

    else if (isFalling || isPlummeting)
    {
        // add your jumping facing forwards code
        //body
        fill(121,13,13);
        rect(gameChar_x-7.5,gameChar_y - 43.5,15,25);
        fill(139,211,251);
        ellipse(gameChar_x,gameChar_y - 35.5,7,7);
        //legs
        fill(121,13,13);
        rect(gameChar_x-7.5,gameChar_y - 18.5,5,20);
        rect(gameChar_x + 2.5,gameChar_y - 18.5,5,20);
        fill(188,184,65);
        rect(gameChar_x-7.5,gameChar_y - 18.5,5,10);
        rect(gameChar_x + 2.5,gameChar_y - 18.5,5,10);
        //head
        fill(121,13,13);
        ellipse(gameChar_x, gameChar_y - 48.5, 15,15);
        fill(188,184,65);
        ellipse(gameChar_x, gameChar_y - 48.5,7.5,10);
        //arms
        fill(121,13,13);
        rect(gameChar_x-12.5,gameChar_y - 43.5,5,20);
        rect(gameChar_x + 7,gameChar_y -43.5,5,20);
        fill(188,184,65);
        rect(gameChar_x-12.5,gameChar_y - 43.5,5,10);
        rect(gameChar_x + 7,gameChar_y - 43.5,5,10);
        //eyes
        fill(139,211,251)
        ellipse(gameChar_x - 2, gameChar_y- 50.5, 3,3);
        ellipse(gameChar_x + 2, gameChar_y - 50.5,3,3);
    }
    else
    {
        // add your standing front facing code
        //body
        fill(121,13,13);
        rect(gameChar_x-7.5,gameChar_y - 43.5,15,25);
        fill(139,211,251);
        ellipse(gameChar_x,gameChar_y - 35.5,7,7);
        //legs
        fill(121,13,13);
        rect(gameChar_x-7.5,gameChar_y - 18.5,5,20);
        rect(gameChar_x + 2.5,gameChar_y - 18.5,5,20);
        fill(188,184,65);
        rect(gameChar_x-7.5,gameChar_y - 18.5,5,10);
        rect(gameChar_x + 2.5,gameChar_y - 18.5,5,10);
        //head
        fill(121,13,13);
        ellipse(gameChar_x, gameChar_y - 48.5, 15,15);
        fill(188,184,65);
        ellipse(gameChar_x, gameChar_y - 48.5,7.5,10);
        //arms
        fill(121,13,13);
        rect(gameChar_x-12.5,gameChar_y - 43.5,5,20);
        rect(gameChar_x + 7,gameChar_y -43.5,5,20);
        fill(188,184,65);
        rect(gameChar_x-12.5,gameChar_y - 43.5,5,10);
        rect(gameChar_x + 7,gameChar_y - 43.5,5,10);
        //eyes
        fill(139,211,251)
        ellipse(gameChar_x - 2, gameChar_y- 50.5, 3,3);
        ellipse(gameChar_x + 2, gameChar_y - 50.5,3,3);

    }

    pop();

    ///////////INTERACTION CODE//////////
    // Put conditional statements to move the game character below here

    if (hitByEnemy) {
        lives--;
        hitByEnemy = false; // Reset the hit flag
        // Reset the player position or add logic to respawn or end the game
        if (lives > 0) {
            // Reset player position or other actions
            gameChar_x = width / 2;
            gameChar_y = floorPos_y;
        } else {
            gameOver = true;
        }
    }



    if (isPlummeting) { // same as isPlummeting==true
        gameChar_y += 10;
        checkIsPlayerDead();
        return;
    }

    if (gameChar_y < floorPos_y) {
        // gameChar_y += 1;
        isFalling = true;
    } else {
        isFalling = false;
    }

    if (isLeft) {
        gameChar_x -= 5;
    } else if (isRight) {
        gameChar_x += 5;
    }



    // check if game character is in the range of the collectable
    checkIfGameCharInAnyCollectableRange();

    // check if game character is over the canyon
    checkIfGameCharIsOverAnyCanyons();

    //check if game char has reached flagpole
    checkIfGameCHarReachFlagpole();
    // check if char is under any platforms
    checkIfCharacterIsOnAnyPlatforms();
    // call if char is hit by enemy
    checkIfGameCharHitByAnyEnemy();
}

function checkIfCharacterIsOnAnyPlatforms() {
    if (isFalling) {
        var isContact = false;
        onPlatform = false;
        for (var i = 0; i < platforms.length; i++) {
            isContact = platforms[i].checkContact(gameChar_x, gameChar_y);
            if (isContact) {
                onPlatform = true;
                break;
            }
        }
        if (!isContact){
            gameChar_y += 1;
        }
    }
}

function checkIfGameCharIsOverAnyCanyons(){
    for (var i = 0; i < canyons.length; i++) {
        checkIfGameCharIsOverCanyon(canyons[i]);
    }
}

function checkIfGameCharIsOverCanyon(t_canyon) {
    // check if game char is on the floor    
    var cond1 = gameChar_y == floorPos_y;
    // check if game char is from the left of canyon 
    var cond2 = gameChar_x - gameChar_width / 2 > t_canyon.x_pos;
    // check if game char is from the right of canyon 
    var cond3 = gameChar_x + gameChar_width / 2 < t_canyon.x_pos + t_canyon.width;

    // check if game character is over the canyon
    if (cond1 && cond2 && cond3) {
        isPlummeting = true;
        falling.play();
    }
}

function drawGameCharStanding(){
    fill(121,13,13);
    rect(gameChar_x-7.5,gameChar_y - 43.5,15,25);
    fill(139,211,251);
    ellipse(gameChar_x,gameChar_y - 35.5,7,7);
    //legs
    fill(121,13,13);
    rect(gameChar_x-7.5,gameChar_y - 18.5,5,20);
    rect(gameChar_x + 2.5,gameChar_y - 18.5,5,20);
    fill(188,184,65);
    rect(gameChar_x-7.5,gameChar_y - 18.5,5,10);
    rect(gameChar_x + 2.5,gameChar_y - 18.5,5,10);
    //head
    fill(121,13,13);
    ellipse(gameChar_x, gameChar_y - 48.5, 15,15);
    fill(188,184,65);
    ellipse(gameChar_x, gameChar_y - 48.5,7.5,10);
    //arms
    fill(121,13,13);
    rect(gameChar_x-12.5,gameChar_y - 43.5,5,20);
    rect(gameChar_x + 7,gameChar_y -43.5,5,20);
    fill(188,184,65);
    rect(gameChar_x-12.5,gameChar_y - 43.5,5,10);
    rect(gameChar_x + 7,gameChar_y - 43.5,5,10);
    //eyes
    fill(139,211,251)
    ellipse(gameChar_x - 2, gameChar_y- 50.5, 3,3);
    ellipse(gameChar_x + 2, gameChar_y - 50.5,3,3);
}

function drawPlatforms(){
    for(var i=0;i<platforms.length;i++){
        platforms[i].draw();
    }
}



function drawCanyon() {
    for (var i = 0; i < canyons.length; i++) {
        fill(100, 155, 255);
        rect(canyons[i].x_pos, floorPos_y, canyons[i].width, height - floorPos_y);
        fill(234, 92, 15);
        rect(canyons[i].x_pos, floorPos_y + 75, canyons[i].width, height - floorPos_y);
    }
}

function checkIfGameCharHitByAnyEnemy(){

    if(hitByEnemy){
        return;
    }

    for(var i=0;i<enemies.length;i++){
        var isContact = enemies[i].checkContact(gameChar_x,gameChar_y);
        if(isContact){
            hitByEnemy = true;
            break;
        }
    }
}

function checkIfGameCharInAnyCollectableRange(){
    for (var i = 0; i < collectables.length; i++) {
        if (!collectables[i].isFound) {  // Only check if not already found
            checkIfGameCharInCollectableRange(collectables[i]);
        }
    }
}


function checkIfGameCharInCollectableRange(t_collectable){
    if (!t_collectable.isFound) {  // Only check if not already found
        var d = dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos);
        if (d < 30) {
            t_collectable.isFound = true;
            coin.play();
            // increment in game score
            game_score++;
        }
    }
}

function drawGameScore(){
    fill(0);
    textSize(30);
    text("Score:"+game_score,10,30);
}

function drawCollectables(){
    for (var i = 0; i < collectables.length; i++) {
        if (collectables[i].isFound == false) {
            fill(207, 239, 247);
            rectMode(CENTER);
            rect(collectables[i].x_pos,
                 collectables[i].y_pos,
                 collectables[i].size,
                 collectables[i].size);
            rectMode(CORNER);
        }
    }
}



function drawMountains(){
    for (var i = 0; i < mountains.length; i++) {
        fill(150);
        triangle(mountains[i].pos_x - mountains[i].width/2,mountains[i].pos_y+mountains[i].height/2,
                 mountains[i].pos_x,mountains[i].pos_y - mountains[i].height/2,
                 mountains[i].pos_x + mountains[i].width/2, mountains[i].pos_y + mountains[i].height/2);

    }
}


function animateClouds(){
    for (let i = 0; i < clouds.length; i++) {
        clouds[i].pos_x += 1; 
    }
}

function drawClouds(){
    for (let i = 0; i < clouds.length; i++) {
        fill(255);
        ellipse(clouds[i].pos_x,clouds[i].pos_y, clouds[i].size * 1.2, clouds[i].size * 1.2);
        ellipse(clouds[i].pos_x - 40,clouds[i].pos_y, clouds[i].size , clouds[i].size );
        ellipse(clouds[i].pos_x+40,clouds[i].pos_y, clouds[i].size , clouds[i].size );   
    }
}



function drawTrees(){
    for (let i = 0; i < trees_x.length; i++) {
        fill(120,100,40);
        var trees = trees_x[i];
        rectMode(CENTER);
        rect(trees, trees_y,40,100);
        fill(0,150,0);
        triangle(trees -80, trees_y -50,
                 trees, trees_y - 150,
                 trees + 80, trees_y - 50)
    }
}

function drawFlagpole(){
    fill(125);
    rect(flagpole.x_pos,floorPos_y - 400,30,400);
    fill(100);
    if(flagpole.isReached){
        rect(flagpole.x_pos,floorPos_y-400,100,50);
        image(flagLogo,flagpole.x_pos,floorPos_y-400,100,50);
    }else{
        fill(100);
        rect(flagpole.x_pos,floorPos_y-50,100,50);
        image(flagLogo,flagpole.x_pos,floorPos_y-50,100,50);
    }
}

function checkIfGameCHarReachFlagpole(){
    if(flagpole.isReached == false){
        var d = dist(gameChar_x,gameChar_y,flagpole.x_pos,floorPos_y)
        if(d<10){
            flagpole.isReached=true;
            //set gameOVer to true
            gameOver = true;
            levelComplete.play();

        }
    }
}

function checkIsPlayerDead(){
    if(gameChar_y>height){
        //decrement live
        lives--;
        //restart
        if(lives>0){
            init();
        }else{
            //set gameOver to true
            gameOver = true
        }
    }
}

function drawFire(){

    for(var i=0;i<emitters.length;i++){
        var emitter = emitters[i];
        var d = dist(gameChar_x,floorPos_y,emitter.pos.x,emitter.pos.y);
        if(d<width){
            emitter.drawAndUpdateParticles();
        }
    }
}

function drawLifeTokens(){
    fill(0);
    for(var i=0;i<lives;i++){
        fill(0);
        rect(40*i+906,10,3,3);
        fill(0);
        rect(40*i+909,10,3,3);
        fill(0);
        rect(40*i+915,10,3,3);
        fill(0);
        rect(40*i+918,10,3,3);
        // 2nd row
        fill(0);
        rect(40*i+903,13,3,3);
        fill(255,0,0);
        rect(40*i+906,13,3,3);
        fill(255,70,70);
        rect(40*i+909,13,3,3);
        fill(0);
        rect(40*i+912,13,3,3);
        fill(255,70,70);
        rect(40*i+915,13,3,3);
        fill(255,70,70);
        rect(40*i+918,13,3,3);
        fill(0);
        rect(40*i+921,13,3,3);
        // 3rd row
        fill(0);
        rect(40*i+900,16,3,3);
        fill(255,0,0);
        rect(40*i+903,16,3,3);
        fill(255);
        rect(40*i+906,16,3,3);
        fill(255,70,70);
        rect(40*i+909,16,3,3);
        fill(255,70,70);
        rect(40*i+912,16,3,3);
        fill(255,70,70);
        rect(40*i+915,16,3,3);
        fill(255,70,70);
        rect(40*i+918,16,3,3);
        fill(255,70,70);
        rect(40*i+921,16,3,3);
        fill(0);
        rect(40*i+924,16,3,3);
        // 4th row
        fill(0);
        rect(40*i+900,19,3,3);
        fill(255,70,70);
        rect(40*i+903,19,3,3);
        fill(255,70,70);
        rect(40*i+906,19,3,3);
        fill(255,70,70);
        rect(40*i+909,19,3,3);
        fill(255,70,70);
        rect(40*i+912,19,3,3);
        fill(255,70,70);
        rect(40*i+915,19,3,3);
        fill(255,70,70);
        rect(40*i+918,19,3,3);
        fill(255,50,50);
        rect(40*i+921,19,3,3);
        fill(0);
        rect(40*i+924,19,3,3);
        //5th row
        fill(255,0,0);
        rect(40*i+903,22,3,3);
        fill(255,70,70);
        rect(40*i+906,22,3,3);
        fill(255,70,70);
        rect(40*i+909,22,3,3);
        fill(255,70,70);
        rect(40*i+912,22,3,3);
        fill(255,70,70);
        rect(40*i+915,22,3,3);
        fill(255,50,50);
        rect(40*i+918,22,3,3);
        fill(255,0,0);
        rect(40*i+921,22,3,3);
        fill(0);
        rect(40*i+924,22,3,3);
        fill(0);
        rect(40*i+900,22,3,3);
        // 6th row
        fill(0);
        rect(40*i+903,25,3,3);
        fill(255,70,70);
        rect(40*i+906,25,3,3);
        fill(255,70,70);
        rect(40*i+909,25,3,3);
        fill(255,70,70);
        rect(40*i+912,25,3,3);
        fill(255,50,50);
        rect(40*i+915,25,3,3);
        fill(255,0,0);
        rect(40*i+918,25,3,3);
        fill(0);
        rect(40*i+921,25,3,3);
        // 7th row
        fill(0);
        rect(40*i+906,28,3,3);
        fill(255,70,70);
        rect(40*i+909,28,3,3);
        fill(255,50,50);
        rect(40*i+912,28,3,3);
        fill(255,0,0);
        rect(40*i+915,28,3,3);
        fill(0);
        rect(40*i+918,28,3,3);
        // 8th row
        fill(0);
        rect(40*i+909,31,3,3);
        fill(255,0,0);
        rect(40*i+912,31,3,3);
        fill(0);
        rect(40*i+915,31,3,3);
        //9th row
        fill(0);
        rect(40*i+912,34,3,3);

    }
}

function drawResetButton() {
    if (gameOver) {
        fill(255);
        rect(width/2 - 50, height/2 + 100, 100, 50);
        fill(0);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Reset", width/2, height/2 + 125);
        textAlign(LEFT, BASELINE);  // Reset text alignment
    }
}


function resetGame() {
    // Reset game variables
    lives = 3;
    gameOver = false;
    game_score = 0;

    // Reset flagpole
    flagpole.isReached = false;

    // Reset collectables
    setupCollectables();

    // Reset enemies
    enemies = [];
    enemies.push(createEnemy(1500,floorPos_y-30,100));
    enemies.push(createEnemy(300,floorPos_y-30,100));
    enemies.push(createEnemy(1750,floorPos_y-30,100));
    enemies.push(createEnemy(-100,floorPos_y-30,100));
    enemies.push(createEnemy(950,floorPos_y-30,100));
    enemies.push(createEnemy(100,floorPos_y-30,100));

    // Reset player position
    gameChar_x = width/2;
    gameChar_y = floorPos_y;

    // Reset other game states
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    onPlatform = false;
    hitByEnemy = false;

    // Reset collectables
    setupCollectables();


    // Restart background music
    bgSound.stop();
    bgSound.loop();
}


function drawGameOver(){
    fill(0);
    textSize(100);
    text("Game Over",250,height/2 -100);
    if(lives>0){
        text("You Win!",300,height/2);
    }else{
        text("You Lose!",300,height/2);
    }
}


function drawGround(){
    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, height, width - floorPos_y); // Draw some green ground
}

function manageBgAudio() {
    if (gameOver) {
        bgSound.stop();
    } else if (!bgSound.isPlaying()) {
        bgSound.loop();
    }
}






function keyPressed()
{
    //if game over dont detect anymore key
    if(gameOver){
        return;
    }
    // if statements to control the animation of the character when
    // keys are pressed.

    // open up the console to see how these work
    console.log("keyPressed: " + key);
    console.log("keyPressed: " + keyCode);

    if (keyCode == 37) {
        console.log("left arrow");
        isLeft = true;
        walking.play();
    }
    else if (keyCode == 39) {
        console.log("right arrow");
        isRight = true;
        walking.play();
    }
    else if (keyCode == 38) {
        // ensure that the character only jumps when it is touching the ground
        if (gameChar_y >= floorPos_y || onPlatform) {
            console.log("up arrow");
            gameChar_y -= 150;
            jumpSound.play();
        }
    }
}


function keyReleased()
{
    //if game over dont detect anymore key
    if(gameOver){
        return;
    }
    // if statements to control the animation of the character when
    // keys are released.

    console.log("keyReleased: " + key);
    console.log("keyReleased: " + keyCode);

    if (keyCode == 37) {
        console.log("left arrow");
        isLeft = false;
    } else if (keyCode == 39) {
        console.log("right arrow");
        isRight = false;
    }
}

function mousePressed() {
    if (gameOver) {
        // Check if mouse is over the reset button
        if (mouseX > width/2 - 50 && mouseX < width/2 + 50 &&
            mouseY > height/2 + 100 && mouseY < height/2 + 150) {
            resetGame();
        }
    }
}


//credits 
// sound - https://mixkit.co/
// png - pixilart.com