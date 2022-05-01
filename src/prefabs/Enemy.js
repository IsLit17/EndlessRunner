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

    // position reset
    reset() {
        this.y = Phaser.Math.Between(-30, -100);
    }
}