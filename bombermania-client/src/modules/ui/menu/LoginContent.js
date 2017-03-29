function LoginContent( game, content_width, content_height ){
	Phaser.Group.call(this, game);

	var font_style = { font: "28px Luckiest", fill: "#FFFFFF" };

	var login_lbl = game.add.text(0, 0, "EMAIL", font_style);
	login_lbl.x = ( content_width - login_lbl.width ) * 0.5;
	login_lbl.y = content_height * 0.1;
	this.add(login_lbl);

	var login_tf = game.add.inputField(10, 90, {
	    font: '23px Luckiest',
	    fill: '#FFFFFF',
		backgroundColor: "#575957",
		cursorColor: "#FFFFFF",
	    width: content_width * 0.65,
	    padding: 9,
		borderWidth: 0,
		borderColor: "#575957",
	    borderRadius: 100
	});
	login_tf.x = ( content_width - login_tf.width ) * 0.5;
	login_tf.y = login_lbl.y + content_height * 0.07;
	this.add(login_tf);

	var password_lbl = game.add.text(0, 0, "PASSWORD", font_style);
	password_lbl.x = ( content_width - password_lbl.width ) * 0.5;
	password_lbl.y = content_height * 0.30;
	this.add(password_lbl);

	var password_tf = game.add.inputField(10, 90, {
	    font: '23px Luckiest',
	    fill: '#FFFFFF',
		backgroundColor: "#575957",
		cursorColor: "#FFFFFF",
	    width: content_width * 0.65,
	    padding: 9,
		borderWidth: 0,
		borderColor: "#575957",
	    borderRadius: 100,
		type: PhaserInput.InputType.password
	});
	password_tf.x = ( content_width - password_tf.width ) * 0.5;
	password_tf.y = password_lbl.y + content_height * 0.07;
	this.add(password_tf);

	var signin_button = new UIButton( game, 140, 45, 0x7CC576, "LOG IN");
	signin_button.x = ( content_width - signin_button.width ) * 0.5;
	signin_button.y = content_height * 0.54;
	this.add(signin_button);

	signin_button.onPress = function(){
		webAuth.client.login({
			realm: 'Username-Password-Authentication',
			username: login_tf.value,
			password: password_tf.value,
			scope: 'openid profile',
			audience: 'https://flint0.auth0.com/api/v2/',
			avatar: null
		},

		function(error, result){
			if(error){
				var error_msg = game.add.text(0, 0, error.description, font_style);
				error_msg.x = ( content_width - error_msg.width ) * 0.5;
				error_msg.y = content_height * 0.30;
			}
			else{
				console.log(result);

				var xmlHttp = new XMLHttpRequest();
			    xmlHttp.onreadystatechange = function() {
			        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
						context.onRegularLogin( JSON.parse(xmlHttp.responseText), login_tf.value );
			    }
			    xmlHttp.open("GET", "https://flint0.auth0.com/userinfo", true); // true for asynchronous
				xmlHttp.setRequestHeader("Authorization", "Bearer "+result.accessToken)
			    xmlHttp.send(null);
				//var token = result.accessToken;
			}
		});
	}

	// var or_lbl = game.add.text(0, 0, "OR", font_style);
	// or_lbl.x = ( content_width - or_lbl.width ) * 0.5;
	// or_lbl.y = content_height * 0.7;
	// this.add(or_lbl);
	//
	// var facebook_button = new UIButton( game, 320, 45, 0x0072BC, "SIGN IN VIA FACEBOOK");
	// facebook_button.x = ( content_width - facebook_button.width ) * 0.5;
	// facebook_button.y = content_height * 0.83;
	// this.add(facebook_button);
	//
	var context = this;
	// facebook_button.onPress = function(){
	// 	webAuth.popup.authorize({
	// 		connection: 'facebook',
	// 		responseType: 'token'
	// 	},
	//
	// 	function(error, result){
	// 		if(error){
	// 			console.log(error);
	// 		}
	// 		else{
	// 			console.log(result);
	//
	// 			var xmlHttp = new XMLHttpRequest();
	// 		    xmlHttp.onreadystatechange = function() {
	// 		        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
	// 					context.onFacebookLogin( JSON.parse(xmlHttp.responseText) );
	// 		    }
	// 		    xmlHttp.open("GET", "https://flint0.auth0.com/userinfo", true); // true for asynchronous
	// 			xmlHttp.setRequestHeader("Authorization", "Bearer "+result.accessToken)
	// 		    xmlHttp.send(null);
	// 		}
	// 	});
	// }

	// this.onFacebookLogin = function( user_data ){};
	this.onRegularLogin = function( user_data ){};
}

LoginContent.prototype = Object.create(Phaser.Group.prototype);
