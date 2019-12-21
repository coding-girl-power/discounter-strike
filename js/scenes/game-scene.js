class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  key_down_callback(event) {
    let hero_movement_speed = 3;

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

  // --> Runs once, loads up assets like images and audio
  preload() {
    this.load.setPath('assets/');
    this.load.atlas('hero', 'hero_8_4_41_62.png', 'hero_8_4_41_62.json');
  }

  // --> Runs once, after all assets in preload are loaded
  create() {
    this.hero = this.matter.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'hero');
    this.hero.depth = 1200;

    this.matter.world.setBounds(0, 0, game.config.width, game.config.height);

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

    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP, true, true);
    this.keyUp.on('down', this.key_down_callback, this);
    this.keyUp.on('up', this.key_up_callback, this);

    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN, true, true);
    this.keyDown.on('down', this.key_down_callback, this);
    this.keyDown.on('up', this.key_up_callback, this);

    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT, true, true);
    this.keyLeft.on('down', this.key_down_callback, this);
    this.keyLeft.on('up', this.key_up_callback, this);

    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT, true, true);
    this.keyRight.on('down', this.key_down_callback, this);
    this.keyRight.on('up', this.key_up_callback, this);
  }

  // --> Runs once per frame for the duration of the scene
  update(time, delta) {
  }
}
