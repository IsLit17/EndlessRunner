class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.moveSpeed = 3;
        scene.add.existing(this);
    }

    update() {
        //this.y += this.moveSpeed;
        // wrap around from top edge to bottom edge (NOT WORKING AT THE MOMENT)
        // if(this.y <= 0 + this.height) {
        //     this.reset();
        // }
        if(this.y > game.config.height){
            this.reset();
        }
    }

    // position reset (NOT WORKING AT THE MOMENT)
    reset() {
    }
}