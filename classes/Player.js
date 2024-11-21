export class Player {
    power = 50;
    x = 10;
    y = 400;
    speed = 2;
    width = 30;
    height = 30;
    isDestroyed = false;
    setY = (y) => {
        this.y += y * this.speed;
    };
    setX = (x) => {
        this.x += x * this.speed;
    };
    reducePower = () => {
        this.power -= 1;
    };
    draw = (ctx) => {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.roundRect(this.x, this.y, this.width, this.height, 100);
        ctx.fill();
        ctx.closePath();
    };
    update = (ctx) => {
        this.draw(ctx);
    };
}
