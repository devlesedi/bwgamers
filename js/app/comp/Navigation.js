define(["react", 
	"jquery.marketplace", 
	"showdown", 
	"text!templates/Login.html",
	"text!templates/Register.html"
	], 
	function(React, PostToMarket, Showdown, LoginTpl, RegisterTpl) {

	var SearchComponent = React.createClass({
		componentDidMount: function() {
			$('.js-searchBox').leshSearchBox();
		},
		handleSearchSubmit: function(e) {
			var term = this.refs.search.getDOMNode().value;
			var category = this.refs.category.getDOMNode().value;
			this.props.onSearchSubmit({search:term, category: category});
			return false;
		},
		render: function() {
			return (
				<div className="input-group pull-left border0 js-searchBox searchBox">
				<form className="searchForm form-inline" onSubmit={this.handleSearchSubmit}>
					<div className="input-group border0">
						<input type="hidden" name="stype" value="produce" id="search_stype" />
						<div className="input-group-btn border0 searchGroup">
							<div type="button" id="searchSelect">
							<span id="search_type"><i className="fa fa-cutlery icon"></i> <span className="hidden-xs selectValue">Produce</span><i className="fa fa-caret-down"></i></span> 
							</div>
							<select className="select" name="category" ref="category">
								<option value="marketplace">Marketplace</option>
								<option value="game">Games</option>
								<option value="accessories">Accessories</option>
							</select>
						</div>
						<input type="text" className="form-control pull-left" id="search_query" placeholder="Search" ref="search"/>
						<div className="input-group-btn"> 
                        <button type="submit" className="btn btn-default" id="searchSubmit">
                          <span className="glyphicon glyphicon-search"></span> 
                        </button> 
                      </div>
					</div>
				</form>
				</div>
				);
		}
	});

	var ActionMarktPlc = React.createClass({
		componentDidMount: function() {
			$('#newtwitterpost').PostToMarket();
		},
		render: function() {
			return (
				<div className="pull-right border-left user-action">
					<button type="button" className="btn btn-primary btn-stroke btn-sm hidden-xs hidden-sm postToMarket" data-toggle="collapse" data-target="#newtwitterpost">
	                  <i className="fa fa-bullhorn fa-fw text-primary" />
	                  <span>Post in marketplace</span>
	                </button>

	                <a className="hidden-md hidden-lg" data-toggle="collapse" data-target="#newtwitterpost">
	                  <i className="fa fa-edit fa-2x innerT text-primary" />
	                </a>
				</div>
				);
		}
	});
	var ActionLoginRegister = React.createClass({

		render: function() {
			if (!this.props.user) {
			return (
				<div className="pull-right border-left user-action">
					<button type="button" className="btn btn-primary btn-stroke btn-sm hidden-xs hidden-sm loginButton" data-toggle="modal" data-target="#loginModal">
	                  <i className="fa fa-bullhorn fa-fw text-primary" />
	                  <span>Login</span>
	                </button>

	                <a className="hidden-md hidden-lg" data-toggle="modal" data-target="#loginModal">
	                  <i className="fa fa-edit fa-2x innerT text-primary" />
	                </a>
	                <span>&nbsp;&nbsp;</span>
	                <button type="button" className="btn btn-primary btn-stroke btn-sm hidden-xs hidden-sm regiterButton" data-toggle="modal" data-target="#registerModal">
	                  <i className="fa fa-bullhorn fa-fw text-primary" />
	                  <span>Register</span>
	                </button>

	                <a className="hidden-md hidden-lg" data-toggle="modal" data-target="#registerModal">
	                  <i className="fa fa-edit fa-2x innerT text-primary" />
	                </a>
				</div>
				);
			} else {
				return (
					<div></div>
					);
			}
		}
	});

	var ModalLoginRegister = React.createClass({
		handleLogin: function(e) {
			e.preventDefault();
			var ue,up,$el = $(e.target);
			ue = $el.find('input[type=email]').val();
			up = $el.find('input[type=password]').val();
			if (!ue || !up) {return false;};
			Parse.User.logIn(ue, up, {
				success: function(user) {
					console.log(user);
				},
				error: function(user, err) {
					$el.find('.error-msg').html(err.message).show();
					$el.find('.submit-btn').removeAttr('disabled');
				}
			})
			return false;
		},
		handleRegister: function(e) {
			e.preventDefault();
			var u, ue,up,$el = $(e.target);
			$el.find('.error-msg').empty().hide();
			u = $el.find('#inputUsername').val();
			ue = $el.find('input[type=email]').val();
			up = $el.find('#inputPassword1').val();
			ucp = $el.find('#inputPassword2').val();
			if(/[ ]/.test(u)) {
				$el.find('.error-msg').empty().html('Username cannot contain spaces').show();
				return false;
			}
			if (!u || !ue || !up) {
				$el.find('.error-msg').empty().html('Please fill in all fields.').show();
				return false;
			};
			if (up !== ucp) {
				$el.find('.error-msg').empty().html('Passwords do not match.').show();
				return false;
			};
			Parse.User.signUp(ue, up, {email: ue, loginAs: u, ACL: new Parse.ACL}, {
				success: function(user) {
					console.log(user);
				},
				error: function(user, err) {
					console.error(err);
					$el.find('.error-msg').html(err.message).show();
					$el.find('.submit-btn').removeAttr('disabled');
				}
			});
			return false;
		},
		render: function() {
			var converter = new Showdown.converter();
			var regTpl = _.template(RegisterTpl);
			var registerHtml = converter.makeHtml(regTpl());
			var loginTpl = _.template(LoginTpl);
			var loginHtml = converter.makeHtml(loginTpl());
			return(
				<div className="modal-container">
					<div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					  <div className="modal-dialog">
					    <div className="modal-content">
					      <div className="modal-header">
					        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
					        <h4 className="modal-title" id="myModalLabel">Log In</h4>
					      </div>
					      <div className="modal-body">
							<form className="form-horizontal" role="form" onSubmit={this.handleLogin}>
					      	<div dangerouslySetInnerHTML={{__html: loginHtml}} />
					      	</form>
					      </div>
					      <div className="modal-footer">
					        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
					      </div>
					    </div>
					  </div>
					</div>
					<div className="modal fade" id="registerModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					  <div className="modal-dialog">
					    <div className="modal-content">
					      <div className="modal-header">
					        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
					        <h4 className="modal-title" id="myModalLabel">Register</h4>
					      </div>
					      <div className="modal-body">
					      <form className="form-horizontal" role="form" onSubmit={this.handleRegister}>
					      	<div dangerouslySetInnerHTML={{__html: registerHtml}} />
					      	</form>
					      </div>
					      <div className="modal-footer">
					        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
					      </div>
					    </div>
					  </div>
					</div>

				</div>
				);
		}
	});
	
	var Navigation = React.createClass({
		getInitialState: function() {
			var user = Parse.User.current();
			return {user: user};
		},
		componentDidMount: function() {
			React.renderComponent(
				<ModalLoginRegister onLoginRegister={this.handleLoginRegister} />, document.getElementById('modals-container'));
		},
		handleSearch: function(d) {
			this.props.onSearch(d);
		},
		render: function() {
			return (
				<div>
					<SearchComponent onSearchSubmit={this.handleSearch} />
                    <ActionLoginRegister user={this.state.user} />
                    <ActionMarktPlc />
				</div>
				);
		}
	});

	return Navigation;
});