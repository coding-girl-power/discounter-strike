const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  parent: 'game',
  width: 1024,
  height: 768,
  pixelArt: true,
  scene: [ TitleScene, GameScene ],
  physics: {
    default: "matter",
    matter: {
        //debug: true,
        gravity: { y: 0 }
    }
  }
}

const game = new Phaser.Game(config);
