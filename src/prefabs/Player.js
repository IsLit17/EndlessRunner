class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, kLeft, kRight) {
        super(scene, x, y, texture, frame);
        this.keyLeft = kLeft;
        this.keyRight = kRight;
        this.moveSpeed = 4;
        this.armor = false;
        scene.add.existing(this);
    }

    update() {
        if (this.keyLeft.isDown && this.x >= 0) {
            this.x -= this.moveSpeed;
        }
        if (this.keyRight.isDown && this.x <= game.config.width) {
            this.x += this.moveSpeed;
        }

        if(!itemSearch('\nMagic Shoes')){
            this.moveSpeed = 4;
        }
        else{
            this.moveSpeed = 8;
        }

        if(!itemSearch('\nSalt Armor')){
            this.armor = false;
        }
        else{
            this.armor = true;
        }
    }

    
}