class BackgroundStar {

    constructor() {

        this.x = int(random(width));
        this.y = int(random(height));

        this.displayed = false;

        this.offset = random(100);
        this.speed = random(0.5, 1);
    }

    update() {

        if (this.displayed) return;

        if (dist(left.x, left.y, this.x, this.y) < 30) this.displayed = true;
    }

    display() {

        let starScale = cos((frameCount+this.offset) / 10*this.speed);

        if (this.displayed) {
            backgroundStarLayer.tint(255, 255);
        } else {
            backgroundStarLayer.tint(255, 100);
        }
        backgroundStarLayer.image(starImage, this.x, this.y, 30*starScale, 30*starScale);
    }
}