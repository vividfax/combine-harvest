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
            numberUntilNextOrbiter++;

            if (left.radius < 80) {
                left.radius += 0.01;
            }

            if (numberUntilNextOrbiter >= numberOfCollectables/10) {
                numberUntilNextOrbiter = 0;
                orbiters.push(new Orbiter(orbiters.length));
                enemies.push(new Enemy());
            }
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