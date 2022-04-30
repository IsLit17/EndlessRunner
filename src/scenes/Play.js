class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('background', './assets/background.png');
        this.load.image('player', './assets/player.png');
        this.load.image('enemy', './assets/obs.png');
        this.load.image('item1', './assets/speedUp.png');
        this.load.image('item2', './assets/heart.png');
        this.load.image('item3', './assets/enemySlow.png');
        this.load.image('item4', './assets/invincibility.png');
        this.load.image('health0', './assets/healthBar0.png');
        this.load.image('health1', './assets/healthBar1.png');
        this.load.image('health2', './assets/healthBar2.png');
        this.load.image('health3', './assets/healthBar3.png');
    }

    create() {
        this.minEnemies = 6;
        this.numEnemies = 9;
        // base speed
        this.speed = 100;
        this.playerShield = false;
        //add background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        //health variable and game over flag
        this.gameOver = false;
        this.health = maxHealth;
        this.healthBar = this.add.image(game.config.width/2 + borderPadding*15, borderUISize + borderPadding - 8, 'health3').setOrigin(0,0);

        // display health
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#b71c1c',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 150
        }

        // set keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // create player sprite
        this.player = new Player(this, game.config.width/2, game.config.height/2, 'player', 0, keyLEFT, keyRIGHT).setOrigin(0,0);

        // create enemies
        this.enemies = [this.numEnemies];
        this.positioner = new Enemy(this, -72, -50, 0, 0).setOrigin(0, 0).setVelocityY(this.speed);
        for (let i = 0; i < this.numEnemies; i++) {
            let v;
            if(i < this.minEnemies){
                v = this.speed;
            }
            else if (i == this.numEnemies - 1){
                v = 0
            }
            else{
                v = this.speed*Phaser.Math.Between(0,1);
            }
            this.enemies[i] = new Enemy(this, distance*i, Phaser.Math.Between(-30, -100), 'enemy', 0).setOrigin(0, 0).setVelocityY(v);
        }

        this.item = new Item(this, game.config.width/2, 0,0).setOrigin(0,0);
        // timer/score
        timerEvent = this.time.addEvent({ delay: 1000, callback: this.updateTime, callbackScope: this, loop: true });
        this.curTime = 0;
        timerText = this.add.text(game.config.width/2, borderUISize + borderPadding, 'Score: 0', { fontSize: '20px', fill: '#ffffff' });

        this.time.addEvent({delay: 10000,callback: function(){this.speed *= 1.2;}, callbackScope: this, loop: true }); // enemies speed up overtime
        this.itemState = this.add.text(0, borderUISize + borderPadding, 'Equipment:', { fontSize: '20px', fill: '#ffffff' });
    }

    update() {
        // when game is over
        if (this.gameOver) {
            let score = this.curTime;
            if (score > highScore) {
                highScore = score;
            }
            this.add.text(game.config.width/2, game.config.height/2 - 80, 'GAME OVER', gameConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 - 8, 'Score: ' + score, gameConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'High Score: ' + highScore, gameConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 136, 'Press (R) to Restart', gameConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 208, 'or <- for Menu', gameConfig).setOrigin(0.5);
            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                this.scene.restart();
            }
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.scene.start("menuScene");
            }
        }
        // parallax scrolling
        this.background.tilePositionY -= 4;

        if (!this.gameOver) {
            // update player position
            this.player.update();
            // collision for enemies
            for (let i = 0; i < this.numEnemies; i++) {
                if (this.checkCollision(this.player, this.enemies[i])) {
                    this.enemies[i].setVelocityY(0).reset();
                    Phaser.Utils.Array.RemoveRandomElement(itemStack);
                    this.itemState.text = 'Equipment:' + itemStack;
                    if(!this.player.armor){this.lowerHealth()};
                }
            }
            if(this.positioner.y > game.config.height){
                this.positioner.y = -100;
                this.positioner.setVelocityY(this.speed);
                Phaser.Utils.Array.Shuffle(this.enemies);
                let v;
                for(let i = 0; i < this.numEnemies; i++){
                    this.enemies[i].reset();
                    if(i < this.minEnemies){
                        v = this.speed;
                    }
                    else if (i == this.numEnemies - 1){
                        v = 0
                    }
                    else{
                        v = this.speed*Phaser.Math.Between(0,1);
                    }
                    this.enemies[i].setVelocityY(v);
                }
            }

            // collision for items
            if(this.checkCollision(this.player, this.item)){
                switch(this.item.texture.key){
                    case 'item1':
                        console.log(this.item.texture.key);
                        if(!itemSearch('\nMagic Shoes')){
                            itemStack.push('\nMagic Shoes');
                            this.itemState.text = 'Equipment:' + itemStack;
                        }
                        break;
                    case 'item2':
                        console.log(this.item.texture.key);
                        this.increaseHealth();
                        break;
                    case 'item3':
                        console.log(this.item.texture.key);
                        if(!itemSearch('\nHoly Armor')){
                            itemStack.push('\nHoly Armor');
                            this.itemState.text = 'Equipment:' + itemStack;
                        }
                        break;
                    case 'item4':
                        console.log(this.item.texture.key);
                        break;
                    default:
                        console.log("default");
                
                }
                this.item.destroy();
                this.item = new Item(this, Phaser.Math.Between(0, game.config.width), 0, 0);
            }
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
            this.health = 0;
            this.gameOver = true;
        }
        this.healthBar.setTexture('health' + this.health);
    }

    increaseHealth() {
        this.health += 1;
        if (this.health >= maxHealth) {
            this.health = maxHealth;
        }
        this.healthBar.setTexture('health' + this.health);
    }

    updateTime() {
        if (!this.gameOver){
            this.curTime += 1;
            timerText.setText('Score: ' + this.curTime);
        }
    }


}