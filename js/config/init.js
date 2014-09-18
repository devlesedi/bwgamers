define(["parse", "facebook", "../app/main"], function(Parse, FB, main) {
	var init = function() {
		var parseAPPKEY = "NM04MfQsM72CWpD9ntUtQRuLTrYG5msPGAoLlBaK",
    parseJSID = "PgsOfJY8QsRQU6nPjQbMqMgDDo3cSlrkI08vSW1u",
    $commentForm = $('#commentForm');

    //Initialize Parse SDK
	Parse.initialize(parseAPPKEY, parseJSID);

	Parse.FacebookUtils.init({
		appId      : '1485380731707619', // Facebook App ID
		channelUrl : 'http://localhost/Git/bwmusic/channel.html', // Channel File
		cookie     : true, // enable cookies to allow Parse to access the session
		xfbml      : true  // parse XFBML
	 });

	main.initialize();
	
	};

	return { init: init };
});