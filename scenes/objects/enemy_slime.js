// enemy_slime.js
export default class EnemySlime extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, player) {
        super(scene, x, y, 'slime');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.hp = 3;    // give the slime 3 hit‑points
        this.player = player;      // ← store the player
        this.speed = 80;          // ← pixels/sec chase speed
        this.setCollideWorldBounds(true);
        this.play('slime-idle');
        // Make sure gravity is on:
        this.body.setAllowGravity(true);
        // (optional) give it its own gravity strength:
        this.body.setGravityY(30);
        this.setBounce(1);

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (!this.active || !this.player) {
            return;
        }

        const dx = this.player.x - this.x;
        if (Math.abs(dx) > 10) {
            // dir is +1 or -1
            const dir = Math.sign(dx);
            this.setVelocityX(dir * this.speed);
            this.flipX = dir < 0;
            this.anims.play('slime-walk', true);
        } else {
            this.setVelocityX(0);
            this.anims.play('slime-idle', true);
        }
    }

    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.destroy();
        }
    }
}
