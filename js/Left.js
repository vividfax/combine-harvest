class Left {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.radius = 50;

        this.dead = false;
    }

    update() {

        if (right.distance(this.x, this.y, right.outerRadius)) {
            this.x += controllerRX * 10;
            this.y += controllerRY * 10;
        } else if (!this.dead) {
            this.x += controllerLX * 5;
            this.y += controllerLY * 5;
        }
    }

    display() {

        noStroke();

        if (this.dead) fill(0);
        else fill(200);

        ellipse(this.x, this.y, this.radius);
    }
}