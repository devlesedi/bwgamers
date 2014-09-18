define(["react", "showdown", "text!templates/home.html"], function(React, Showdown, homeTpl) {
	var HomeComponent = React.createClass({
		render: function() {
			var data = [
			{title: 'Add the video games you no longer play.', description: "Adding a game is super easy. Simply select your video games condition and price to sell. When your video game finds a buyer, you'll be notified by email."},
			{title: 'Another member will come along and buy it.', description: "You'll ship them the video game."},
			{title: "Increase your reputation!", description: "After a successful trade, your buyer can leave feedback to commend on your services.!"}
			];
			var converter = new Showdown.converter();
			var compiled = _.template(homeTpl);
			var homerHtml = converter.makeHtml(compiled({steps: data}));
			return(
				<div className={this.props.clName}>
					<h1 className="panel-heading">
						How it works
					</h1>
					<div className="panel-body">
						<ul>
					      	<div dangerouslySetInnerHTML={{__html: homerHtml}} />
						</ul>
					</div>
				</div>
				);
		}
	});
	
	return HomeComponent;
});