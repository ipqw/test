import { randomInt } from "../index.js";

export class Battery {
    x = 1550;
    y = randomInt(50, 750);
    height = 40;
    width = 40;
    speed = 3;
    isDestroyed = false;
    draw = (ctx) => {
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    };
    update = (ctx) => {
        if (!this.isDestroyed) {
            this.x -= 1 * this.speed;
            this.draw(ctx);
        }
    };
}
