class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('health_increase', './assets/healthIncrease.wav');
        this.load.audio('gameOver', './assets/gameOver.wav');
        this.load.audio('boots_pickup', './assets/Boots_Pickup.wav');
        this.load.image('menu', './assets/MenuScreen.png');
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Chiller',
            fontSize: '50px',
            color: '#9e1717',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }
        // background image
        this.add.image(0,0, 'menu').setOrigin(0,0);

        // show menu text
        //this.add.text(game.config.width/2, game.config.height/2 - borderUISize * 2 - borderPadding * 2, 'Endless Color Rush', menuConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← arrow to start the game', menuConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding * 5, 'Press → arrow for controls', menuConfig).setOrigin(0.5);
        this.highScoreText = this.add.text(game.config.width/2 + borderUISize * 3, game.config.height/2 + borderUISize + borderPadding * 6.4, highScore, menuConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/2 + borderUISize*3 + borderPadding * 7, 'Press R to reset High Score', menuConfig).setOrigin(0.5);


        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('controlScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            localStorage.setItem("highStorage", 0);
            this.highScoreText.text = localStorage.getItem("highStorage");
        }
    }
}