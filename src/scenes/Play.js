class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('background', './assets/tempBackground.png');
        this.load.image('player', './assets/player.png');
        this.load.image('enemy', './assets/enemy.png');
    }

    create() {
        //add background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        // set keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // create player sprite
        this.player = new Player(this, game.config.width/2, game.config.height/2, 'player', 0, keyLEFT, keyRIGHT).setOrigin(0.5,0);
        //this.enem = new Enemy(this, game.config.width/2, game.config.height/15, 'enemy', 0).setOrigin(0.5, 0);
        this.count = 0;
        this.spawnEnem = this.time.delayedCall(3000, this.spawn(), null, this);
    }

    update() {
        // parallax scrolling
        this.background.tilePositionY -= 4;

        // update player positon
        this.player.update();
    }

    spawn() { // function to spawn enemies
        for (let i = 0; i < 4; i++) {
            let enem = new Enemy(this, Phaser.Math.Between(0, game.config.width), game.config.height/15, 'enemy', 0).setOrigin(0.5, 0);
            this.physics.add.existing(enem);
        }
    }
}