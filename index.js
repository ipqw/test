import { Game } from "./models/Game.js"

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const game = new Game(ctx)

const animate = () => {
    if (canvas) {
        // game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
};
animate();