// base_scene.js

export default class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key); // Pass the scene key to Phaser.Scene
    }

    preload() {
        // Load assets that all scenes need
        // For example, a placeholder player sprite
        this.load.spritesheet('player', 'https://labs.phaser.io/assets/sprites/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.image('ground', 'assets/sprites/ground.png');  // Load the ground asset
    }

    create() {
        // Create the animation ONCE at game start
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'idle',
            frames: [{ key: 'player', frame: 4 }],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    
        // Create a physics-enabled player
        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setCollideWorldBounds(true);
    
        // Create platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 580, 'ground').setScale(100, 1).refreshBody();
    
        this.physics.add.collider(this.player, this.platforms);
    
        // Keyboard input
        this.keys = this.input.keyboard.addKeys({
            left: 'A',
            right: 'D',
            jump: 'SPACE'
        });
    }


    update() {
        this.player.setVelocityX(0);
    
        if (this.keys.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
            this.player.flipX = false;  // Don't flip — this sheet has separate directions
        } else if (this.keys.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
            this.player.flipX = false;
        } else {
            this.player.anims.play('idle', true);
        }
    
        if (this.keys.jump.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}
