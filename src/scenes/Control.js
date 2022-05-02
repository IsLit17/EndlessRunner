class Control extends Phaser.Scene {
    constructor() {
        super("controlScene");
    }

    preload() {
        this.load.image('control', './assets/controlScene.png');
        this.load.audio('bgm', './assets/bgm.wav');
    }

    create() {
        // background music
        this.bgm = this.sound.add('bgm');
        this.bgm.play();
        this.bgm.loop = true;

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

        this.add.image(0,0, 'control').setOrigin(0,0);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.bgm.stop();
            this.scene.start('menuScene');
        }
    }
}