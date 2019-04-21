import './styles.css';
import Phaser from 'phaser';
import logoImg from './assets/logo.png';

class MyGame {
  config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
      preload: this.preload,
      create: this.create
    }
  };

  game: Phaser.Game;

  constructor() {
    this.game = new Phaser.Game(this.config);
  }

  preload(this: Phaser.Scene) {
    this.load.image('logo', logoImg);
  }

  create(this: Phaser.Scene) {
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
}

const myGame = new MyGame();
