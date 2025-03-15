// base_scene.js

export default class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key); // Pass the scene key to Phaser.Scene
    }

    preload() {
        // Load assets that all scenes need
        // For example, a placeholder player sprite
        this.load.image('player', 'assets/sprites/placeholder.png');
        this.load.image('ground', 'assets/sprites/ground.png');  // Load the ground asset
    }

    create() {
        // Create a physics-enabled player at the center of the screen
        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setCollideWorldBounds(true);

        // Create a static group for ground/platforms
        this.platforms = this.physics.add.staticGroup();

        // Create a ground platform at the bottom of the screen
        // Adjust the x, y coordinates as needed; this places the ground near the bottom.
        this.platforms.create(400, 580, 'ground')
            .setScale(100, 1)  // scale x by 3, y by 1
            .refreshBody();        // Refresh the body to update the physics dimensions

        // Add a collider so the player lands on the ground
        this.physics.add.collider(this.player, this.platforms);

        // Set up keyboard input for left/right movement and jump
        this.keys = this.input.keyboard.addKeys({
            left: 'A',
            right: 'D',
            jump: 'SPACE'  // or 'UP' if you prefer the Up arrow
        });
    }


    update() {
        // Reset horizontal velocity
        this.player.setVelocityX(0);

        // Move left or right
        if (this.keys.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.keys.right.isDown) {
            this.player.setVelocityX(160);
        }

        // Jump if on the ground
        if (this.keys.jump.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}
