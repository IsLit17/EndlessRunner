
//Zachary Hollaway, Sheel Kulkarni, Louis Lim
//Title: Zombie Runner
//Published: 05/01/2022

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
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyR, keyE;
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

//Our team are proud of item bag system. We all not familar with Phaser, so we used array instead of group. This game has three portable items which semi-permenantly give effects to players until they hold them. 
//When the players hit the zombies, the hold items will be lost randomly. Two same items can not be holden, and the item bag can only hold two. Phaser.Utils.Array method doesn't have search to find duplicating items so we create function to implement it  
//The holy cross is powerful item which earns 20 points in score but it doesn't have permenant effect, which means holding this item prevent getting other portable items. This leads player not only to dodge zombies but also to hit them to abandon the cross.
//Players must choose between more points or stable play, which leads strategic action, considering when to get the generated item and how to dodge flocking zombies.
//Other proud thing is High Score implementation. We implemented locally saved score using localStorage. It prevents high score from reset when player refresh the game. 