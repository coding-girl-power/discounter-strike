class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  key_down_callback(event) {

    let hero_movement_speed = 100;

    switch (event.keyCode) {
      case Phaser.Input.Keyboard.KeyCodes.UP:
        this.hero.setVelocityY(-hero_movement_speed);
        this.hero.play('north_walk',true);
        break;

      case Phaser.Input.Keyboard.KeyCodes.DOWN:
        this.hero.setVelocityY(hero_movement_speed);
        this.hero.play('south_walk',true);
        break;

      case Phaser.Input.Keyboard.KeyCodes.LEFT:
        this.hero.setVelocityX(-hero_movement_speed);
        this.hero.play('west_walk',true);
        break;

      case Phaser.Input.Keyboard.KeyCodes.RIGHT:
        this.hero.setVelocityX(hero_movement_speed);
        this.hero.play('east_walk',true);
        break;

      default:
        this.hero.play('turn');
        break;
    }
  }

  key_up_callback(event) {
    switch (event.keyCode) {
      case Phaser.Input.Keyboard.KeyCodes.UP:
        this.hero.play('north_stop');
        break;

      case Phaser.Input.Keyboard.KeyCodes.DOWN:
        this.hero.play('south_stop');
        break;

      case Phaser.Input.Keyboard.KeyCodes.LEFT:
        this.hero.play('west_stop');
        break;

      case Phaser.Input.Keyboard.KeyCodes.RIGHT:
        this.hero.play('east_stop');
        break;

      default:
        break;
    }
    this.hero.setVelocity(0);
  }


  preload() {
    this.load.setPath('assets/');
    this.load.atlas('hero', 'hero_8_4_41_62.png', 'hero_8_4_41_62.json');
  }

  create() {
    this.hero = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'hero');
    //this.hero = this.physics.add.sprite(0, 0, 'hero');
    this.hero.depth = 1200;

    this.anims.create({
      key: 'south_stop',
      frames: [{ key: 'hero', frame: '1.png' }]
    });

    this.anims.create({
      key: 'north_stop',
      frames: [{ key: 'hero', frame: '17.png' }]
    });

    this.anims.create({
      key: 'west_stop',
      frames: [{ key: 'hero', frame: '9.png' }]
    });

    this.anims.create({
      key: 'east_stop',
      frames: [{ key: 'hero', frame: '25.png' }]
    });

    this.anims.create({
      key: 'south_walk', // southeast in isometric
      frames: this.anims.generateFrameNames('hero', { prefix: '', suffix: '.png', start: 1, end: 4 }),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: 'north_walk', // northwest in isometric
      frames: this.anims.generateFrameNames('hero', { prefix: '', suffix: '.png', start: 17, end: 20 }),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: 'west_walk', // southwest in isometric
      frames: this.anims.generateFrameNames('hero', { prefix: '', suffix: '.png', start: 9, end: 12 }),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: 'east_walk', // northeast in isometric
      frames: this.anims.generateFrameNames('hero', { prefix: '', suffix: '.png', start: 25, end: 28 }),
      frameRate: 4,
      repeat: -1
    });

    // sorcerer.animations.add('southeast', ['1.png','2.png','3.png','4.png'], 6, true);
    // sorcerer.animations.add('south', ['5.png','6.png','7.png','8.png'], 6, true);
    // sorcerer.animations.add('southwest', ['9.png','10.png','11.png','12.png'], 6, true);
    // sorcerer.animations.add('west', ['13.png','14.png','15.png','16.png'], 6, true);
    // sorcerer.animations.add('northwest', ['17.png','18.png','19.png','20.png'], 6, true);
    // sorcerer.animations.add('north', ['21.png','22.png','23.png','24.png'], 6, true);
    // sorcerer.animations.add('northeast', ['25.png','26.png','27.png','28.png'], 6, true);
    // sorcerer.animations.add('east', ['29.png','30.png','31.png','32.png'], 6, true);

    //this.cameras.main.startFollow(this.hero);
    this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown', this.key_down_callback, this);
    this.input.keyboard.on('keyup', this.key_up_callback, this);
  }

  update() {
  }
}
