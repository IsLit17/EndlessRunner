class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.5);
        //this.setBounce(1, 1);
        this.body.allowGravity = false;
        //this.setCollideWorldBounds(true);

    }
    // position reset (NOT WORKING AT THE MOMENT)
    reset() {
        this.y = 0;
        this.x = 48*Phaser.Math.Between(1, (game.config.width/48-1));
    }
}