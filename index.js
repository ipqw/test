import { Battery } from "./classes/Battery.js";
import { Game } from "./classes/Game.js"
import { Wall } from "./classes/Wall.js";

const canvas = document.getElementById('canvas')
const timerSpan = document.getElementById('timer')
const endTimerSpan = document.getElementById('endTimer')
const powerSpan = document.getElementById('power')
const nameSpan = document.getElementById('name')
const startBtn = document.getElementById('startBtn')
const restartBtn = document.getElementById('restartBtn')
const welcomeScreen = document.getElementById('welcomeScreen')
const endScreen = document.getElementById('endScreen')
const gameDiv = document.getElementById('game')
const ctx = canvas.getContext('2d')

let game = new Game('qwe')
let name = 'qwe'

let isWKeyPressed = false;
let isSKeyPressed = false;
let isAKeyPressed = false;
let isDKeyPressed = false;

export const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const spawnWallsAndBatteries = () => {
    if (!game.player.isDestroyed) {
        setTimeout(() => {
            game?.walls.push(new Wall());
            game?.batteries.push(new Battery());
            spawnWallsAndBatteries();
        }, 1500);
    }
};
const timerInit = () => {
    setTimeout(() => {
        if (!game?.player.isDestroyed) {
            const timer = new Date(game?.startTime ? new Date().getTime() - game?.startTime: 0,).getSeconds()
            !game?.player.reducePower();
            timerSpan.innerHTML = `Время: ${Math.floor(timer / 60) < 10
                ? `0${Math.floor(timer / 60)}`
                : Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`

            timerInit();
        }
    }, 1000);
};

const animate = () => {
    if (canvas && !game.player.isDestroyed) {
        requestAnimationFrame(animate);
        if (game && canvas) {
            // movement
            if (isWKeyPressed && game.player.y >= 0) {
                game.player.setY(-1);
            }
            if (isSKeyPressed && game.player.y < 770) {
                game.player.setY(1);
            }
            if (isAKeyPressed && game.player.x >= 0) {
                game.player.setX(-1);
            }
            if (isDKeyPressed && game.player.x < 970) {
                game.player.setX(1);
            }
            powerSpan.innerHTML = `Заряд: ${game.player.power}%`
            game.update(ctx);
        }
    } else{
        endScreen.classList.remove('hidden')
        const timer = new Date(game?.startTime ? new Date().getTime() - game?.startTime: 0,).getSeconds()
        endTimerSpan.innerHTML = `Время: ${Math.floor(timer / 60) < 10
                ? `0${Math.floor(timer / 60)}`
                : Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`
    }
};

const keydownEvent = (event) => {
    if (event.key.toLocaleLowerCase() === "w") {
        isWKeyPressed = true;
    }
    if (event.key.toLocaleLowerCase() === "s") {
        isSKeyPressed = true;
    }
    if (event.key.toLocaleLowerCase() === "a") {
        isAKeyPressed = true;
    }
    if (event.key.toLocaleLowerCase() === "d") {
        isDKeyPressed = true;
    }
};

const keyupEvent = (event) => {
    if (event.key.toLocaleLowerCase() === "w") {
        isWKeyPressed = false;
    }
    if (event.key.toLocaleLowerCase() === "s") {
        isSKeyPressed = false;
    }
    if (event.key.toLocaleLowerCase() === "a") {
        isAKeyPressed = false;
    }
    if (event.key.toLocaleLowerCase() === "d") {
        isDKeyPressed = false;
    }
};

const startGame = () => {
    game = new Game('qwe');
    nameSpan.innerHTML = `Имя: ${name}`
    timerInit();
    animate();
    spawnWallsAndBatteries();
    // movement
    document.addEventListener("keydown", keydownEvent);
    document.addEventListener("keyup", keyupEvent);
};
const restartGame = () => {
    document.removeEventListener("keydown", keydownEvent);
    document.removeEventListener("keyup", keyupEvent);
    timerSpan.innerHTML = `Время: 00:00`
    startGame();
};
startBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden')
    gameDiv.classList.remove('hidden')
    startGame();
})
restartBtn.addEventListener('click', () => {
    endScreen.classList.add('hidden')
    restartGame();
    isEndScreenVisible = false;
})
