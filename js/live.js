// /** @jsx React.DOM */
// // var editor = CodeMirror.fromTextArea(document.getElementById('react1'), {
// // 	mode: 'javascript',
// // 	lineNumbers: true,
// // 	lineWrapping: true,
// // 	smartIndent: false,  // javascript mode does bad things with jsx indents
// // 	matchBrackets: true,
// // 	readOnly: true
// // });

// $(function() {
// 	var comments = [
// 		{author: 'Lesedi Ramahobo', content: 'Content for comment no.1'},
// 		{author: 'Jacob Noname', content: 'Content for comment no.2'},
// 		{author: 'Micah Kilo', content: 'Content for comment no.3'},
// 		{author: 'Kate Ruxo', content: 'Content for comment no.4'}
// 	];

// 	var HelloMessage = React.createClass({displayName: 'HelloMessage',
// 	  render: function() {
// 	    return React.DOM.div(null, "Hello ", this.props.name);
// 	  }
// 	});

// 	React.renderComponent(HelloMessage({name:"John"}), document.getElementById('playgroundPreview'));

// 	var Comment = React.createClass({
// 		render: function() {
// 			return (
// 				<div className="comment">
// 					<h4 className="commentAuthor">{this.props.author}</h4>
// 					<p>{this.props.children}</p>
// 				</div>
// 				)
// 		}
// 	})

// 	var CommentList = React.createClass({
// 		render: function() {
// 			var commentNodes = this.props.data.map(function(record) {
// 				return (
// 					<Comment author={record.author}>
// 						{record.content}
// 					</Comment>
// 					);
// 			});
// 			return (
// 				<div className="commentList">
// 					{commentNodes}
// 				</div>
// 				);
// 		}
// 	});


// 	var CommentForm = React.createClass({
// 		onFormSubmit: function() {
// 			var author = this.refs.author.getDOMNode().value.trim();
// 			var text = this.refs.text.getDOMNode().value.trim();
// 			if (!author || !text) {
// 				return false;
// 			};

// 			this.props.onCommentSubmit({author:author,content: text});
// 			this.refs.author.getDOMNode().value = '';
// 			this.refs.text.getDOMNode().value = '';
// 			return false;
// 		},
// 		render: function() {
// 			return (
// 				<form className="CommentForm" onSubmit={this.onFormSubmit}>
// 					<input type="text" placeholder="Name" ref="author" />
// 					<input type="text" placeholder="Comment" ref="text" />
// 					<input type="submit" value="Post" />
// 				</form>
// 				);
// 		}
// 	});

// 	var CommentBox = React.createClass({
// 		getInitialState: function() {
// 			return {data: []};
// 		},
// 		commentsUpdater: function() {
// 			$.ajax({
// 				url: this.props.url,
// 				dataType: 'json',
// 				contentType: "application/json; charset=utf-8",
// 				success: function(data) {
// 					this.setState({data: data});
// 				}.bind(this),
// 				error: function(xhr, status, err) {
// 					console.error(this.props.url, status, err.toString());
// 				}.bind(this)
// 			});
// 		},
// 		handleCommentSubmit: function() {
// 			console.log('sending ur data');
// 		},
// 		componentDidMount: function() {
// 			this.commentsUpdater();
// 			//setInterval(this.commentsUpdater, this.props.pollInterval);
// 		},
// 		render: function() {
// 			return (
// 					<div className="CommentBox">
// 						<h1>Comments</h1>
// 						<CommentList data={this.state.data} />
// 						<CommentForm onCommentSubmit={this.handleCommentSubmit} />
// 					</div>
// 				);
// 		}
// 	});

// 	React.renderComponent(
// 		<CommentBox url="http://localhost/Git/devlesedi.github.io/data/comments.json" pollInterval={7000} />, document.getElementById('commentContainer')
// 		);

// 	// Like Button Module 

// 	var LikeButton = React.createClass({
// 		getInitialState: function() {
// 			return {liked: false};
// 		},
// 		handleClick: function() {
// 			this.setState({liked: !this.state.liked});
// 		},
// 		render: function() {
// 			var text = this.state.liked ? 'unlike' : 'like';
// 			return (
// 				<button className="btn" onClick={this.handleClick}>
// 					{text} this
// 				</button>
// 				);
// 		}
// 	});

// 	React.renderComponent(
// 		<LikeButton />, document.getElementById('likePreview')
// 		);

// 	var filterResults = function(responseData) {
// 		var res = $.map(responseData.results, function(record) {
// 			return {name: record.name, id: record.id};
// 		});
// 		return res;
// 	};
// 	var showResults = function(d) {
// 		console.log(d);
// 	};

// 	// Tyleahead + Bloodhoud module
// 	var games = new Bloodhound({
// 		name: 'giantbomb-games',
// 		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
//   		queryTokenizer: Bloodhound.tokenizers.whitespace,
//   		remote: {
//   			url: 'http://www.giantbomb.com/api/search/?query=%QUERY&api_key=a0df5156da1afbe77b23bc9685a0552af6730edc&format=jsonp&field_list=name,id&limit=10&resources=game&json_callback=?',
// 			ajax: $.ajax({type:'GET',dataType:'jsonp', jsonp: false, jsonpCallback: 'showResults'}),
//   			filter: filterResults                                  
// 		}
// 	});

// 	games.initialize();

// 	$('#typeahead').typeahead(null, {
// 		source: games.ttAdapter(),
// 		name: 'giantbomb-games',
// 		displayKey: 'name'
// 	});
// });