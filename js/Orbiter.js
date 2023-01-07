class Orbiter {

    constructor(num) {

        this.num = num;

        this.radius = 15;
        this.spacing = num*40 + right.outerRadius;

        this.degree = random(360);
        if (num%2 == 1) this.direction = 1;
        else this.direction = -1;

        this.x = 0;
        this.y = 0;

        right.bounds += 40;
    }

    update() {

        this.degree += 4 * this.direction * 1/this.spacing;

        let vec = createVector(right.x, right.y);
        vec.setHeading(this.degree);
        vec.normalize();
        vec.mult(this.spacing/2);

        this.x = vec.x + right.x;
        this.y = vec.y + right.y;
    }

    display() {

        objectLayer.fill(150);
        objectLayer.ellipse(this.x, this.y, this.radius);
    }
}