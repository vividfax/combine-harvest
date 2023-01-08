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

        this.checkDist(left.x, left.y, left.radius);

        // for (let i = 0; i < orbiters.length; i++) {

        //     this.checkDist(orbiters[i].x, orbiters[i].y, orbiters[i].radius);
        // }
    }

    display() {

        if (this.collected) return;

        noFill();
        noStroke();
        fill(255, 255, 255, 10);
        ellipse(this.x, this.y, this.radius);
    }

    checkDist(x, y, radius) {

        if (dist(x, y, this.x, this.y) < this.radius/2 + radius/2) {
            this.collected = true;
            numberCollected++;
            numberUntilNextOrbiter++;

            // if (left.radius < 80) {
                left.radius += 0.01;
            // }

            if (numberUntilNextOrbiter >= numberOfCollectables/10) {
                numberUntilNextOrbiter = 0;
                orbiters.push(new Orbiter(orbiters.length));
                enemies.push(new Enemy());
                newOrbiterSound.pause();
                newOrbiterSound.currentTime = 0;
                newOrbiterSound.play();
            }
        }

    }
}