class Item extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y, frame)
    {
        super(scene, x, y, 'enemy'+ Phaser.Math.Between(1, 5), frame);

        //  You can either do this:
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //  Or this, the end result is the same
        // scene.sys.displayList.add(this);
        // scene.sys.updateList.add(this);
        // scene.sys.arcadePhysics.world.enableBody(this, 0);

        //  Set some default physics properties
        this.setScale(0.5);
        this.setBounce(1, 1);
        this.body.allowGravity = false;
        this.setCollideWorldBounds(true);

        //this.body.onWorldBounds = true;

        //this.setVelocity(200* Phaser.Math.Between(-1, 1), 200* Phaser.Math.Between(-1, 1));
        this.setVelocity(200*Phaser.Math.FloatBetween(-1, 1), 200);
    }

    reset(){
        //this.setVisable = false;
            //this.setVisable = true;
            let randomX = Phaser.Math.Between(0, game.config.width);
            let randomY = Phaser.Math.Between(0, game.config.width);
            if(randomX != 0){
                this.x = randomX;
                this.y = 0;
            }
            else if(randomY != 0){
                this.x = 0;
                this.y = randomY;
            }
            else{
                this.x = randomX;
                this.y = randomY;
            }
    }

}