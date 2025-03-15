// level1.js

// Adjust the import path to match where base_scene.js actually is
import BaseScene from '../base_scene.js';

export default class Level1 extends BaseScene {
    constructor() {
        // Pass a unique string identifier for this scene
        super('Level1');
    }

    preload() {
        // Call the BaseScene's preload() to load common assets
        super.preload();

        // Load any Level1-specific assets here, e.g.:
        // this.load.image('enemy', 'assets/sprites/enemy.png');
    }

    create() {
        // Call the BaseScene's create() for player setup, input, etc.
        super.create();

        // Add level-specific stuff
        this.add.text(20, 20, 'This is Level 1', {
            font: '20px Arial',
            fill: '#fff'
        });
    }

    update() {
        // Call BaseScene's update() for movement
        super.update();

        // Add any Level1-specific update logic here
    }
}
