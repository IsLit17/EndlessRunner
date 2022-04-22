class Control extends Phaser.Scene {
    constructor() {
        super("controlScene");
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
    this.add.text(game.config.width/2, game.config.height/2 - borderUISize * 2 - borderPadding * 2, 'The ← arrow moves the character left', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 - borderUISize * 1 - borderPadding * 1, 'The → arrow moves the character right', menuConfig).setOrigin(0.5);
    menuConfig.backgroundColor = '#00FF00';
    menuConfig.color = '#000';
    this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← arrow to go back to the menu', menuConfig).setOrigin(0.5);

    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene');
        }
    }
}