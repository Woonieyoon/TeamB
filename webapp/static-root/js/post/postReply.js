(function(global, doc) {
	$.namespace("instagram.PostReply");
	
	instagram.PostReply = function(vo) {
		this.vo = vo;
	};
	
	instagram.PostReply.prototype.initialize = function() {
		
	};
	
	instagram.PostReply.prototype.destroyFunction = function(){
		
	};
	
	instagram.PostReply.prototype.insertComment = function(){
		var that = this;
		var param = {
				"memberNo" : _memberNo,
				"postNo" : this.vo.no,
				"content" : $("#postComment-" + this.vo.no).val()
		};
		
		$.post(_actionUrl + "/ajax/insertComment.do", param)
		.done(function(data) {
			var post = new instagram.Post(data);
			post.initialize();
			post.renderPost();
		})
		.fail(function(e) {
		    console.log("error : " + e);
		});
	};
	
	instagram.PostReply.prototype.deleteComment = function(replyNo){
		var param = {
				"postNo" : this.vo.no,
				"no" : replyNo
		};
		
		$.post(_actionUrl + "/ajax/deleteComment.do", param)
		.done(function(data) {
			var postDetail = new instagram.PostDetail(data);
			postDetail.view();
		})
		.fail(function(e) {
		    console.log("error : " + e);
		});
		
	}
	
}(window, document))