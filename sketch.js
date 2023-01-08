let won = false;

let left, right;
let collectables = [];
let enemies = [];
let orbiters = [];
let backgroundStars = [];
let smallBackgroundStars = [];

let numberCollected = 0;
let numberOfCollectables = 5000;
let numberUntilNextOrbiter = 0;
let numberOfEnemies = 5;

let objectLayer;
let starTrailLayer;
let backgroundStarLayer;
let smallBackgroundStarLayer;
let progressMetreLayer;

let vignette;
let starImage;
let cometImage;
let cometImage2;

let regularFont;

let currentPalette;
let palettes;
let gradLocations = [
    0,
    0.2,
    0.33,
    0.35,
    0.4,
    0.6,
    1.0
];

let music;
let cometSounds = [];
let sunDeathSound;
let sunSpawnSound;
let newOrbiterSound;
let gameWinSound;
let supernovaSound0;
let supernovaSound1;

let cometSoundCache = -1;
let player;
let pitchShift;
let sunVolume;

let showFailUI = false;
let showWinUI = false;
let showIntro = true;
let showSupernovaScene = false;

let supernovaSceneTime = 0;

let invincible = false;
let winGame = false;

let musicVolume = 0;

function preload() {

    vignette = loadImage("./images/vingette.png");
    starImage = loadImage("./images/star.png");
    cometImage = loadImage("./images/comet.png");
    cometImage2 = loadImage("./images/comet2.png");

    regularFont = loadFont("./fonts/AtkinsonHyperlegible-Regular.ttf");

    music = new Audio("./sounds/music.ogg");
    music.volume = musicVolume;
    music.loop = true;

    for (let i = 0; i < 4; i++) {

        let num = i+1;
        let sound = new Audio("./sounds/Comet_Musical" + num + ".wav");
        sound.volume = .7;
        cometSounds.push(sound);
    }

    sunDeathSound = new Audio("./sounds/Sun_Death.wav");
    sunSpawnSound = new Audio("./sounds/Sun_Spawn.wav");
    newOrbiterSound = new Audio("./sounds/Sun_NewOrbit.wav");
    newOrbiterSound.volume = .3;
    gameWinSound = new Audio("./sounds/GameWin.wav");
    gameWinSound.volume = .5;
    supernovaSound0 = new Audio("./sounds/Supernova_1.wav");
    supernovaSound1 = new Audio("./sounds/Supernova_2.wav");

    player = new Tone.Player("./sounds/Sun_MovementLoop.wav").toDestination();
    player.loop = true;

    pitchShift = new Tone.PitchShift({
        pitch: 0
    }).toDestination();

    sunVolume = new Tone.Volume([ volume = 0 ]).toDestination();

    player.connect(pitchShift);
    player.connect(sunVolume);

    palettes = loadJSON("./json/galaxyPalettes.json");
}

function setup() {

    let w = windowWidth;
    let h = windowHeight;

    if (w > 900) w = 900;
    if (h > 900) h = 900;

    if (w > h) w = h;
    else if (h > w) h = w;

    createCanvas(w, h);
    objectLayer = createGraphics(w, h);
    starTrailLayer = createGraphics(w, h);
    backgroundStarLayer = createGraphics(w, h);
    smallBackgroundStarLayer = createGraphics(w, h);
    progressMetreLayer = createGraphics(w, h);

    frameRate(50);
    backgroundStarLayer.imageMode(CENTER);
    objectLayer.angleMode(DEGREES);
    rectMode(CENTER);
    textFont(regularFont);

    setupController();
    palettes = palettes.palettes;
    setupBackground();

    right = new Right(width/2, height/2);
    left = new Left(width/2, height/2);

    for (let i = 0; i < numberOfCollectables; i++) {
        collectables.push(new Collectable(random(width), random(height)));
    }

    for (let i = 0; i < numberOfEnemies; i++) {
        enemies.push(new Enemy());
    }

    for (let i = 0; i < 1; i++) {
        orbiters.push(new Orbiter(i));
    }

    for (let i = 0; i < 12; i++) {
        backgroundStars.push(new BackgroundStar());
    }

    for (let i = 0; i < 500; i++) {
        smallBackgroundStars.push(new SmallBackgroundStar());
    }
}

function draw() {

    buttonsPressed();
    stickMoved();

    if (showIntro) {
        displayIntroUI();
        return;
    } else {
        if (musicVolume < 0.5) {
            musicVolume += 0.005;
            music.volume = musicVolume;
        }
    }

    updatePixels();

    objectLayer.clear();
    smallBackgroundStarLayer.clear();
    backgroundStarLayer.clear();

    for (let i = 0; i < collectables.length; i++) {
        collectables[i].update();
        // collectables[i].display();
    }

    right.update();
    right.display();

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update();
        enemies[i].display();
    }

    for (let i = 0; i < orbiters.length; i++) {
        orbiters[i].update();
        orbiters[i].display();
    }

    for (let i = 0; i < smallBackgroundStars.length; i++) {
        smallBackgroundStars[i].display();
    }

    drawStars();

    left.update();
    left.display();

    updateProgressMetre();

    image(starTrailLayer, 0, 0);
    image(smallBackgroundStarLayer, 0, 0);
    image(backgroundStarLayer, 0, 0);
    image(objectLayer, 0, 0);
    image(vignette, 0, 0, width, height);
    image(progressMetreLayer, 0, 0);
    displayResetUI();
    displaySupernovaScene();

    if (showFailUI && !showSupernovaScene) {
        if (keyIsDown(88)) {
            reset();
        }
        if (aButtonPressed(2)) {
            reset();
        }
    }

    if ((showWinUI && !showSupernovaScene)) {
        if (keyIsDown(88)) {
            supernovaSceneTime = 0;
            showSupernovaScene = true;
            supernovaSound0.play();
        }
        if (aButtonPressed(2)) {
            supernovaSceneTime = 0;
            showSupernovaScene = true;
            supernovaSound0.play();
        }
    }
}

function displayResetUI() {

    if ((!showFailUI && !showWinUI) || showSupernovaScene) return;

    let uiText = "[x] rebirth";

    if (showWinUI) fill(255);
    else if (showFailUI) fill(0);

    noStroke();
    rect(width/2, height/2, 200, 60, 80);

    if (showWinUI) fill(0);
    else if (showFailUI) fill(255);

    textSize(25);
    textAlign(CENTER, CENTER);
    text(uiText, width/2, height/2-5);
}

function displayIntroUI() {

    if (keyIsDown(88) || aButtonPressed(2)) {
        showIntro = false;
        sunSpawnSound.play();
        music.play();
        player.start();
        Tone.start();
        return;
    }

    clear();
    background(0);

    let uiText = "- harvest stellar dust to feed a newborn star -\n- beware curious comets -\n- planetoids provide protection -";
    let uiTopText = "[play with controller or keyboard]";
    let uiBottomText = "[x] continue";

    textSize(25);
    textAlign(CENTER, BASELINE);
    fill(255);
    text(uiText, width/2, height/2-35);

    textAlign(CENTER, CENTER);
    fill(80);
    text(uiTopText, width/2, 50);
    text(uiBottomText, width/2, height-50);
}

function displaySupernovaScene() {

    if (!showSupernovaScene) return;

    let x = 50;
    let y = 10;

    if (supernovaSceneTime < 50) {

        noStroke();
        fill(255);
        ellipse (left.x + sin(frameCount*20)*5, left.y + cos(frameCount*20)*5,left.radius +supernovaSceneTime*2);

    } else {

        if (supernovaSceneTime == 50) {
            supernovaSound1.play();
        }

        stroke(255, 255*.5);
        strokeWeight(40);
        noFill();
        ellipse(left.x, left.y, 50 * (supernovaSceneTime-50)*3);

        noStroke();
        fill(255, 255);
        x += (supernovaSceneTime-50) * 20 * (supernovaSceneTime-50);
        y -= (supernovaSceneTime-50)*0.1 * (y*2 * (supernovaSceneTime-50));
        ellipse(left.x, left.y, x, y);
    }

    supernovaSceneTime++;

    if (supernovaSceneTime > 50*2) {

        reset();
        showSupernovaScene = false;
    }
}

function buttonsPressed() {

    let strength = 0.27;

    if (keyIsDown(LEFT_ARROW)) {
        controllerRX = -strength;
    } else if (keyIsDown(RIGHT_ARROW)) {
        controllerRX = strength;
    } else {
        controllerRX = 0;
    }

    if (keyIsDown(UP_ARROW)) {
        controllerRY = -strength;
    } else if (keyIsDown(DOWN_ARROW)) {
        controllerRY = strength;
    } else {
        controllerRY = 0;
    }

    if (keyIsDown(65)) {
        controllerLX = -strength;
    } else if (keyIsDown(68)) {
        controllerLX = strength;
    } else {
        controllerLX = 0;
    }

    if (keyIsDown(87)) {
        controllerLY = -strength;
    } else if (keyIsDown(83)) {
        controllerLY = strength;
    } else {
        controllerLY = 0;
    }
}

function setupBackground() {

    currentPalette = random(palettes);

    let perlinScale = 0.007;
    noiseSeed(random(1000000));

    loadPixels();

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {

          let perlin = noise(i*perlinScale, j*perlinScale);
          let col;
          let colourA;
          let colourB;

          //A - B
            if (perlin < gradLocations[0]) {
                colourA = color(currentPalette.gradC);
                colourB = color(currentPalette.gradC);
                perlin = map(perlin, 0, gradLocations[0], 0, 1);
            }

          else if (perlin > gradLocations[0] && perlin < gradLocations[1]){
            colourA = color(currentPalette.gradC);
            colourB = color(currentPalette.gradB);
            perlin = map(perlin, gradLocations[0], gradLocations[1], 0, 1);
          }

          //B - C
          else if (perlin > gradLocations[1] && perlin < gradLocations[2]){
            colourA = color(currentPalette.gradB);
            colourB = color(currentPalette.gradC);
            perlin = map(perlin, gradLocations[1], gradLocations[2], 0, 1);
          }

          //edge glow
          else if (perlin > gradLocations[2] && perlin < gradLocations[3]){
            colourA = color(currentPalette.colourEdge);
            colourB = color(currentPalette.gradD);
            perlin = map(perlin, gradLocations[2], gradLocations[3], 0, 1);
          }

          //D - E
          else if (perlin > gradLocations[3] && perlin < gradLocations[4]){
            colourA = color(currentPalette.gradD);
            colourB = color(currentPalette.gradE);
            perlin = map(perlin, gradLocations[3], gradLocations[4], 0, 1);
          //E - F
          }else if (perlin > gradLocations[4] && perlin < gradLocations[5]){
            colourA = color(currentPalette.gradE);
            colourB = color(currentPalette.gradF);
            perlin = map(perlin, gradLocations[4], gradLocations[5], 0, 1);
          //F
          } else if (perlin < gradLocations[6]) {
            colourA = color(currentPalette.gradF);
            colourB = color(currentPalette.gradE);
            perlin = map(perlin, gradLocations[5], gradLocations[6], 0, 1);
          } else {
            colourA = color(currentPalette.gradE);
            colourB = color(currentPalette.gradE);
            perlin = map(perlin, gradLocations[6], 1.0, 0, 1);
          }

          col = lerpColor(colourA, colourB, perlin);

            set(i, j, color(col));

        //   let pixel = (width*2*j + i)*4;
        //   pixels[pixel] = red(col);
        //   pixels[pixel+1] = green(col);
        //   pixels[pixel+2] = blue(col);
        //   pixels[pixel+3] = alpha(col);
        }
    }
}

function updateProgressMetre() {

    let percentCollected = (numberCollected/numberOfCollectables*100)+1;

    if (((round(percentCollected) >= 100) || winGame) && !won) {
        won = true;
        showWinUI = true;
        gameWinSound.play();
    }

    let padding = 10;

    let w = width - padding*2;
    let h = height - padding*2;

    let metre = percentCollected%25;

    progressMetreLayer.stroke(255);
    progressMetreLayer.strokeWeight(3);

    progressMetreLayer.line(
        padding,
        padding,
        padding+w*(metre/25),
        padding
    );

    if (percentCollected >= 25) progressMetreLayer.line(
        padding+w,
        padding,
        padding+w,
        padding+h*(metre/25)
    );
    if (percentCollected >= 50) progressMetreLayer.line(
        width-padding,
        height-padding,
        width-padding - w*(metre/25),
        height-padding
    );
    if (percentCollected >= 75) progressMetreLayer.line(
        padding,
        padding+h,
        padding,
        height-padding - h*(metre/25)
    );
}

function reset() {

    won = false;
    winGame = false;

    numberCollected = 0;
    numberUntilNextOrbiter = 0;
    collectables = [];
    enemies = [];
    orbiters = [];
    backgroundStars = [];
    smallBackgroundStars = [];

    left = new Left(width/2, height/2);
    right = new Right(width/2, height/2);

    for (let i = 0; i < numberOfCollectables; i++) {
        collectables.push(new Collectable(random(width), random(height)));
    }

    for (let i = 0; i < numberOfEnemies; i++) {
        enemies.push(new Enemy());
    }

    for (let i = 0; i < 1; i++) {
        orbiters.push(new Orbiter(i));
    }

    for (let i = 0; i < 12; i++) {
        backgroundStars.push(new BackgroundStar());
    }

    for (let i = 0; i < 500; i++) {
        smallBackgroundStars.push(new SmallBackgroundStar());
    }

    setupBackground();
    starTrailLayer.clear();
    backgroundStarLayer.clear();
    progressMetreLayer.clear();

    showFailUI = false;
    showWinUI = false;

    sunSpawnSound.play();
}

function drawStars() {

    starTrailLayer.loadPixels();

    for (let i = 0; i < backgroundStars.length; i++) {

        backgroundStars[i].update();
        backgroundStars[i].display();
    }
}