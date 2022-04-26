class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('background', './assets/tempBackground.png');
        this.load.image('player', './assets/player.png');
        this.load.image('enemy', './assets/obs.png');
        this.load.image('item1', './assets/enemy.png');
        this.load.image('item2', './assets/enemy2.png');
        this.load.image('item3', './assets/enemy3.png');
        this.load.image('item4', './assets/enemy4.png');
        this.load.image('item5', './assets/enemy5.png');
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
            this.enemies[i] = new Enemy(this, 48*Phaser.Math.Between(1, game.config.width/48-1), 0, 'enemy', 0).setOrigin(0.5,0);
            this.enemies[i].setVelocityY(100);
        }
        console.log(this.enemies[0].displayWidth); // = 32;
        this.item = new Item(this, 0, 0,0);
    }

    update() {
        // parallax scrolling//
        this.background.tilePositionY -= 4;
        this.player.update();


        for (let i = 0; i < numEnemies; i++) {
            if(this.enemies[i].y > game.config.height) {
                this.enemies[i].reset();
            }
        }

        if(this.checkCollision(this.player, this.item)){
            switch(this.item.texture.key){
                case 'item1':
                    console.log(this.item.texture.key);
                    this.player.speedUp();
                    this.time.delayedCall(10000, () => {
                        this.player.moveSpeed = 4;
                    },null,this);
                    break;
                case 'item2':
                    console.log(this.item.texture.key);
                    break;
                case 'item3':
                    console.log(this.item.texture.key);
                    break;
                case 'item4':
                    console.log(this.item.texture.key);
                    break;
                case 'item5':
                    console.log(this.item.texture.key);
                    break;
                default:
                    console.log("default");
            
            }
        
            this.item.destroy();
            this.item = new Item(this, Phaser.Math.Between(0, game.config.width), 0, 0);
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

    lowerHealth() {
        this.health -= 1;
        if (this.health <= 0) {
            this.gameOver = true;
        }
    }

}