// game.js

import Level1 from './scenes/levels/level1.js';
// import Level2 from './scenes/levels/level2.js';
// import Level3 from './scenes/levels/level3.js';

const config = {
    type: Phaser.AUTO,
    scale: {
        // FIT will letter‑box to keep aspect ratio;
        // if you want the canvas to always match the window exactly (distorting if needed)
        // use Phaser.Scale.RESIZE instead of FIT.
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,

        // these become your “design resolution”
        // you can pick whatever you like; Phaser will scale them up/down
        width: 1200,
        height: 580
    },
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
