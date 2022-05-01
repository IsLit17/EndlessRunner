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

let itemStack = [];

function itemSearch(item){
    for(let i = 0; i < itemStack.length; i++){
        if(itemStack[i] == item){
            return true;
        }
    }
    return false;
}

let saveNum = 0;
function randomNum(){
    let ret = Phaser.Math.Between(1,4);
    while(ret == saveNum){
        ret = Phaser.Math.Between(1,4);
    }
    saveNum = ret;
    return ret;
}


let distance = 32; //base distance

// score
let timerText, timerEvent;
let highScore = localStorage.getItem("highStorage");
//Our team are proud of 