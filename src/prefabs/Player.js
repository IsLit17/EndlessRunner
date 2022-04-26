class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, kLeft, kRight) {
        super(scene, x, y, texture, frame);
        this.keyLeft = kLeft;
        this.keyRight = kRight;
        this.moveSpeed = 4;
        scene.add.existing(this);
    }

    update() {
        if (this.keyLeft.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        }
        if (this.keyRight.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
        }
    }

    speedUp(){
        this.moveSpeed *= 1.5;
    }
}