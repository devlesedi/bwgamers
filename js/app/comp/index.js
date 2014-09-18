define(["react", "underscore", "helper", "parse", "jsx!./Navigation","jsx!./SongList","jsx!./StreamPosts","jsx!./home", "jsx!./Post"], 
	function(React, _, helper, Parse, Navigation, SongList, StreamPosts, Home, PostView) {
	var IndexComponent = React.createClass({
		getInitialState: function() {
			return {
				data: [],
				initialized: false
			};
		},
		componentDidMount: function() {
    		this.setState({initialized: true});
			React.renderComponent(
				<Navigation onSearch={this.handleSearch} />, document.getElementById('nav'));
			React.renderComponent(
				<StreamPosts />, document.getElementById('streamPosts'));
			if (this.props.params.page === 'find') {
				this.dataLoader();
			};
			//setInterval(this.commentsUpdater, this.props.pollInterval); 
		},
		componentWillReceiveProps: function(nextProps) {
			if (nextProps.params.page === 'find') {
				this.dataLoader(nextProps.params.query, nextProps.params.category);
			};
		},
		jcall: function(data) {
			console.log(data);
		},
		dataLoader: function(query, cat) {
			var results = [];

			var q = query ? query : this.props.params.query;
			var category = cat ? cat : this.props.params.category;
			if (category === 'marketplace') {
				var Post = Parse.Object.extend("MarketPost");
				var MarketPostList = Parse.Collection.extend({
					model: Post
				});
				var list = new MarketPostList;
				list.query = new Parse.Query(Post);
				//TODO: before save to convert to lowercase for proper search
				//http://stackoverflow.com/questions/19248563/how-to-make-a-like-query-in-parse-com
				list.query.contains("title", q);
				// Retrieve the most recent ones
				list.query.descending("createdAt");
				// Only retrieve the last ten
				list.query.limit(10);
				list.query.include['user'];
				list.fetch({
					success: function(res) {
						this.setState({data: list.toJSON()});
					}.bind(this)
				});
			} else {
				var url = 'http://www.giantbomb.com/api/search/?query=' + encodeURIComponent(q) + '&api_key=a0df5156da1afbe77b23bc9685a0552af6730edc&field_list=name,id,image&limit=10&resources=game&json_callback=?';

				helper.ajaxLoad(url, {}, 'jsonp', 'GET', true)
				.done(function(response) {
					_.each(response.results, function(game) {
						results.push(game);
					});

					if (results.length > 0) {
						this.setState({data: results});
					} else {
						alert('Try another search');
					}
				}.bind(this))
				.fail(function() {

				});
			}
	    //     SC.get('/tracks', {q: q, filter: 'streamable'}, function(tracks) {

	    //         _.each(tracks, function(track) {
	    //             if (track.streamable) {results.push(track);}
	    //         });

	    //         if (results.length > 0) {
					// this.setState({data: results});
	    //         } else {
	    //             alert('No stremable tracks were found.');
	    //         }	            
	    //     }.bind(this));
		},
		handleSearch: function(d) {
			//this.dataLoader(d.search, d.category);
			window.location.hash = "find/" + d.category + "/" + encodeURIComponent(d.search);
			this.props.subject = "Results for " + d.search;
		},
		render: function() {
			var classes = [
		      'banner',
		      'page',
		      'panel',
		      this.state.initialized ? 'fadeIn' : ''
		    ].join(' ');
			if (this.props.params.page === 'home') {
				return (
					<Home clName={classes} />
					);
			} else {
				if (this.props.params.category === 'marketplace') {
					var posts = this.state.data.map(function(post) {
						return (
							<PostView post={post} />
							);
					});

					return(
						<ul>
						{posts}
						</ul>
						);
				} else {

					return (
						<div className="page panel">
							<h1 className="panel-heading">
								{this.props.params.subject}
							</h1>
							<div className="panel-body">
								<SongList data={this.state.data} />
							</div>
						</div>
						);
				}
			}
		}
	});

	return IndexComponent;
});