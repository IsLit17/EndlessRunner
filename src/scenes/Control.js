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
        this.bgm = this.sound.add('bgm', {volume: 0.70});
        this.bgm.play();
        this.bgm.loop = true;

        // background
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