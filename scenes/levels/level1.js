// level1.js

// Adjust the import path to match where base_scene.js actually is
import BaseScene from '../base_scene.js';
import EnemySlime from '../objects/enemy_slime.js';
export default class Level1 extends BaseScene {
    constructor() {

        super('Level1');
    }

    preload() {

        super.preload();
        this.load.image('level1_tiles', 'assets/tiles/level1_image.png');
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


        super.create();

        this.add.image(1600, 320, 'level1_tiles').setDepth(-1);

        const map = this.make.tilemap({ key: 'level_one_tiles' });
        const tileSet = map.addTilesetImage('Tile', 'Tile');
        const bgSet = map.addTilesetImage('BG', 'BG');
        const waterwaveSet = map.addTilesetImage('waterwave', 'waterwave');
        this.add.text(2, 4, `Press "E" and Say Slime!`, {
            fontSize: '32px',
            fill: 'Black',
            fontStyle: 'bold',
            align: 'center'
        })
            .setOrigin(0)

            .setDepth(10);        // above most gameplay


        // Background first, so it ends up at the back:
        map.createLayer('Background', [bgSet], 0, 0).setDepth(-3);

        const platformsLayer = map
            .createLayer('Platforms', [tileSet], 0, 0)   // use y=0 unless you really need an offset
            .setDepth(1)
            .setCollisionByProperty({ collides: true });
        this.platformsLayer = platformsLayer;
        const hazardsLayer = map
            .createLayer('Hazards', [waterwaveSet], 0, 0)
            .setDepth(-2)
            .setCollisionByProperty({ isHazard: true });   // ← only these tiles now collide
        this.physics.add.overlap(
            this.player,
            hazardsLayer,
            this.onWaterTouched, // callback
            null,                // no extra filter
            this                 // `this` context so onWaterTouched sees scene
        );

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

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.player.setCollideWorldBounds(true);

        this.cameras.main
            .setBounds(0, 0, map.widthInPixels, map.heightInPixels)
            .startFollow(this.player, false, 1, 1);

        this.cameras.main.setBounds(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels
        );

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn('Web Speech API not supported in this browser');
        } else {
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'en-US';
            this.recognition.continuous = true;
            this.recognition.interimResults = false;

            this.recognition.onresult = this.onVoiceCommand.bind(this);
            this.recognition.onerror = e => console.error('Speech error', e);

            this.recognition.start();
        }

        // listen for the E key to kick off speech recognition
        this.input.keyboard.on('keydown-E', () => {
            if (this.recognition) {
                this.recognition.start();
                console.log('🎤 Voice recognition started via E');
            }
        });









        this.physics.add.collider(
            this.fireballs,
            platformsLayer,

            this.onFireballHitTile,
            null,
            this
        );

        this.cameras.main.startFollow(this.player, false, 1, 1);



        this.physics.world.createDebugGraphic();
        this.physics.world.drawDebug = true;
        this.physics.add.collider(this.fireballs, platformsLayer, this.onFireballHit, null, this);

        this.enemy = new EnemySlime(this, 1500, 400, this.player);
        this.physics.add.collider(
            this.fireballs,
            this.enemy,
            this.onFireballHitEnemy,  // inherited from BaseScene
            null,
            this                      // ensure `this` is your scene, so it finds the handler
        );
        this.physics.add.collider(this.enemy, platformsLayer);

        this.physics.add.collider(this.player, platformsLayer, this.onPlayerHit, null, this);


    }

    // onWaterTouched(player, tile) {
    //     // zero out HP
    //     this.playerHp = 0;
    //     // update the BaseScene’s hpText
    //     this.hpText.setText(`HP: ${this.playerHp}/${this.maxHp}`);
    //     // restart (or show game-over, etc)

    // }


    update(time, delta) {
        // 1) Let BaseScene handle player movement, camera, etc.
        super.update(time, delta);
        this.enemy?.update(time, delta);
        if (this.playerHp <= 0) {
            // this.scene.restart();
            return;   // bail out so you don’t run any more logic this frame
        }
        // 2) Now update your slime’s AI
        if (this.enemy) {
            this.enemy.update(time, delta);
        }

        // Any other per‑frame Level1 logic goes here…
    }


    spawnVoiceSlime() {
        const cam = this.cameras.main;
        const minX = cam.scrollX + 50;
        const maxX = cam.scrollX + this.scale.width - 50;
        const x = Phaser.Math.Between(minX, maxX);
        const y = Phaser.Math.Between(100, this.scale.height - 100);

        const s = new EnemySlime(this, x, y, this.player);

        // hook up collisions:
        this.physics.add.collider(s, this.platformsLayer);
        this.physics.add.collider(this.fireballs, s, this.onFireballHitEnemy, null, this);
    }

    onFireballHitTile(fireball, tile) { //////////////////////////                                               //////?
        console.log('Fireball hit wall at:', tile.x, tile.y);
        fireball.destroy();
    }

    // 2️⃣ When a fireball hits an enemy
    onFireballHitEnemy(enemy, fireball) {
        console.log('🔥 hit callback – enemy =', enemy, 'takeDamage?', typeof enemy.takeDamage);

        fireball.destroy();
        enemy.takeDamage(1);
    }
    onWaterTouched(player, tile) {

        if (this.player.body.blocked.down) {  // or player.y > someThreshold
            this.playerHp = 0;
            this.hpText.setText(`HP: ${this.playerHp}/${this.maxHp}`);
            // this.scene.restart();
        }
    }

    onVoiceCommand(event) {
        const last = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
        if (last.includes('slime')) {
            this.spawnVoiceSlime();
        }
    }

    shutdown() {
        if (this.recognition) {
            this.recognition.stop();
            this.recognition = null;
        }
    }
}
