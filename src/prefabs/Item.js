class Item extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

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

        this.setVelocity(-200, -200);
    }

    reset(){
        this.x = Phaser.Math.Between(0, game.config.width);
        this.y = Phaser.Math.Between(0, game.config.width);
    }

}