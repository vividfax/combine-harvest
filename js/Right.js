class Right {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.radius = 20;
        this.outerRadius = 200;
    }

    update() {

        this.x += controllerRX * 10;
        this.y += controllerRY * 10;
    }

    display() {

        stroke(0);
        noFill();
        ellipse(this.x, this.y, this.outerRadius);
        // fill(255);
        // ellipse(this.x, this.y, this.radius);
    }

    distance(x, y, d) {

        return dist(x, y, this.x, this.y) > d/2;
    }
}