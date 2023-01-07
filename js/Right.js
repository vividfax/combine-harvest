class Right {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.radius = 20;
        this.outerRadius = 150;
        this.bounds = this.outerRadius-40;
    }

    update() {

        this.x += controllerRX * 15;
        this.y += controllerRY * 15;
    }

    display() {

        objectLayer.stroke(200);
        objectLayer.noFill();

        for (let i = 0; i < orbiters.length; i++) {

            objectLayer.ellipse(this.x, this.y, orbiters[i].spacing);
        }
    }

    distance(x, y, d) {

        return dist(x, y, this.x, this.y) > d/2;
    }
}