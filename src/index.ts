import './styles.css';
import Phaser, { Scene, Game, GameObjects, Physics, Input } from 'phaser';

// maybe consider parcel-static-files-copy
// https://github.com/elwin013/parcel-plugin-static-files-copy

import bombImg from './assets/bomb.png';
import dudeImg from './assets/dude.png';
import platformImg from './assets/platform.png';
import skyImg from './assets/sky.png';
import starImg from './assets/star.png';

let player: Physics.Arcade.Sprite;
let platforms: Physics.Arcade.StaticGroup;
let stars: Physics.Arcade.Group;
let bombs: Physics.Arcade.Group;
let cursors: Input.Keyboard.CursorKeys;
let scoreText: GameObjects.Text;
let score = 0;
let gameOver: boolean = false;

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

function preload(this: Scene) {
  this.load.image('sky', skyImg);
  this.load.image('ground', platformImg);
  this.load.image('star', starImg);
  this.load.image('bomb', bombImg);
  this.load.spritesheet('dude', dudeImg, {
    frameWidth: 32,
    frameHeight: 48
  });
}

function create(this: Scene) {
  this.add.image(400, 300, 'sky');
  scoreText = this.add.text(16, 16, 'score: 0', {
    fontSize: '32px',
    fill: '#000'
  });
  platforms = this.physics.add.staticGroup();
  platforms
    .create(400, 568, 'ground')
    .setScale(2)
    .refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  player = this.physics.add.sprite(100, 450, 'dude');
  cursors = this.input.keyboard.createCursorKeys();
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  // player.body.gravity.set(0, 300);
  this.physics.add.collider(player, platforms);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  stars.children.iterate(function(child: GameObjects.GameObject) {
    (<Phaser.Physics.Arcade.Image>child).setBounceY(
      Phaser.Math.FloatBetween(0.4, 0.8)
    );
  });
  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, collectStar, undefined, this);

  bombs = this.physics.add.group();
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(player, bombs, hitBomb, undefined, this);
}

function hitBomb(this: Scene, player: any, bomb: any) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('turn');
  gameOver = true;
}

function collectStar(player: any, star: GameObjects.GameObject) {
  (<Physics.Arcade.Image>star).disableBody(true, true);
  score += 10;
  scoreText.setText('Score: ' + score);

  if (stars.countActive(true) === 0) {
    stars.children.iterate(function(child: GameObjects.GameObject) {
      const c = <Physics.Arcade.Image>child;
      c.enableBody(true, c.x, 0, true, true);
    });
    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
}

function update(this: Scene) {
  if (gameOver) {
    return;
  }
  if (cursors.left && cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right && cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if (cursors.up && cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

const myGame = new Game(config);
