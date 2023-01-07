class Enemy {

    constructor() {

        let x = random(width);
        let y = random(height);

        while (dist(left.x, left.y, x, y) < 300) {
            x = random(width);
            y = random(height);
        }

        this.x = x;
        this.y = y;

        this.radius = 20;
        this.actualSize = 0;

        this.maxVelocity = 2.5;

        this.velocityX = random(-this.maxVelocity, this.maxVelocity);
        this.velocityY = random(-this.maxVelocity, this.maxVelocity);

        this.dead = false;
    }

    update() {

        if (this.actualSize < this.radius) this.actualSize += 0.5;

        if (this.dead) return;

        if (dist(this.x, this.y, left.x, left.y) < this.radius/2 + left.radius/2) {
            if (!won) {
                left.dead = true;
            }
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        if (random() < 0.01) {
            this.velocityX = random(-this.maxVelocity, this.maxVelocity);
            this.velocityY = random(-this.maxVelocity, this.maxVelocity);
        }

        if (this.x > width - this.radius/2 && this.velocityX > 0) {
            this.velocityX *= -1;
        } else if (this.x < 0 + this.radius/2 && this.velocityX < 0) {
            this.velocityX *= -1;
        }

        if (this.y > height - this.radius/2 && this.velocityY > 0) {
            this.velocityY *= -1;
        } else if (this.y < 0 + this.radius/2 && this.velocityY < 0) {
            this.velocityY *= -1;
        }

        for (let i = 0; i < orbiters.length; i++) {

            let orbiter = orbiters[i];
            if (dist(orbiter.x, orbiter.y, this.x, this.y) < orbiter.radius/2 + this.radius/2) {
                this.dead = true;
                enemies.push(new Enemy());
            }
        }
    }

    display() {

        if (this.dead) return;

        let vec = createVector(this.x - left.x, this.y - left.y);
        let heading = degrees(vec.heading())+90;

        objectLayer.push();
        objectLayer.translate(this.x, this.y);
        objectLayer.rotate(heading);
        objectLayer.imageMode(CENTER);
        // objectLayer.noStroke();
        // objectLayer.fill(100, 0, 0);
        // objectLayer.ellipse(this.x, this.y, this.actualSize);
        objectLayer.image(cometImage, 0, 0, this.actualSize*3, this.actualSize*3);
        objectLayer.pop();
    }
}