(function(global, doc) {
	$(function() {
		$("#searchBox").keydown(function(key) {
			$("#searchValue").val($("#searchBox").val());
			if (key.keyCode == 13) {
				if ($("#searchValue").val().charAt(0) != "#") {
					$("#eventSource").trigger("instagram.searchUser");
					return;
				}
				$("#eventSource").trigger("instagram.searchHashtag");
			}
		});

		$("#logo-div").click(function() {
			$("#searchValue").val("");
			var postList = new instagram.PostList();
			postList.initialize();
			postList.fetchList();
		});

		/*==================My Page==================*/
		$("#userinfo-button-div").click(function() {
			var myPage = new instagram.MyPage(_memberNo);
			myPage.initialize();
			myPage.render();
		});
	});

}(window, document));
