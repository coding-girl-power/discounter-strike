
const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  autoRound: false,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create
  }
};

function preload() {
  this.load.image('logo', 'assets/logo.png');
}

function create() {
  const logo = this.add.image(400, 150, 'logo');

  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: 'Power2',
    yoyo: true,
    loop: -1
  });
}

const myGame = new Phaser.Game(config);
