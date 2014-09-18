define(["react"], function(React) {
	var FBLogin = React.createClass({
		render: function() {
			return React.DOM.div({
	            className: 'fb-login item',
	            ref: 'fbLogin',
	            dangerouslySetInnerHTML : {
	            	__html: '<fb:login-button scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>'
	            }

	        });
		}
	});

	return FBLogin;
});