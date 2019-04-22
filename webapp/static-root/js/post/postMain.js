(function(global, doc) {
	$.namespace("instagram.PostMain");
	
	instagram.PostMain = function(){
		this.postList = new instagram.PostList();
		this.searchUser = new instagram.SearchUser();
		var that = this;
		
		$("#eventSource").on("instagram.PostMain.initialized", function(e){
			that.postList.initialize();
			that.postList.fetchList();
		});
		$("#eventSource").on("instagram.searchHashtag", function(e){
			that.postList.initialize();
			that.postList.fetchList();
		});
		$("#eventSource").on("instagram.searchUser", function(e){
			var searchValue = $("#searchValue").val();
			new instagram.SearchUser(searchValue).search();
		});
		
		$('#main-btn-insert').click(function(){
			new instagram.PostRegister(that.vo).render();
			$("#eventSource").trigger("instagram.HiddenInsertPostBtn");
		});
	};
	
	instagram.PostMain.prototype.initialize = function(){
		var that = this;
		$("#eventSource").trigger("instagram.PostMain.initialized");
		console.log("PostMain initialized");
		
	};
	
	instagram.PostMain.prototype.destroy = function(){
		console.log("destroyed");
		$("#eventSource").off("instagram.PostMain.initialized");
	};
	
	$(function(){
		var postMain = new instagram.PostMain();
		postMain.initialize();
		postMain.destroy();
	});

}(window, document))