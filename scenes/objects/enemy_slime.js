// enemy_slime.js
export default class EnemySlime extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'slime'); // 'slime' = your sprite key

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.play('slime-idle');
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setVelocityX(50); // Slime patrols left/right

        this.hp = 3; // Example stat
    }

    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.destroy();
        }
    }
}