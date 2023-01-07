class BackgroundStar {

    constructor() {

        this.x = int(random(width));
        this.y = int(random(height));

        this.displayed = false;
        this.doneDisplaying = false;
    }

    update() {

        if (this.displayed) return;

        let d = pixelDensity();

        let pixel = starTrailLayer.pixels[((this.y*width*d)+this.x)*8];

        if (pixel == 1) {
            this.displayed = true;
        }
    }

    display() {

        if (!this.doneDisplaying && this.displayed) {
            this.doneDisplaying = true;

            backgroundStarLayer.image(starImage, this.x, this.y, 15, 15);
        }
    }
}