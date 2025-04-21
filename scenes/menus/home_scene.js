// home_scene.js

export default class HomeScene extends Phaser.Scene {
    constructor() {
        super('HomeScene');
    }

    preload() {
        // Load any assets here if you plan to use images for buttons
    }

    create() {
        const { width, height } = this.scale;
        const buttonStyle = { fontSize: '32px', fill: '#ffffff' };

        // Play button
        const playBtn = this.add.text(width / 2, height / 2 - 60, 'Play', buttonStyle)
            .setOrigin(0.5)
            .setInteractive();
        playBtn.on('pointerover', () => playBtn.setStyle({ fill: '#ff0' }));
        playBtn.on('pointerout', () => playBtn.setStyle({ fill: '#fff' }));
        playBtn.on('pointerdown', () => this.scene.start('LevelSelectScene'));

        // Settings button (placeholder)
        const settingsBtn = this.add.text(width / 2, height / 2, 'Settings', buttonStyle)
            .setOrigin(0.5)
            .setInteractive();
        settingsBtn.on('pointerover', () => settingsBtn.setStyle({ fill: '#ff0' }));
        settingsBtn.on('pointerout', () => settingsBtn.setStyle({ fill: '#fff' }));
        settingsBtn.on('pointerdown', () => this.scene.start('LevelSelectScene'));

        // Exit button (placeholder)
        const exitBtn = this.add.text(width / 2, height / 2 + 60, 'Exit', buttonStyle)
            .setOrigin(0.5)
            .setInteractive();
        exitBtn.on('pointerover', () => exitBtn.setStyle({ fill: '#ff0' }));
        exitBtn.on('pointerout', () => exitBtn.setStyle({ fill: '#fff' }));
        exitBtn.on('pointerdown', () => this.scene.start('LevelSelectScene'));
    }
}
