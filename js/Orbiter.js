class Orbiter {

    constructor(num) {

        this.num = num;

        this.radius = 15;
        this.actualSize = 0;

        this.spacingSize = 40*this.num;
        this.actualSpacingSize = this.spacingSize-40;

        if (this.num == 0) this.actualSpacingSize = 0;

        this.spacing = 0;

        this.degree = random(360);
        if (this.num%2 == 1) this.direction = 1;
        else this.direction = -1;

        this.x = 0;
        this.y = 0;

        this.speed = 6;

        right.bounds += 40;
    }

    update() {

        // let acc = abs(left.accelerationLX) + abs(left.accelerationLY);
        // acc = 10-acc;
        // this.speed = 6 + acc;

        if (this.num == 0 && this.actualSpacingSize < right.outerRadius) {
            this.actualSpacingSize += 5;
            this.spacing = this.actualSpacingSize;
        } else if (this.actualSpacingSize < this.spacingSize) {
            this.actualSpacingSize += .8;
            this.spacing = this.actualSpacingSize + right.outerRadius;
        }


        if (this.actualSize < this.radius) this.actualSize += 0.5;

        this.degree += this.speed * this.direction * 1/this.spacing;

        let vec = createVector(right.x, right.y);
        vec.setHeading(this.degree);
        vec.normalize();
        vec.mult(this.spacing/2);

        this.x = vec.x + right.x;
        this.y = vec.y + right.y;

        if (this.x > width) this.x -= width;
        else if (this.x < 0) this.x += width;
        if (this.y > height) this.y -= height;
        else if (this.y < 0) this.y += height;
    }

    display() {

        objectLayer.drawingContext.setLineDash([13, 13]);
        objectLayer.fill(255);
        objectLayer.ellipse(this.x, this.y, this.actualSize);
        objectLayer.ellipse(this.x-width, this.y, this.actualSize);
        objectLayer.ellipse(this.x+width, this.y, this.actualSize);
        objectLayer.ellipse(this.x, this.y-height, this.actualSize);
        objectLayer.ellipse(this.x, this.y+height, this.actualSize);
        objectLayer.fill(50);
        objectLayer.ellipse(this.x, this.y, this.actualSize*.9);
        objectLayer.ellipse(this.x-width, this.y, this.actualSize*.9);
        objectLayer.ellipse(this.x+width, this.y, this.actualSize*.9);
        objectLayer.ellipse(this.x, this.y-height, this.actualSize*.9);
        objectLayer.ellipse(this.x, this.y+height, this.actualSize*.9);

        // if (!left.dead) {
        //     starTrailLayer.fill(0);
        //     starTrailLayer.ellipse(this.x, this.y, this.actualSize-9);
        // }
    }
}