define(["react", "parse", "../models/MarketPost", "../models/MarketPostList", "jsx!./Post"], function(React, Parse, Post, PostList, PostView) {
	var StreamComponent = React.createClass({
		getInitialState: function() {
			return {
				data: [],
				initialized: false
			};
		},
		componentDidMount: function() {
			//this.getPosts();
			//setInterval(this.commentsUpdater, this.props.pollInterval); 
		},

		getPosts: function() {
			var list = new PostList;
			list.query = new Parse.Query(Post);
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
		},

		render: function() {
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
		}
	});

	return StreamComponent;
});