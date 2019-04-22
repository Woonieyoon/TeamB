(function(global, doc) {
	$.namespace("instagram.PostList");
	
	instagram.PostList = function(){
		this.posts = [];
	};
	
	instagram.PostList.prototype.initialize = function(){
		var that = this;
		
		$("#eventSource").off("instagram.finishedFetchList");
		$("#eventSource").off("instagram.finishedRenderList");
		
		$("#main-content").empty();
		$("#eventSource").on("instagram.HiddenInsertPostBtn", function(e){
			$('#main-btn-insert').css({'visibility':'hidden'});
			$('#main-btn-insert').attr('disabled', true);
			$('#main-btn-insert-div').css({'visibility':'hidden'});
		});
		$('#main-btn-insert').css({'visibility':'visible'});
		$('#main-btn-insert').attr('disabled', false);
		$('#main-btn-insert-div').css({'visibility':'visible'});
		
		$("#eventSource").on("instagram.finishedFetchList", function() {
			that.renderList();
		});
		
		$("#eventSource").on("instagram.finishedRenderList", function() {
			that.posts = [];
		});
		
		console.log("PostList initialized");
	};
	
	instagram.PostList.prototype.fetchList = function(value){
		var that = this;
		var searchValue = value || $("#searchValue").val();
		var startRowIndex = $(".rownum").last().data("no") + 1 || 1;
		
		searchValue = encodeURIComponent(searchValue);
		
		$.get(`${_actionUrl}/ajax/list.do?searchValue=${searchValue}&startRowIndex=${startRowIndex}`)
		.done(function(data) {
			if (data.length == 0) {
				$("#btnNextPosts").click(function () {
					$("#nextPosts").remove();
				});
				return;
			}
			
			for (var i = 0; i < data.length; i++) {
				that.posts.push(data[i]);
			}
			
			$("#eventSource").trigger("instagram.finishedFetchList");
		})
		.fail(function(e) {
		    console.log("error : " + e);
		});
		
	};
	
	instagram.PostList.prototype.renderList = function(){
		var that = this;
		
		for (var i = 0; i < this.posts.length; i++) {
			const postDiv = `
				<article class="post-article clearfix" id="post-${that.posts[i].no}"></article>
				`;
			
			$("#main-content").append(postDiv);
			var post = new instagram.Post(that.posts[i]);
			post.initialize();
			post.renderPost();
		}
		
		const nextPosts = `
			<div class="nextPosts" id="nextPosts">
            	<input type="button" value="더 보기▽" id="btnNextPosts"/>
            </div>
        `;
		
		$("#main-content").append(nextPosts);
		$("#btnNextPosts").click(function () {
			$("#nextPosts").remove();
			that.fetchList();
		});
		
		$("#eventSource").trigger("instagram.finishedRenderList");
	}
	
}(window, document))