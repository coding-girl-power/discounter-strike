class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
    this.game = game;
  }

  preload() {
    this.load.image('logo', 'assets/discounter-strike.png');
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    let w = this.game.canvas.width;
    let h = this.game.canvas.height;

    let w_half = w / 2;
    let h_half = h / 2;

    this.logo = this.add.image(w_half, 50, 'logo').setOrigin(0.5, 0);
    this.logo.displayWidth = w * 0.5;
    this.logo.scaleY = this.logo.scaleX;

    this.add.text(w_half, h_half - 50, 'Discounter Strike', { fontSize: '36px', fill: 'rgb(0,0,0)' }).setOrigin(0.5, 0);
    this.add.text(w_half, h_half + 50, 'Press SPACEBAR to start', { fontSize: '24px', fill: 'rgb(0,0,0)' }).setOrigin(0.5, 0);
  }

  update() {
    if (this.cursors.space.isDown) {
      this.scene.start('GameScene');
    }
  }
}