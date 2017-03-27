function UIButton( game, width, height, color, label ){
	Phaser.Group.call(this, game);

	this.bg = new ColorRect(game, width, height, color, Math.min(width, height) * 0.5);
	this.bg.inputEnabled = true;
	this.bg.input.useHandCursor = true;
	
	this.bg.events.onInputDown.add( function(){
		this.onPress();
	}, this );

	var font_style = { font: "28px Luckiest", fill: "#FFFFFF" };

	this.label = game.add.text(0, 0, label, font_style);
	this.label.x = ( this.bg.width - this.label.width ) * 0.5;
	this.label.y = ( this.bg.height - this.label.height ) * 0.5;

	this.add(this.bg);
	this.add(this.label);

	this.onPress = function(){};
}

UIButton.prototype = Object.create(Phaser.Group.prototype);
