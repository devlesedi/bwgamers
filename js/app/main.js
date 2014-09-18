define(["./router"], function(router) {

	var initialize = function() {
		//checkLogin(runApp);
		runApp();
	};

	var runApp = function() {
		$('#js-slider').unslider({
			speed: 500,               //  The speed to animate each slide (in milliseconds)
			delay: 6000,              //  The delay between slide animations (in milliseconds)
			fluid: true              //  Support responsive design. May break non-responsive designs
		});
		// if(!authenticated)
		// 	window.location.hash = 'login';
		// else
		// 	window.location.hash = 'index';
		new router();
		Backbone.history.start();
	};

	var checkLogin = function(cb) {
		// FB.getLoginStatus(function(response) {
		// 	console.log(response);
	 //    });
	    cb();
	};

	return {
		initialize: initialize
	};
});