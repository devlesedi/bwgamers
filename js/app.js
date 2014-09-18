requirejs.config({
    baseUrl: '/js/',
	paths: {
		"react": 'libs/react',
		"JSXTransformer": 'libs/JSXTransformer-0.11.1',
		"jsx": "libs/jsx",
		"backbone": "libs/backbone",
		"underscore": "libs/underscore-min",
		"jquery": "libs/jquery-1.11.1.min",
        "jquery.marketplace": "libs/jquery.marketplace",
        "unslider": "libs/unslider.min",
        "bootstrap": "libs/bootstrap.min",
        'templates': 'templates',
        "text": "libs/text",
        "facebook": "libs/fb",
        "parse": "libs/parse-1.2.12.min",
        "helper": "utils/helper",
        "showdown": "http://cdnjs.cloudflare.com/ajax/libs/showdown/0.3.1/showdown.min"
	},

	shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'bootstrap': ['jquery'],
        'underscore': {
            exports: '_'
        },
        "jquery.marketplace": ["jquery"],
        "unslider": ["jquery"],
        'facebook': {
            exports: 'FB'
        },
        'parse': {
            exports: 'Parse'
        },
        'showdown': {
            exports: 'Showdown'
        }
    }
});

require(["config/init", "backbone", "bootstrap", "unslider"], function(init) {
   init.init(); 
});