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

        this.item = new Item(this, 0, 0,0);
        //this.physics.world.on('worldbounds', onWorldBound);
        /*
        this.spawnEnem = this.time.delayedCall(3000, () => {
            for (let i = 0; i < 4; i++) {
                this.enem = new Enemy(this, Phaser.Math.Between(0, game.config.width), game.config.height/15, 'enemy', 0).setOrigin(0.5, 0);
                this.physics.add.existing(this.enem);
            }
        }, null, this);
        */
       this.existItem = true;
    }

    update() {
        // parallax scrolling
        this.background.tilePositionY -= 4;
        this.player.update();


        for (let i = 0; i < numEnemies; i++) {
            if(this.enemies[i].y > game.config.height){
                this.enemies[i].y = 0;
                this.enemies[i].x = 48*Phaser.Math.Between(1, (game.config.width/48-1));
            }
        }

        if(this.checkCollision(this.player, this.item)){
            this.item.destroy();
            this.item = new Item(this, Phaser.Math.Between(0, game.config.width), 0, 0);
            //this.existItem = false;

            
        }

    }

    checkCollision(p1, p2) {
        // simple AABB checking
        if (p1.x < p2.x + p2.width && 
            p1.x + p1.width > p2.x && 
            p1.y < p2.y + p2.height &&
            p1.height + p1.y > p2.y) {
                return true;
        } else {
            return false;
        }
    }

    spawn() { // function to spawn enemies
    }
}