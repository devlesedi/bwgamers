define(function(require) {
	var ajaxLoad = function(url, data, dataType, type, is_crossDomain) {
		var defer = $.Deferred();
		var ajaxData = {
			url: url? url : null,
			data: data? data : {},
			dataType: dataType? dataType : 'json',
			type: type? type : 'post',
			success: defer.resolve,
			error: defer.reject
		};
		if(is_crossDomain === true) {
			ajaxData.url = ajaxData.url.replace(/^\//, '');
			ajaxData.data.format = 'jsonp';
			ajaxData.xhrFields = {withCredentials: true};
			ajaxData.crossDomain = true;
		}
		$.ajax(ajaxData);
		return defer.promise();
	};

	return {
		ajaxLoad: ajaxLoad
	};
});