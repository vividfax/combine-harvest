class Left {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.radius = 20;
        this.actualSize = 0;

        this.dead = false;

        this.accelerationLX = 0;
        this.accelerationLY = 0;
        this.accelerationRX = 0;
        this.accelerationRY = 0;
    }

    update() {

        this.accelerationLX += controllerLX;
        this.accelerationLY += controllerLY;
        this.accelerationRX += controllerRX;
        this.accelerationRY += controllerRY;

        if (this.actualSize < this.radius) this.actualSize += 0.5;

        if (right.distance(this.x, this.y, right.bounds)) {
            this.x += this.accelerationRX;
            this.y += this.accelerationRY;
        } else if (!this.dead) {
            this.x += this.accelerationLX *.5;
            this.y += this.accelerationLY *.5;
        }

        this.accelerationLX *= 0.95;
        this.accelerationLY *= 0.95;
        this.accelerationRX *= 0.95;
        this.accelerationRY *= 0.95;
    }

    display() {

        let offsetX = random(-this.radius/100, this.radius/100);
        let offsetY = random(-this.radius/100, this.radius/100);

        if (this.dead) {
            offsetX = 0;
            offsetY = 0;
        }

        objectLayer.noStroke();

        if (this.dead) objectLayer.fill(0, 50);
        else objectLayer.fill(255, 100);

        objectLayer.ellipse(this.x + offsetX, this.y + offsetY, this.actualSize);

        if (this.dead) objectLayer.fill(0);
        else objectLayer.fill(255);

        objectLayer.ellipse(this.x + offsetX, this.y + offsetY, this.actualSize-8);

        if (!this.dead) {
            starTrailLayer.fill(1);
            starTrailLayer.ellipse(this.x, this.y, this.actualSize-9);
        }
    }
}