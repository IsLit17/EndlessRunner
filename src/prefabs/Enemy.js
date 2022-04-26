class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(1);
        //this.setBounce(1, 1);
        this.body.allowGravity = false;
        //this.setCollideWorldBounds(true);

    }
    // position reset (NOT WORKING AT THE MOMENT)
    reset() {
        this.y = -50;
        this.x = 96*Phaser.Math.Between(1, (game.config.width/96-1));
    }
}