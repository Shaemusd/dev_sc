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
        // in your scene's preload()
        this.load.image('level1_tiles', 'assets/tiles/level1_image.png');
        // each tileset image, key must match the `"name"` in your JSON:
        this.load.image('Tile', 'assets/tiles/Tile.png');
        this.load.image('BG', 'assets/tiles/BG.png');
        this.load.image('waterc', 'assets/tiles/18.png');
        this.load.image('waterwave', 'assets/tiles/17.png');

        this.load.tilemapTiledJSON('level_one_tiles', 'assets/tiles/levelone_tiles.json')
        this.load.spritesheet('slime', 'assets/sprites/enemies/slime.jpg', {
            frameWidth: 48,
            frameHeight: 48
        });


    }

    create() {


        // Call the BaseScene's create() for player setup, input, etc.
        super.create();
        this.add.image(1600, 280, 'level1_tiles')
            .setDepth(-1);

        // 1) build the Tilemap
        const map = this.make.tilemap({ key: 'level_one_tiles' });

        // 2) add each tileset by its Tiled name + your preload key
        const tileSet = map.addTilesetImage('Tile', 'Tile');
        const bgSet = map.addTilesetImage('BG', 'BG');
        const watercSet = map.addTilesetImage('waterc', 'waterc');
        const waterwaveSet = map.addTilesetImage('waterwave', 'waterwave');


        // 3) create your layers in the same order Tiled intended
        // Background first, so it ends up at the back:
        map.createLayer('Background', [bgSet], 0, -50).setDepth(-3);

        // Platforms in the middle—also turn on collisions by property:
        // map.createLayer('Platforms', [tileSet], 0, -40)
        //     .setDepth(0)
        //     .setCollisionByProperty({ collides: true });

        // Hazards on top of platforms (so you can fall into them, etc.):
        map.createLayer('Hazards', [waterwaveSet], 0, 0)
            .setDepth(-2)
            .setCollisionByProperty({ collides: true });

        this.anims.create({
            key: 'slime-idle',
            frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 11 }),
            frameRate: 4,
            repeat: -1
        });
        const platformsLayer = map
            .createLayer('Platforms', [tileSet], 0, -40)   // use y=0 unless you really need an offset
            .setDepth(1)
            .setCollisionByProperty({ collides: true });

        // Add level-specific stuff
        this.add.text(20, 20, 'This is Level 1', {
            font: '20px Arial',
            fill: '#fff'
        });

        // 🪵 PLATFORMS
        // this.platforms = this.physics.add.staticGroup();






        this.physics.world.createDebugGraphic();
        this.physics.world.drawDebug = true;
        this.physics.add.collider(this.fireballs, platformsLayer, this.onFireballHit, null, this); this.enemy = new EnemySlime(this, 300, 500);

        // Add collider

        this.physics.add.collider(this.enemy, platformsLayer);
        this.physics.add.collider(this.player, platformsLayer, this.onPlayerHit, null, this); }

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
