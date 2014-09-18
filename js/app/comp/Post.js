define(["react", "parse"], function(React, Parse) {
	var PostComponent = React.createClass({
		setTransationForm: function() {
			var $form = $('#transactional_input_form'),
				$modal = $('#transactionalModal');
			//$form.reset();
			var post = this.props.post;
			$modal.find('.modal-title').html('Re:' + post.title + ' - ' + post.location);
			$modal.find('#js-objectId').val(post.objectId);
			$modal.find('#js-subject').val('Re:' + post.title + ' - ' + post.location);
			$modal.find('#js-to').val(post.user.objectId);
			$modal.find('#js-to-username').val(post.username);
			$modal.modal();
			$form.submit(this.handleTransactional);
			$('.transactionalModal').PostToMarket({
				api: 'transactional',
		        marketplaceForm: '#transactional_input_form',
		        postForGrp: '#post_for',
		        sendpostBtn: '#postTransactional',
		        successMessage: '.transactionSuccess',
        		errorMessage: '.transactionError'
			});

		},
		handleTransactional: function() {
			console.log('submitted');
			return false;
		},
		render: function() {
			//var img = this.props.post.image ? this.props.post.image.icon_url : '#';
			var post = this.props.post;
			var term;
			if (post.postFor === 'buy')
				term = '[Wanted]';
			else if(post.postFor === 'sell')
				term = '[For Sale]';
			else if(post.postFor === 'trade')
				term = '[Trade/For Sale]';
			return (
					<div className="media">
						<div className="media-img pull-left">
							<div className="thumbnail"><i className="fa fa-user"></i></div>
						</div>
						<div className="media-body">
							<div className="media-content">
								<h4><span className="pre-title">{term}</span>&nbsp;{post.title}</h4>
								<a href="#">
									<i className="fa fa-plus-circle"></i>
									<span onClick={this.setTransationForm}>&nbsp;Add to List</span>
								</a>
							</div>
						</div>
					</div>
				);
		}
	});

	return PostComponent;
});