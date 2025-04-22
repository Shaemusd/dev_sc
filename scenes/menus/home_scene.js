// home_scene.js
import BaseScene from '../base_scene.js';
export default class HomeScene extends Phaser.Scene {
    constructor() {
        super('HomeScene');
    }

    preload() {
        // Load any assets here if you plan to use images for buttons
        this.load.video('bgVideo', 'assets/video/sc_vbackground.mp4', 'loadeddata', false, true);
        this.load.spritesheet('wizard-idle', 'assets/sprites/wizard/Idle.png', { frameWidth: 128, frameHeight: 128 });

    }

    create() {
        const { width, height } = this.scale;
        const buttonStyle = { fontSize: '48px', fill: '#ffffff', fontStyle: 'bold' };
        this.physics.world.gravity.y = 0;
        this.anims.create({
            key: 'wizard-idle-home',
            frames: this.anims.generateFrameNumbers('wizard-idle', { start: 0, end: 7 }),
            frameRate: 4,
            repeat: -1
        });
        // Create player as a physics sprite, play idle
        this.player = this.physics.add.sprite(
            width / 2 + 360,
            height / 2 - 40,
            'wizard-idle'
        )
            .setScale(2)
            .setDepth(1)
            .play('wizard-idle-home');
            
        this.player.setCollideWorldBounds(true);
        // Set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();

        this.player.setCollideWorldBounds(true);
        // Add video background at origin (0,0) and play
        const bg = this.add.video(0, 0, 'bgVideo')
            .setOrigin(0.5)
            .setDepth(-1);
        bg.play(true);
        bg.setPlaybackRate(0.7);

        // Once the video starts, scale and center to cover the screen without distortion
        bg.on('play', () => {
            const vw = bg.video.videoWidth;
            const vh = bg.video.videoHeight;
            const scaleX = width / vw;
            const scaleY = height / vh;
            const scale = Math.max(scaleX, scaleY);
            bg.setScale(0.5);
            // Center the video
            bg.setPosition(width / 3, height / 2);
            bg.setOrigin(0.5)
                .setDepth(1);
        });
        // Dark red overlay matching video container size
        const overlay = this.add.rectangle(20, -70, width, height, 0x00ff00, 0.3)
            .setOrigin(-0.5)
            .setDepth(0)
            .setScale(0.62);
        // Utility to style buttons: black stroke outline, black shadow
        const styleButton = btn => btn
            .setStroke('#000000', 6)        // black outline
            .setShadow(2, 2, '#000000', 4)  // black shadow
            .setInteractive();

        // Play button
        const playBtn = this.add.text(width / 2, height / 2 - 80, 'Play', buttonStyle)
            .setOrigin(0.5)
            .setDepth(1);
        styleButton(playBtn);
        playBtn.on('pointerover', () => playBtn.setStyle({ fill: '#228B22' }));  // forest green
        playBtn.on('pointerout', () => playBtn.setStyle({ fill: '#ffffff' }));
        playBtn.on('pointerdown', () => this.scene.start('LevelSelectScene'));

        // Options button
        const settingsBtn = this.add.text(width / 2, height / 2, 'Options', buttonStyle)
            .setOrigin(0.5)
            .setDepth(1);
        styleButton(settingsBtn);
        settingsBtn.on('pointerover', () => settingsBtn.setStyle({ fill: '#228B22' }));
        settingsBtn.on('pointerout', () => settingsBtn.setStyle({ fill: '#ffffff' }));
        settingsBtn.on('pointerdown', () => this.scene.start('SettingsScene'));

        // Exit button
        const exitBtn = this.add.text(width / 2, height / 2 + 80, 'Exit', buttonStyle)
            .setOrigin(0.5)
            .setDepth(1);
        styleButton(exitBtn);
        exitBtn.on('pointerover', () => exitBtn.setStyle({ fill: '#228B22' }));
        exitBtn.on('pointerout', () => exitBtn.setStyle({ fill: '#ffffff' }));
        exitBtn.on('pointerdown', () => this.scene.start('ExitScene'));
    }

    update() {
        // Simple left/right movement for home screen
        const speed = 200;
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            this.player.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.flipX = false;
        } else {
            this.player.setVelocityX(0);
        }

    }
}
