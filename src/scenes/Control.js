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
    this.add.text(game.config.width/2, game.config.height/2 - borderUISize * 5 - borderPadding * 5, "Objective:", menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 - borderUISize * 4 - borderPadding * 4, "Survive as long as possible while collecting items", menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 - borderUISize * 3 - borderPadding * 3, 'The ← arrow moves the character left', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 - borderUISize * 2 - borderPadding * 2, 'The → arrow moves the character right', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "[This item] gives invincibility:", menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, "[This item] speeds the player up:", menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 2 + borderPadding * 2, "[This item] slows the enemies down", menuConfig).setOrigin(0.5);
    menuConfig.backgroundColor = '#00FF00';
    menuConfig.color = '#000';
    this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 3 + borderPadding * 3, 'Press ← arrow to go back to the menu', menuConfig).setOrigin(0.5);

    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene');
        }
    }
}