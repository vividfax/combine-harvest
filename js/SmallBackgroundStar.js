class SmallBackgroundStar {

    constructor() {

        this.x = random(width);
        this.y = random(height);

        this.offset = random(100);
        this.speed = random(0.5, 1);
    }

    display() {

        let starScale = cos((frameCount+this.offset) / 10*this.speed)+2;

        smallBackgroundStarLayer.fill(255, 50*starScale*2);
        smallBackgroundStarLayer.noStroke();
        smallBackgroundStarLayer.ellipse(this.x, this.y, 2);
    }
}