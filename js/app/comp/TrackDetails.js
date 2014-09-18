define(["react"], function(React) {
	var TrackDetails = React.createClass({
		getInitialState: function() {
			return {track: {}};
		},
		handleOnPlay: function() {
			
		},
		render: function() {
			return (
				<div createName="details">
					<p>{this.state.track.title}</p>
					<img src="images/logo_small.png" onClick={this.handleOnPlay} />
				</div>
				);
		}
	});

	return TrackDetails;
});