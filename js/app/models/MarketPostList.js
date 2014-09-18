define(["./MarketPost", "parse"], function(Post, Parse) {
	var MarketPostList = Parse.Collection.extend({
		model: Post
	});

	return MarketPostList;
});