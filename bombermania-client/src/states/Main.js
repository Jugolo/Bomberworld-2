var USERNAME = "Guest";

Retoosh.Main = function (game) {
	this.game = game;
};

Retoosh.Main.prototype = {
  create: function () {
	  var bg = this.game.add.sprite(0, 0, 'background');
	  bg.height = Retoosh.HEIGHT;
	  bg.scale.x = bg.scale.y;
	  bg.x = ( Retoosh.WIDTH - bg.width ) * 0.5;

	  var context = this;

	  /*
	  -------------------------------------------------------
	  	Socket event
	  -------------------------------------------------------
	  */

	  SOCKET.on("room found", this.onRoomFound);

	  /*
	  -------------------------------------------------------
	  	Upper and lower menus
	  -------------------------------------------------------
	  */
	  var upper_menu = new UpperMenu( this.game );

	  upper_menu.onSignipPress = function(){
		  context.toggleSignipPanel();
	  };

	  var lower_menu = new LowerMenu( this.game );
	  lower_menu.y = Retoosh.HEIGHT - lower_menu.height;

	  lower_menu.onContactsPress = function(){
		  context.toggleContacsPanel();

	  };

	  var panels_margin = 40;
	  var panels_height = Retoosh.HEIGHT - upper_menu.height - lower_menu.height - panels_margin * 2;
	  var panels_width = 550;

	  /*
	  -------------------------------------------------------
	  	Sign in/up panel
	  -------------------------------------------------------
	  */

	  this.signip_panel = new TabbedPanel( this.game, panels_width, panels_height );
	  this.signip_panel.default_x = Retoosh.WIDTH - this.signip_panel.width - panels_margin / 2;
	  this.signip_panel.default_y = upper_menu.height + panels_margin;
	  this.signip_panel.x = Retoosh.WIDTH;
	  this.signip_panel.y = this.signip_panel.default_y;

	  var login_content = new LoginContent( this.game, panels_width, panels_height - this.signip_panel.tab_pane.height);
	  this.signip_panel.addTab( "LOG IN", login_content );

	  login_content.onFacebookLogin = function( user_data ){
		  upper_menu.setUsername(user_data.name);

		  var nickname = user_data.given_name.substring(0,1);
		  nickname += user_data.family_name.substring(0, Math.min(6, user_data.family_name.length));

		  upper_menu.setState('authorized');
		  upper_menu.setNickname(nickname);

		  // lower_menu.setState('authorized');

		  context.toggleSignipPanel();
	  };

	  login_content.onRegularLogin = function( user_data, user_mail ){
		  var user_name = user_mail.substring(0, user_mail.indexOf('@'));
		  upper_menu.setUsername(user_name);

		  upper_menu.setState('authorized');
		  upper_menu.setNickname(user_name);

		  // lower_menu.setState('authorized');

		  context.toggleSignipPanel();
	  };

	  var register_content = new RegisterContent( this.game, panels_width, panels_height - this.signip_panel.tab_pane.height);
	  this.signip_panel.addTab( "REGISTER", register_content );

	  register_content.onFacebookRegister = function( user_data ){
		  upper_menu.setUsername(user_data.name);

		  var nickname = user_data.given_name.substring(0,1);
		  nickname += user_data.family_name.substring(0, Math.min(6, user_data.family_name.length));

		  upper_menu.setState('authorized');
		  upper_menu.setNickname(nickname);

		  // lower_menu.setState('authorized');

		  context.toggleSignipPanel();
	  };

	  register_content.onRegularRegister = function( user_data, user_mail ){
		  var user_name = user_mail.substring(0, user_mail.indexOf('@'));
		  upper_menu.setUsername(user_name);

		  upper_menu.setState('authorized');
		  upper_menu.setNickname(user_name);

		  // lower_menu.setState('authorized');

		  context.toggleSignipPanel();
	  };

	  /*
	  -------------------------------------------------------
	  	Contacts panel
	  -------------------------------------------------------
	  */
	  this.contacts_panel = new TabbedPanel( this.game, panels_width, panels_height );
	  this.contacts_panel.default_x = panels_margin / 2;
	  this.contacts_panel.default_y = upper_menu.height + panels_margin;
	  this.contacts_panel.x = -this.contacts_panel.width;
	  this.contacts_panel.y = this.contacts_panel.default_y;

	  // var friends_content = new FriendsContent( this.game, panels_width, panels_height - this.contacts_panel.tab_pane.height);
	  // this.contacts_panel.addTab( "FRIENDS", friends_content );
		//
	  // var requests_content = new RequestsContent( this.game, panels_width, panels_height - this.contacts_panel.tab_pane.height);
	  // this.contacts_panel.addTab( "REQUESTS", requests_content );

	  /*
	  -------------------------------------------------------
	  	Play button
	  -------------------------------------------------------
	  */

	  var play_btn = new UIButton( this.game, 150, 60, 0x000000, 'PLAY!' );
	  play_btn.bg.alpha = 0.8;
	  play_btn.x = ( Retoosh.WIDTH - play_btn.width ) * 0.5;
	  play_btn.y = ( Retoosh.HEIGHT - play_btn.height ) * 0.5;

	  play_btn.onPress = function(){
		  var nickname = upper_menu.getNickname();
		  USERNAME = nickname == "" ? upper_menu.getUsername() : nickname;

		  SOCKET.emit("room request", {name: USERNAME});
		  //this.game.state.start('Game');
	  };

	  /*
	  -------------------------------------------------------
	  	Socket
	  -------------------------------------------------------
	  */
  },

  toggleSignipPanel: function(){
	  var signip_panel = this.signip_panel;

	  if(signip_panel.is_toggled) return;

	  if(signip_panel.is_shown){
		  signip_panel.is_toggled = true;

		  var animation_tween = this.game.add.tween(signip_panel).to( {x: Retoosh.WIDTH, y: signip_panel.y},
			  														  1000, Phaser.Easing.Back.InOut, true );
		  animation_tween.onComplete.add( function(){
			  signip_panel.is_toggled = false;
			  signip_panel.is_shown = false;
		  });
	  }
	  else{
		  signip_panel.is_toggled = true;

		  var animation_tween = this.game.add.tween(signip_panel).to( {x: signip_panel.default_x, y: signip_panel.default_y},
			  														  900, Phaser.Easing.Back.Out, true );
		  animation_tween.onComplete.add( function(){
			  signip_panel.is_toggled = false;
			  signip_panel.is_shown = true;
		  });
	  }
  },

  toggleContacsPanel: function(){
		if (game.sound.mute === true) {
			game.sound.mute = false;
		} else {
			game.sound.mute = true;
		}

	  // var signip_panel = this.contacts_panel;
		//
	  // if(signip_panel.is_toggled) return;
		//
	  // if(signip_panel.is_shown){
		//   signip_panel.is_toggled = true;
		//
		//   var animation_tween = this.game.add.tween(signip_panel).to( {x: -signip_panel.width, y: signip_panel.y},
		// 	  														  1000, Phaser.Easing.Back.InOut, true );
		//   animation_tween.onComplete.add( function(){
		// 	  signip_panel.is_toggled = false;
		// 	  signip_panel.is_shown = false;
		//   });
	  // }
	  // else{
		//   signip_panel.is_toggled = true;
		//
		//   var animation_tween = this.game.add.tween(signip_panel).to( {x: signip_panel.default_x, y: signip_panel.default_y},
		// 	  														  900, Phaser.Easing.Back.Out, true );
		//   animation_tween.onComplete.add( function(){
		// 	  signip_panel.is_toggled = false;
		// 	  signip_panel.is_shown = true;
		//   });
	  // }
  },

  onRoomFound: function( data ){
	  console.log("room found");
	  game.state.start('Game', true, false, data);
  }

};
