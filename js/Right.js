class Right {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.radius = 20;
        this.outerRadius = 150;
        this.bounds = this.outerRadius-40;

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

        // this.x += this.accelerationRX;
        // this.y += this.accelerationRY;

        if (dist(left.x, left.y, this.x, this.y) < this.bounds/2) {
            this.x += this.accelerationRX;
            this.y += this.accelerationRY;
        } else {
            this.x += this.accelerationLX;
            this.y += this.accelerationLY;
        }

        this.accelerationLX *= 0.95;
        this.accelerationLY *= 0.95;
        this.accelerationRX *= 0.95;
        this.accelerationRY *= 0.95;

        if (this.x > width) this.x -= width;
        if (this.x < 0) this.x += width;
        if (this.y > height) this.y -= height;
        if (this.y < 0) this.y += height;

        let leftV = createVector(left.x, left.y);
        let rightV = createVector(this.x, this.y);
        let thisV = p5.Vector.lerp(leftV, rightV, 0.95);

        this.x = thisV.x;
        this.y = thisV.y;

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