define(["react","text!../templates/site.hbs"], function(React, template) {
	var Site = React.createClass({
		render: function() {
			var compile = _.template(template);
			var siteHtml = compile();
			var page = this.props.params.page;
			return (
				<div>
				{siteHtml}
				<page />
				</div>
				);
		}
	});

	return Site;
});