define(["react", "jsx!./TrackDetails"], function(React, TrackDetails) {
	var SongComponent = React.createClass({
		handleItemTap: function() {
			details = React.renderComponent(
				<TrackDetails />, document.getElementById('details'));
			details.replaceState({track: this.props.track});
		},
		render: function() {
			var imgUrl = this.props.track.image ? this.props.track.image.icon_url : '#';
			var style = {
				backgroundImage: 'url(' + imgUrl + ')'
			};
			return (
					<div className="media">
						<div className="media-img pull-left">
							<div className="boxRatio"></div>
							<div className="img-wrapper">
								<div className="gtImg" style={style} alt={this.props.track.name} />
							</div>
						</div>
						<div className="media-body">
							<div className="media-content">
								<h4>{this.props.track.name}</h4>
								<a href="#">
									<i className="fa fa-plus-circle"></i>
									<span>&nbsp;Add to List</span>
								</a>
							</div>
						</div>
					</div>
				);
		}
	});

	return SongComponent;
});