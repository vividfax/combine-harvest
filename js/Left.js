class Left {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.radius = 40;
        this.actualSize = 0;

        this.dead = false;

        this.accelerationLX = 0;
        this.accelerationLY = 0;
        this.accelerationRX = 0;
        this.accelerationRY = 0;
    }

    update() {

        if (!this.dead) {
            this.accelerationLX += controllerLX;
            this.accelerationLY += controllerLY;
            this.accelerationRX += controllerRX;
            this.accelerationRY += controllerRY;
        }

        if (this.actualSize < this.radius) this.actualSize += 0.5;

        // if (right.distance(this.x, this.y, right.bounds)) {
            // this.x += this.accelerationRX;
            // this.y += this.accelerationRY;
        // } else if (!this.dead) {
            this.x += this.accelerationLX;
            this.y += this.accelerationLY;
        // }

        this.accelerationLX *= 0.95;
        this.accelerationLY *= 0.95;
        this.accelerationRX *= 0.95;
        this.accelerationRY *= 0.95;

        if (this.x > width) this.x -= width;
        if (this.x < 0) this.x += width;
        if (this.y > height) this.y -= height;
        if (this.y < 0) this.y += height;

        let acc = abs(this.accelerationLX) + abs(this.accelerationLY);
        let volume = map(acc, 0, 10, -30, -8);
        player.volume.value = volume;
        let pitch = acc*2-10;

        pitchShift.pitch = pitch;
    }

    display() {

        let offsetX = random(this.radius*.01);
        let offsetY = random(this.radius*.01);

        if (this.dead) {
            offsetX = 0;
            offsetY = 0;
        }

        objectLayer.noStroke();

        if (this.dead) objectLayer.fill(0, 50);
        else objectLayer.fill(255, 100);

        objectLayer.ellipse(this.x + offsetX, this.y + offsetY, this.actualSize+10 + this.actualSize*.1);

        if (this.dead) objectLayer.fill(0);
        else objectLayer.fill(255);

        objectLayer.ellipse(this.x + offsetX, this.y + offsetY, this.actualSize);

        if (!this.dead) {
            starTrailLayer.fill(0);
            starTrailLayer.ellipse(this.x, this.y, this.actualSize-1);
        }
    }
}