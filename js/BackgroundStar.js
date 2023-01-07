class BackgroundStar {

    constructor() {

        this.x = int(random(width));
        this.y = int(random(height));

        this.displayed = false;
    }

    update() {

        return;

        if (this.displayed) return;

        let pixel = starTrailLayer.pixels[((this.y*width)+this.x)*4];

        if (pixel == 1) {
            this.displayed = true;
        }
    }

    display() {

        if (this.displayed) {

        }
    }
}