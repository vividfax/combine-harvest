class Left {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.radius = 20;
        this.actualSize = 0;

        this.dead = false;
    }

    update() {

        if (this.actualSize < this.radius) this.actualSize += 0.5;

        if (right.distance(this.x, this.y, right.bounds)) {
            this.x += controllerRX * 15;
            this.y += controllerRY * 15;
        } else if (!this.dead) {
            this.x += controllerLX * 7.5;
            this.y += controllerLY * 7.5;
        }
    }

    display() {

        objectLayer.noStroke();

        if (this.dead) objectLayer.fill(0, 50);
        else objectLayer.fill(255, 100);

        objectLayer.ellipse(this.x, this.y, this.actualSize);

        if (this.dead) objectLayer.fill(0);
        else objectLayer.fill(255);

        objectLayer.ellipse(this.x, this.y, this.actualSize-8);


        if (!this.dead) {
            starTrailLayer.fill(0);
            starTrailLayer.ellipse(this.x, this.y, this.actualSize-2);
        }
    }
}