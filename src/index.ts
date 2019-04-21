import './styles.css';
import Phaser, { Game, Scene } from 'phaser';
import logoImg from './assets/logo.png';
import groundImg from './assets/ground.png';
import wallImg from './assets/wall.png';
import wallBottomImg from './assets/wall-bottom.png';

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
    this.load.image('ground', groundImg);
    this.load.image('wall', wallImg);
    this.load.image('wall-bottom', wallBottomImg);
}

function create(this: Scene) {
    const roomY = 16;
    const roomX = 25;
    for (let y = 0; y < roomY; y++) {
        for (let x = 0; x < roomX; x++) {
            let img = 'ground';
            if ((y === 0 && x > 0 && x < roomX - 1) || y === roomY - 1) {
                img = 'wall-bottom';
            } else if (x === 0 || x === roomX - 1) {
                img = 'wall';
            }
            this.add.image(x * 32, y * 32, img).setOrigin(0, 0);
        }
    }
}

const myGame = new Game(config);
