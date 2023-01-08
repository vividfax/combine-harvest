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
            if (!won && left.dead == false) {
                left.dead = true;
                showFailUI = true;
                sunDeathSound.pause();
                sunDeathSound.currentTime = 0;
                sunDeathSound.play();
            }
            if (!left.dead) left.radius += 0.1;
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        if (random() < 0.01) {
            this.velocityX = random(-this.maxVelocity, this.maxVelocity);
            this.velocityY = random(-this.maxVelocity, this.maxVelocity);
        }

        let padding = 25;

        if (this.x > width-padding - this.radius/2 && this.velocityX > 0) {
            this.velocityX *= -1;
        } else if (this.x < 0+padding + this.radius/2 && this.velocityX < 0) {
            this.velocityX *= -1;
        }

        if (this.y > height-padding - this.radius/2 && this.velocityY > 0) {
            this.velocityY *= -1;
        } else if (this.y < 0+padding + this.radius/2 && this.velocityY < 0) {
            this.velocityY *= -1;
        }

        if (left.dead) return;

        for (let i = 0; i < orbiters.length; i++) {

            let orbiter = orbiters[i];
            if (dist(orbiter.x, orbiter.y, this.x, this.y) < orbiter.radius/2 + this.radius/2) {
                this.dead = true;
                enemies.push(new Enemy());

                let soundInt = int(random(4));

                while (soundInt == cometSoundCache || soundInt == cometSoundCache2) {
                    soundInt = int(random(4));
                }

                cometSounds[soundInt].play();

                cometSoundCache2 = cometSoundCache;
                cometSoundCache = soundInt;
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