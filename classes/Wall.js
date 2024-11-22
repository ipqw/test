import { randomInt } from "../index.js";

export class Wall {
    x = 1200;
    y;
    height = randomInt(100, 500);
    width = 50;
    position = randomInt(0, 1) ? "top" : "bottom";
    speed = 3;
    constructor() {
        this.y = this.position === "top" ? 0 : 800 - this.height;
    }
    draw = (ctx) => {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    };
    update = (ctx) => {
        this.x -= 1 * this.speed;
        this.draw(ctx);
    };
}
