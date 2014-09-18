var initNav = function() {
	$('.tabs li').click(function(e) {
		e.preventDefault();
		var $self = $(this);
		var targetId = $(this).attr('id');
		var activeTab = $('.tabs li.active').attr('id');
		$('.content_wrapper').find('#' + activeTab).css({display: 'none'});
		$('.content_wrapper').find('#' + targetId).slideToggle(300, function() {
			$('.tabs li.active').toggleClass('active');
			$self.toggleClass('active');
		});
	});
};

var parseAPPKEY = "XuMntF7TTSxdRJyoOUYQ2M58kpOWKb7wqdUpWXwC",
	parseJSID = "gwrjv9OcEIU2YEROTfAOoiEDwJTnxpf7UI8f7BPB",
	$commentForm = $('#commentForm');

Parse.initialize(parseAPPKEY, parseJSID);
var PSDMailObject = Parse.Object.extend("PSDMailObject");

function onCommFormSubmit(evt) {
	evt.preventDefault();
	var data = {};
	data.name = $('input[name="name"]').val();
	data.email = $('input[name="email"]').val();
	data.comment = $('textarea[name="comment"]').val();
	if ($('input[name="phone"]').val()) {
		data.phone = $('textarea[name="phone"]').val();
	};

	var error = false;
	$('.required').each(function() {
		if ($(this).hasClass('input-danger') || $(this).val() === '') {
			error = true;
		};
	});

	if (!error) {

		var mail = new PSDMailObject();
		mail.save(data, {
			success:function(res) {
				console.log("Success" + res);

				//Alerts are lame - but quick and easy
				alert("Thanks for filling the form!");
			},
			error:function(e) {
				console.dir(e);
			}
		});
	} else {
		alert('Please complete all required fields.')
	}

};

function calculateTotal() {
	var sum;
	$('input[checked=checked]').each(function() {
		console.log(this);
	});
}

$(document).ready(function() {
	initNav();

	$commentForm.submit(function(evt) {
		onCommFormSubmit(evt);
	});

	function Validator()
	{
	    "use strict";
	}

	Validator.prototype.checkName = function(name)
	{
	    "use strict";
	    return (/[^ a-zA-Z0-9._%+-@]/i.test(name) === false);
	};
	$('.required').each(function() {
		$(this).on('blur', function() {
			var _this = this;
			var $self = $(this);
	        var validator = new Validator();
	        $('.validator').html("");
	        if (validator.checkName(_this.value) === true && _this.value !== '') {
	        	if ($self.hasClass('input-danger')) {
	        		$self.removeClass('input-danger');
	        	};
	            $self.addClass("input-success");
	        }
	        else {
	        	if ($self.hasClass('input-success')) {
	        		$self.removeClass('input-success');
	        	};
	            $self.addClass("input-danger");
	            $('#validator-' + $self.attr('name')).html("Required");
	        }
		});
	});
});