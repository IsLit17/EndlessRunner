class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.moveSpeed = 3;
        scene.add.existing(this);
    }

    update() {
        this.y += this.moveSpeed;
    }
}