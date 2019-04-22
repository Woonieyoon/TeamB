(function(global, doc) {
	$.namespace("instagram.SearchUser");
	
	instagram.SearchUser = function(memberId) {
		this.memberId = memberId;
	};
	
	instagram.SearchUser.prototype.initialize = function() {
		
	};
	
	instagram.SearchUser.prototype.destroyFunction = function(){
		
	};
	
	instagram.SearchUser.prototype.search = function(){
		var that = this;
		
		$.get(_actionUrl + "/ajax/searchUser.do?memberId=" + this.memberId)
		.done(function(data) {
			if (data != 0) {
				new instagram.MyPage(data).render();
			} else {
				alert("존재하지 않는 아이디");
			}
		})
		.fail(function(e) {
		    console.log(e);
		});
	};
	
}(window, document))