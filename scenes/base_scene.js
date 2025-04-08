// base_scene.js

export default class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key); // Pass the scene key to Phaser.Scene
    }

    preload() {
        // Load assets that all scenes need
        // For example, a placeholder player sprite

        this.load.image('ground', 'https://labs.phaser.io/assets/sprites/platform.png');
        this.load.image('platform', 'https://labs.phaser.io/assets/sprites/platform.png');



        this.load.image('sky', 'https://labs.phaser.io/assets/skies/sky4.png');

        this.load.spritesheet('wizard-walk', '/assets/sprites/wizard/Walk.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet('wizard-idle', '/assets/sprites/wizard/Idle.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet('wizard-jump', '/assets/sprites/wizard/Jump.png', {
            frameWidth: 128,
            frameHeight: 128
        });

    }

    create() {
        this.currentAnim = null;
        this.facing = 'right';
        this.add.image(400, 300, 'sky').setScrollFactor(0); // 800x600 center


        // Create the animation ONCE at game start
        // Walk animation
        this.anims.create({
            key: 'wizard-walk',
            frames: this.anims.generateFrameNumbers('wizard-walk', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        // Idle animation
        this.anims.create({
            key: 'wizard-idle',
            frames: this.anims.generateFrameNumbers('wizard-idle', { start: 0, end: 7 }),
            frameRate: 3, // slower frame rate for a calm idle
            repeat: -1    // loop forever
        });

        // Jump animation (loop only if it's multi-frame and looks good that way)
        this.anims.create({
            key: 'wizard-jump',
            frames: this.anims.generateFrameNumbers('wizard-jump', { start: 3, end: 7 }),
            frameRate: 3, // higher frame rate for a snappier jump, adjust to taste
            repeat: 0 // still non-looping — only plays once per jump
        });

        // Create the player
        this.player = this.physics.add.sprite(400, 300, 'wizard-idle');
        this.player.setCollideWorldBounds(true);
        this.player.setOrigin(0.5, 1); // centers X and anchors Y at feet


        // 🔧 Set a better-sized physics body
        this.player.body.setSize(26, 80); // ← adjust these to fit your actual visible wizard
        this.player.body.setOffset(35, 48);
        // 🧱 Create GROUND (base floor)
        this.ground = this.physics.add.staticGroup();

        // Big solid floor
        this.ground.create(400, 580, 'ground').setScale(100, 1).refreshBody();

        // Add collider
        this.physics.add.collider(this.player, this.ground);



        // Tile across bottom (optional decorative or for extra bounce steps)






        // Keyboard input
        this.keys = this.input.keyboard.addKeys({
            left: 'A',
            right: 'D',
            jump: 'SPACE'
        });
    }


    update() {
        const isTouchingGround = this.player.body.blocked.down || this.player.body.touching.down;

        let moving = false;

        // Horizontal movement
        if (this.keys.left.isDown) {
            this.player.setVelocityX(-160);
            this.updatePlayerFlipAndOffset(true);  // ✅ use your helper
            this.facing = 'left';
            moving = true;
            if (isTouchingGround) this.setPlayerAnimation('wizard-walk');
        } else if (this.keys.right.isDown) {
            this.player.setVelocityX(160);
            this.updatePlayerFlipAndOffset(false);  // ✅ use your helper
            this.facing = 'right';
            moving = true;
            if (isTouchingGround) this.setPlayerAnimation('wizard-walk');
        } else {
            if (isTouchingGround) {
                this.player.setVelocityX(0);

                // 👇 Flip idle based on last direction
                this.player.setFlipX(this.facing === 'left');
                this.setPlayerAnimation('wizard-idle');
            }
        }


        // Jumping
        if (this.keys.jump.isDown && isTouchingGround) {
            this.player.setVelocityY(-430);
            this.setPlayerAnimation('wizard-jump');
        }

        // In-air logic
        if (!isTouchingGround && this.currentAnim !== 'wizard-jump') {
            this.setPlayerAnimation('wizard-jump');
        }

        // Landing state reset
        if (isTouchingGround && this.currentAnim === 'wizard-jump') {
            if (moving) {
                this.setPlayerAnimation('wizard-walk');
            } else {
                this.setPlayerAnimation('wizard-idle');
            }
        }
    }

    updatePlayerFlipAndOffset(facingLeft) {
        this.player.setFlipX(facingLeft);
    
        const hitboxWidth = 30;      // match this to setSize()
        const offsetRight = 35;      // where the hitbox starts on right-facing
        const offsetY = 48;
    
        if (facingLeft) {
            const offsetX = this.player.width - offsetRight - hitboxWidth;
            this.player.body.setOffset(offsetX, offsetY);
        } else {
            this.player.body.setOffset(offsetRight, offsetY);
        }
    }


    setPlayerAnimation(animKey) {
        if (this.currentAnim !== animKey) {
            this.player.anims.play(animKey, true);
            this.currentAnim = animKey;
        }
    }
}
