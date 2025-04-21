// level_select.js

export default class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super('LevelSelectScene');
    }

    preload() {
        // No assets to load for placeholder buttons
    }

    create() {
        const { width, height } = this.scale;
        const buttonStyle = { fontSize: '28px', fill: '#ffffff' };

        // Button labels and corresponding scene keys
        const options = [
            { label: 'Demo', scene: 'Level1' },
            // { label: 'Level 1', scene: 'Level1' },
            // { label: 'Level 2', scene: 'Level2' },
            // { label: 'Level 2', scene: 'Level2' },
            { label: 'Back', scene: 'HomeScene' }
        ];

        options.forEach((opt, i) => {
            const yOffset = -100 + i * 60;
            const btn = this.add.text(width / 2, height / 2 + yOffset, opt.label, buttonStyle)
                .setOrigin(0.5)
                .setInteractive();

            btn.on('pointerover', () => btn.setStyle({ fill: '#ffff00' }));
            btn.on('pointerout', () => btn.setStyle({ fill: '#ffffff' }));
            btn.on('pointerdown', () => this.scene.start(opt.scene));
        });
    }
}
