const config = {
  type: Phaser.AUTO,
  backgroundColor: '#cccccc',
  parent: 'ph_game',
  width: 1024,
  height: 768,
  scene: [ GameScene ],
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 }
    }
  }
}

const game = new Phaser.Game(config);
