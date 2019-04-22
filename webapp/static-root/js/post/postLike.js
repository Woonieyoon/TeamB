(function(global, doc) {
	$.namespace("instagram.PostLike");
	
	instagram.PostLike = function(vo) {
		this.vo = vo;
	};
	
	instagram.PostLike.prototype.initialize = function() {
		
	};
	
	instagram.PostLike.prototype.destroyFunction = function(){
		
	};
	
	instagram.PostLike.prototype.like = function(){
		var that = this;
		var param = {
				"memberNo" : _memberNo,
				"postNo" : this.vo.no
		};

		$.post(_actionUrl + "/ajax/like.do", param)
		.done(function(data) {
			var post = new instagram.Post(data);
			post.initialize();
			post.renderPost();
		})
		.fail(function(e) {
		    console.log("error : " + e);
		});
	};
	
}(window, document))