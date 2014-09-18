/** @jsx React.DOM */
define(["backbone", "react", "jsx!app/comp/index"], function(Backbone, React, IndexComponent) {
	return Backbone.Router.extend({
		changeView: function(view, params) {
			var previous = this.currentPage || null;
			var next = view;

			if (previous) {
				this.transitionOut(previous, function() {
					//previous.remove();
				});
			}

			var _new = React.renderComponent(
				next({params: params}), document.getElementById('page')
				);
			this.transitionIn(_new, function() {

			});
			this.currentPage = _new;
		},
		routes: {
			"": "index",
			"find/:q": "find",
			"find/:cat/:q": "find"
		},

		index: function() {
			var params = {
				page: 'home'
			};
			this.changeView(IndexComponent, params);
		},
		find: function(q) {
			var params = {
				page: 'find',
				subject: 'Search',
				query: q
			};
			this.changeView(IndexComponent, params); 
		},
		find: function(cat,q) {
			var params = {
				page: 'find',
				subject: 'Search',
				query: q,
				category: cat
			};
			this.changeView(IndexComponent, params); 
		},

		transitionOut: function(view, callback) {
			$(view.getDOMNode()).removeClass('is-visible')
				.one('transitionend', function() {
					callback();
				});
		},
		transitionIn: function(view, callback) {
			var animateIn = function() {
			$(view.getDOMNode()).addClass('is-visible')
				.one('transitionend', function() {
					callback();
				});
			};
			_.delay(animateIn, 200);
		}
	});
})