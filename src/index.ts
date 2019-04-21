import './styles.css';
import Phaser, { Game, Scene } from 'phaser';
import logoImg from './assets/logo.png';

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

function preload(this: Scene) {
  this.load.image('logo', logoImg);
}

function create(this: Scene) {
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

const myGame = new Game(config);
