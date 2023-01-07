class Enemy {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.radius = 20;

        this.maxVelocity = 3;

        this.velocityX = random(-this.maxVelocity, this.maxVelocity);
        this.velocityY = random(-this.maxVelocity, this.maxVelocity);
    }

    update() {

        if (dist(this.x, this.y, left.x, left.y) < this.radius/2 + left.radius/2) {
            left.dead = true;
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
    }

    display() {

        fill(100, 0, 0);
        ellipse(this.x, this.y, this.radius);
    }
}