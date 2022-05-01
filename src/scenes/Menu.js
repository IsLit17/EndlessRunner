class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }

    // show menu text
    this.add.text(game.config.width/2, game.config.height/2 - borderUISize * 2 - borderPadding * 2, 'Endless Color Rush', menuConfig).setOrigin(0.5);
    menuConfig.backgroundColor = '#00FF00';
    menuConfig.color = '#000';
    this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← arrow to start the game', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding * 5, 'Press → arrow for controls', menuConfig).setOrigin(0.5);
    this.highScoreText = this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding * 9, 'High Score: ' + highScore, menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + borderUISize*3 + borderPadding * 7, 'Press R to reset High Score', menuConfig).setOrigin(0.5);


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
            this.highScoreText.text = 'High Score: ' + localStorage.getItem("highStorage");
        }
    }
}