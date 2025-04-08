// game.js

import Level1 from './scenes/levels/level1.js';

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    backgroundColor: '#1d212d',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    // List your scenes here. Phaser will load them in this array order.
    scene: [Level1]
};

const game = new Phaser.Game(config);
