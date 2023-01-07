class Collectable {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.radius = 10;

        this.collected = false;
    }

    update() {

        if (this.collected) return;
        if (left.dead) return;

        if (dist(left.x, left.y, this.x, this.y) < this.radius/2 + left.radius/2) {
            this.collected = true;
            numberCollected++;
        }
    }

    display() {

        if (this.collected) return;

        noFill();
        noStroke();
        fill(255, 255, 255, 10);
        rect(this.x, this.y, this.radius);
    }
}