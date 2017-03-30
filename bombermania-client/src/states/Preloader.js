Retoosh.Preloader = function (game) { this.game = game;};

Retoosh.Preloader.prototype = {
  preload: function () {

	  game.load.atlasJSONArray('ingame', '/assets/spritesheets/ingame.png', '/assets/spritesheets/ingame.json');

	  game.load.image('background', 'assets/textures/background.png')
	  game.load.image('soundon', 'assets/textures/soundon.png')
	  game.load.image('soundoff', 'assets/textures/soundoff.png')
	  game.load.image('donate_icon', 'assets/textures/donate_icon.png')

	  game.load.audio('death_snd', '/assets/sounds/death.wav');
	  game.load.audio('explosion_snd', '/assets/sounds/explosion.wav');
	  game.load.audio('pickup_snd', '/assets/sounds/pickup.wav');
	  game.load.audio('revive_snd', '/assets/sounds/revive.wav');
  },
  create: function () {
      this.game.state.start('Main');
  }
};
