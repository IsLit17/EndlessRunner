class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('background', './assets/tempBackground.png');
        this.load.image('player', './assets/player.png');
        this.load.image('enemy1', './assets/enemy.png');
        this.load.image('enemy2', './assets/enemy2.png');
        this.load.image('enemy3', './assets/enemy3.png');
        this.load.image('enemy4', './assets/enemy4.png');
        this.load.image('enemy5', './assets/enemy5.png');
    }

    create() {

        //health variable and game over flag
        this.gameOver = false;
        this.health = 1;
        //add background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        // set keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // create player sprite
        this.player = new Player(this, game.config.width/2, game.config.height/2, 'player', 0, keyLEFT, keyRIGHT).setOrigin(0.5,0);
        this.enemies = [numEnemies];
        for (let i = 0; i < numEnemies; i++) {
            this.enemies[i] = this.physics.add.image(48*Phaser.Math.Between(1, game.config.width/48-1), 0, 'enemy' + (i + 1));
            this.enemies[i].setVelocityY(100);
            this.enemies[i].body.allowGravity = false;
        }
        console.log(this.enemies[0].displayWidth); // = 32;

        // create physics groups
        this.enemyGroup = this.physics.add.staticGroup();
        this.enemyGroup.addMultiple(this.enemies);
        //this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'player');

        this.physics.add.collider(this.player, this.enemies[0]);
    }

    update() {
        // parallax scrolling
        console.log(this.health + ", " + this.gameOver);
        this.background.tilePositionY -= 4;
        this.player.update();

        for (let i = 0; i < numEnemies; i++) {
            if(this.enemies[i].y > game.config.height) {
                this.enemies[i].y = 0;
                this.enemies[i].x = 48*Phaser.Math.Between(1, (game.config.width/48-1));
            }
        }

    }

    lowerHealth() {
        this.health -= 1;
        if (this.health <= 0) {
            this.gameOver = true;
        }
    }

}