class BackgroundStar {

    constructor() {

        this.x = int(random(width));
        this.y = int(random(height));
    }

    update() {

        let pixel = starTrailLayer.pixels[((this.y*width)+this.x)*4+3];

        if (pixel == 0) {
            console.log('hjio')
        }
    }

    display() {

    }
}