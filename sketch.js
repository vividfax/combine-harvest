let left, right;
let collectables = [];
let enemies = [];

let numberCollected = 0;

function setup() {

    let w = windowWidth;
    let h = windowHeight;

    if (w > 900) w = 900;
    if (h > 900) h = 900;

    createCanvas(w, h);
    setupController();

    right = new Right(width/2, height/2);
    left = new Left(width/2, height/2);

    for (let i = 0; i < 10000; i++) {
        collectables.push(new Collectable(random(width), random(height)));
    }

    for (let i = 0; i < 7; i++) {
        enemies.push(new Enemy(random(width), random(height)));
    }
}

function draw() {

    butttonsPressed();
    stickMoved();

    background(112);

    for (let i = 0; i < collectables.length; i++) {
        collectables[i].update();
        collectables[i].display();
    }

    let percentCollected = round(numberCollected/collectables.length*100);
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(percentCollected + "%", width/2, height/2);

    right.update();
    right.display();
    left.update();
    left.display();

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update();
        enemies[i].display();
    }
}

function butttonsPressed() {

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