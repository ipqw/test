import { Battery } from "./Battery";
import { Player } from "./Player";
import { Wall } from "./Wall";

export class Game {
    width;
    height;
    startTime = new Date().getTime();
    time = 0;
    name;
    walls = [];
    player = new Player();
    batteries = [];
    constructor(name) {
        this.name = name;
        this.height = 800;
        this.width = 1000;
    }
    draw = (ctx) => {
        if (ctx) {
            ctx.clearRect(0, 0, this.width || 0, this.height || 0);
        }
    };
    update = (ctx) => {
        if (ctx && !this.player.isDestroyed) {
            this.draw(ctx);
            this.player.update(ctx);
            if (this.player.power === 0) {
                this.player.isDestroyed = true;
            }
            this.batteries.forEach((el, index) => {
                if (
                    this.player.x + this.player.width >= el.x &&
                    this.player.x <= el.x + el.width &&
                    this.player.y + this.player.height >= el.y &&
                    this.player.y <= el.y + el.height
                ) {
                    el.isDestroyed = true;
                    this.player.power += 5;
                    this.batteries.splice(index, 1);
                }
                el.update(ctx);
            });
            this.walls.forEach((el) => {
                if (
                    this.player.x + this.player.width >= el.x &&
                    this.player.x <= el.x + el.width &&
                    this.player.y + this.player.height >= el.y &&
                    this.player.y <= el.y + el.height
                ) {
                    this.player.isDestroyed = true;
                }
                el.update(ctx);
            });
        }
    };
}
