let left, right;
let collectables = [];
let enemies = [];
let orbiters = [];
let backgroundStars = [];

let numberCollected = 0;
let numberOfCollectables = 10000;
let numberUntilNextOrbiter = 0;

let objectLayer;
let starTrailLayer;
let backgroundStarLayer;
let progressMetreLayer;

let vignette;

let gradLocations = [
    0,
    0.3,
    0.45,
    0.5,
    0.6,
    0.7,
    1.0
];
let currentPalette;

function preload() {

    vignette = loadImage("/images/vingette.png");
}

function setup() {

    let w = windowWidth;
    let h = windowHeight;

    if (w > 900) w = 900;
    if (h > 900) h = 900;

    createCanvas(w, h);
    objectLayer = createGraphics(w, h);
    starTrailLayer = createGraphics(w, h);
    backgroundStarLayer = createGraphics(w, h);
    progressMetreLayer = createGraphics(w, h);

    setupController();
    currentPalette = palette0;
    setupBackground();

    right = new Right(width/2, height/2);
    left = new Left(width/2, height/2);

    for (let i = 0; i < numberOfCollectables; i++) {
        collectables.push(new Collectable(random(width), random(height)));
    }

    for (let i = 0; i < 7; i++) {
        enemies.push(new Enemy());
    }

    for (let i = 0; i < 1; i++) {
        orbiters.push(new Orbiter(i));
    }

    for (let i = 0; i < 50; i++) {
        backgroundStars.push(new BackgroundStar());
    }

    let resetButton = createButton("Reset");
    resetButton.position(10, 10);
    resetButton.mousePressed(reset);
}

function draw() {

    buttonsPressed();
    stickMoved();

    updatePixels();

    objectLayer.clear();

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

    left.update();
    left.display();

    updateProgressMetre();

    drawStars();

    image(starTrailLayer, 0, 0);
    image(backgroundStarLayer, 0, 0);
    image(objectLayer, 0, 0);
    image(vignette, 0, 0, width, height);
    image(progressMetreLayer, 0, 0);
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

    let perlinScale = 0.01;
    noiseSeed(random(1000000));

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {

          let perlin = noise(i*perlinScale, j*perlinScale);
          let col;
          let colourA;
          let colourB;

          //A - B
          if (perlin < gradLocations[1]){
            colourA = color(currentPalette.gradA);
            colourB = color(currentPalette.gradB);
            perlin = map(perlin, 0, gradLocations[1], 0, 1);
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
          }else{
            colourA = color(currentPalette.gradF);
            colourB = color(currentPalette.gradF);
            perlin = map(perlin, gradLocations[5], 1.0, 0, 1);
          }

          col = lerpColor(colourA, colourB, perlin);
          set(i, j, color(col));
        }
      }

    updatePixels();
}

function updateProgressMetre() {

    let percentCollected = numberCollected/numberOfCollectables*100;

    let padding = 10

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

    numberCollected = 0;
    numberUntilNextOrbiter = 0;
    collectables = [];
    enemies = [];
    orbiters = [];

    left = new Left(width/2, height/2);
    right = new Right(width/2, height/2);

    for (let i = 0; i < numberOfCollectables; i++) {
        collectables.push(new Collectable(random(width), random(height)));
    }

    for (let i = 0; i < 7; i++) {
        enemies.push(new Enemy());
    }

    for (let i = 0; i < 1; i++) {
        orbiters.push(new Orbiter(i));
    }

    setupBackground();
    starTrailLayer.clear();
    backgroundStarLayer.clear();
    progressMetreLayer.clear();
}

function drawStars() {

    starTrailLayer.loadPixels();

    for (let i = 0; i < backgroundStars.length; i++) {

        backgroundStars[i].update();
        backgroundStars[i].display();
    }
}