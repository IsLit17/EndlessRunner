class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, kLeft, kRight, kUP, kDOWN) {
        super(scene, x, y, texture, frame);
        this.keyLeft = kLeft;
        this.keyRight = kRight;
        this.keyUP = kUP;
        this.keyDOWN = kDOWN;
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
        if (this.keyUP.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.y -= this.moveSpeed;
        }
        if (this.keyDOWN.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.y += this.moveSpeed;
        }
    }
}