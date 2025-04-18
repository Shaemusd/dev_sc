// level1.js

// Adjust the import path to match where base_scene.js actually is
import BaseScene from '../base_scene.js';
import EnemySlime from '../objects/enemy_slime.js';
export default class Level1 extends BaseScene {
    constructor() {
        // Pass a unique string identifier for this scene
        super('Level1');
    }

    preload() {
        // Call the BaseScene's preload() to load common assets
        super.preload();
        this.load.spritesheet('slime', 'assets/sprites/enemies/slime.jpg', {
            frameWidth: 48,
            frameHeight: 48
        });
        this.load.tilemapTiledJSON('level1', 'assets/maps/level1.json');
        this.load.image('tiles', 'assets/tiles/tileset.png');
        // Load any Level1-specific assets here, e.g.:
        // this.load.image('enemy', 'assets/sprites/enemy.png');
    }

    create() {
        

        // Call the BaseScene's create() for player setup, input, etc.
        super.create();

        this.anims.create({
            key: 'slime-idle',
            frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 11 }),
            frameRate: 4,
            repeat: -1
        });


        // Add level-specific stuff
        this.add.text(20, 20, 'This is Level 1', {
            font: '20px Arial',
            fill: '#fff'
        });

        // 🪵 PLATFORMS
        this.platforms = this.physics.add.staticGroup();

        




        // ✅ Floating platform (clean, visible, sized)
        const platform = this.platforms.create(30, 410, 'platform');
        platform.setScale(1).refreshBody();
        platform.body.setSize(400, 62);
        platform.body.setOffset(100, 0);

        this.physics.add.collider(this.player, this.platforms);


        this.physics.world.createDebugGraphic();
        this.physics.world.drawDebug = true;
        this.physics.add.collider(this.fireballs, this.platforms, this.onFireballHit, null, this);
        this.enemy = new EnemySlime(this, 300, 500);

        // Add collider
        this.physics.add.collider(this.enemy, this.ground);
        this.physics.add.collider(this.player, this.enemy, this.onPlayerHit, null, this);
    }

    update() {
        // Call BaseScene's update() for movement
        super.update();

        // Add any Level1-specific update logic here
    }
    onPlayerHit(player, enemy) {
        console.log('Player hit!');
        // maybe knockback, reduce HP, etc
    }
}
