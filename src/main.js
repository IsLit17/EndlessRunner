// main.js

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: false
        }
    },
    scene: [Menu, Control, Play]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// define keys
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyR;

// number of enemies
let numEnemies = 6;

// maximum health
let maxHealth = 3;

// score config
let gameConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#b71c1c',
    color: '#ffffff',
    align: 'center',
    padding: {
    top: 5,
    bottom: 5,
    },
    fixedWidth: 350
}

let timerText, timerEvent;