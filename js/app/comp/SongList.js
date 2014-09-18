define(["react", "jsx!./Song"], function(React, Song) {
	var SongList = React.createClass({
		render: function() {
			var songs = this.props.data.map(function(record) {
				return (
					<Song track={record} />
					);
			});
			return (
				<div className="song-wrapper">
					{songs}
				</div>
				);
		}
	});

	return SongList;
});