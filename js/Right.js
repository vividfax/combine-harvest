class Right {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.radius = 20;
        this.outerRadius = 150;
        this.bounds = this.outerRadius-40;

        this.accelerationRX = 0;
        this.accelerationRY = 0;
    }

    update() {

        this.accelerationRX += controllerRX;
        this.accelerationRY += controllerRY;

        this.x += this.accelerationRX;
        this.y += this.accelerationRY;

        this.accelerationRX *= 0.95;
        this.accelerationRY *= 0.95;

        if (this.x > width) this.x -= width;
        if (this.x < 0) this.x += width;
        if (this.y > height) this.y -= height;
        if (this.y < 0) this.y += height;
    }

    display() {

        objectLayer.stroke(200, 100);
        objectLayer.strokeWeight(3);
        objectLayer.noFill();

        for (let i = 0; i < orbiters.length; i++) {

            objectLayer.ellipse(this.x, this.y, orbiters[i].spacing);
            objectLayer.ellipse(this.x-width, this.y, orbiters[i].spacing);
            objectLayer.ellipse(this.x+width, this.y, orbiters[i].spacing);
            objectLayer.ellipse(this.x, this.y-height, orbiters[i].spacing);
            objectLayer.ellipse(this.x, this.y+height, orbiters[i].spacing);
        }
    }

    distance(x, y, d) {

        return dist(x, y, this.x, this.y) > d/2;
    }
}