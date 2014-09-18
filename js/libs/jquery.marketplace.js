define(["parse", "app/models/MarketPost", "helper"], function(Parse, MarketPost, helper) {

	$.fn.PostToMarket = function(options) {
        return this.each(function() {
            var $el = $(this);
            var o = $.extend({}, $.fn.PostToMarket.defaults, options);
            var $form = $(o.marketplaceForm);
            var isHidden = true,
                hasError = false;
            var $postForGrp = $(o.postForGrp);
            var $sendpostBtn = $(o.sendpostBtn);
            var $updatectivityBtn = $(o.updatectivityBtn);
            var $fileControl = $(o.fileControl);

            //handlers
            var show_small_structure = function() {
                $("#update-big").hide();
                $("#structured_postupdate").show();
                $("#structured_hidden_block").removeClass("hidden");
            };

            var switch_update_form = function() {
                switch_text_area();
                $("#structured_hidden_block").toggleClass('hidden');
                $("#update-big").show();
            };

            var switch_text_area = function(){ 
                $('#update-big').attr('class', ' ');
            };

            var createMarketPost = function() {
            	$sendpostBtn.attr('disabled', 'disabled');
                var postData = {},
                $successMessage = $form.find(o.successMessage),
                $errorMessage = $form.find(o.errorMessage),
                errorText = '';

                $successMessage.hide().html('');
                $errorMessage.hide().html('');
                $form.find('input.js-inputField,textarea.js-inputField').each(function(i, elm) {
                	postData[elm.name] = elm.value;
                	if (!elm.value) {
                		$(elm).addClass('error');
                		hasError = true;
                	} else {
                        hasError = false;
                    }
                });
                if (hasError) {
                	$sendpostBtn.removeAttr("disabled");
                    $errorMessage.html('Please fill in required fields.').fadeIn();
                	return false;
                }

                if (!Parse.User.current()) {alert('Please Login in to post');$sendpostBtn.removeAttr("disabled"); return false;};
                var user = Parse.User.current();
                postData.user = user;
                postData.username = user.getUsername();
                if (o.api && o.api === 'transactional') {
                    var MailObject = Parse.Object.extend("trans_MarketPost");
                    var mail = new MailObject();
                    
                    mail.save(postData, {
                        success:function(res) {
                            console.log("Success" + res);

                            //Alerts are lame - but quick and easy
                            alert("Thanks for filling the form!");
                        },
                        error:function(e) {
                            console.dir(e);
                        }
                    });
                    console.log(postData);
                } else {
                    //image upload
                    // if ($fileControl[0].files && $fileControl[0].files.length > 0) {
                    //     var file = $fileControl[0].files[0];
                    //     var name = file.name;
                    //     var parseFile = new Parse.File(name, file);
                    //     parseFile.save().then(function(res) {
                    //         console.log(res);
                    //         postData.uploadImage = parseFile;
                    //     }, function(error) {
                    //         console.log(error);
                    //     });
                    // };
                    // console.log(postData);
                    // $sendpostBtn.removeAttr("disabled");

                    // return;
                    var post = new MarketPost(postData);
                    post.save(null, {
                    	success: function(post) {
            				$successMessage.html('Post Saved Successfully to Marketplace').fadeIn();
                    	},
                    	error: function(post, err) {
            				$errorMessage.html(err).fadeIn();
                    	}
                    });
                }
                $sendpostBtn.removeAttr("disabled");
                return false;
            };
            var post_new_status = function() {
                var postData = {};
                var message = $('#newstatus').val();
                if(message==""){
                    alert("You can't post empty status.");
                    return;
                }

                if($('#post_to_twitter').prop('checked')){
                    var mrkplace_only = "false";
                } else {
                    var mrkplace_only = "true";
                }
                // if(validate_login()['status'] == '1'){
                // ajax_request("post_tweet", 'clear_input', {message: message,mrkplace_only:mrkplace_only}); 
                // }
                // else{
                //   /*$('#btn_must_be_logged').click();*/
                //   /*$('#btn_update_activity').tooltip('show');*/
                //   window.location('/accounts/twitter/login/?process=?login');
                // }
                postData.mrkplaceonly = mrkplace_only;
                postData.message = message;
                postData.nonce = config.ajaxNonce;

                setTimeout(function() {
                    helper.ajaxLoad(null, postData, 'json', 'post', false)
                    .done(function(response) {
                        console.log(response);
                    })
                    .fail(function(error) {
                        console.log(error);
                    });
                }, 500);
                return false;
            };

            var onFileChange = function(evt) {
                $('#files').html('');
                var fileTypes = ["image/png", "image/jpeg", "image/jpg"];
                $('#files').html('');
                for (var i = 0; i < this.files.length; i++) {
                    if ($.inArray(this.files[i].type, fileTypes) === -1 || this.files[i].size > 1000000) {

                        $('#files').append('<div class="alert alert-danger">Please upload images only w/ file size less than 1MB: <b>' + this.files[i].name + '</b></div>');
                        hasError = true;
                    } else {
                        hasError = false;
                    }
                }
            };

            !function() {
                $postForGrp.find('button').each(function(i, elm) {
                    $(elm).on('click', function(evt) {
                    	$postForGrp.find('button.btn-default.active').removeClass('active');
                    	$(this).addClass('active');
                    	//to toogle the twitter form
                        // if($(this).hasClass('show_small')) {
                        //     show_small_structure();
                        // } else {
                        //     switch_update_form();
                        // }
                        $form.find('input.js-postFor').val($(elm).val());

                    });
                });
                $sendpostBtn.on('click', function(e) {
                    createMarketPost();
                });
                $updatectivityBtn.on('click', function(e) {
                    post_new_status();
                });
                $fileControl.on('change', onFileChange);
            }();

        });
    };

    $.fn.PostToMarket.defaults = {
        api: '',
        marketplaceForm: '.marketplaceForm',
        postForGrp: '#post_for',
        sendpostBtn: '#btn_post',
        fileControl: '#fileselect',
        updatectivityBtn: '#btn_update_activity',
        successMessage: '.successMessage',
        errorMessage: '.errorMessage'
    };

    $.fn.leshSearchBox = function(options) {
        return this.each(function() {
            var $el = $(this);
            var o = $.extend({}, $.fn.leshSearchBox.defaults, options);
            var $field;
            var $submitBtn = $el.find(o.searchBtn);
            var timer;

            //handlers
            var changeCategorys = function($a) {
                var $displayValue = $a.find(o.category.value);
                var $select = $a.find(o.category.select);
                $select.on('change', function(evt) {
                  var label = $select.find('option:selected').text();
                  $displayValue.text(label);
                  $field.focus();
                  //activeSubmitBtn(evt, false);
                });
                $displayValue.text($select.find('option:selected').text());
                return $a;
              };

            !function() {
                var $form = $el.find(o.form);

                $field = $el.find(o.field);

                //add field events
                $field.on('focus', function(evt) {
                    $el.addClass(o.class.focus);
                })
                .on('blur', function(evt) {
                    $el.removeClass(o.class.focus);
                });
                changeCategorys( $el.find(o.category.area) );

                // search button
                // $submitBtn.on('click', function(evt) {
                //     if(!$submitBtn.hasClass(o.class.disabled)) {
                //         $form.submit();
                //     }
                //     evt.preventDefault();
                //     evt.stopPropagation();
                // });

            }();//end
        });
    };

    $.fn.leshSearchBox.defaults = {
        class: {
          focus: 'focus',
          active: 'active',
          disabled: 'disabled'
        },
        form: 'form',
        searchBtn: '#searchSubmit',
        field: '#search_query',
        category: {
          area: '.searchGroup',
          value: '.selectValue',
          select: 'select'
        }
  };

});