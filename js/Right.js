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
    }

    display() {

        objectLayer.stroke(200, 100);
        objectLayer.strokeWeight(3);
        objectLayer.noFill();

        for (let i = 0; i < orbiters.length; i++) {

            objectLayer.ellipse(this.x, this.y, orbiters[i].spacing);
        }
    }

    distance(x, y, d) {

        return dist(x, y, this.x, this.y) > d/2;
    }
}