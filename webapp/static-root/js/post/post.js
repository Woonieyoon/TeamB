(function(global, doc) {
	$.namespace("instagram.Post");
	
	instagram.Post = function(vo){
		this.vo = vo;
		console.log("Post Constructor");
	};
	
	instagram.Post.prototype.initialize = function() {
		var that = this;
		
		this.memberProfile = "";
		if (this.vo.memberImage != null) {
			this.memberProfile = _actionUrl + that.vo.memberImage.path + "/" + that.vo.memberImage.name + "." + that.vo.memberImage.extension;
		}
		
		this.postImage = "";
		if (this.vo.postImage != null) {
			this.postImage = _actionUrl + that.vo.postImage.path + "/" + that.vo.postImage.name + "." + that.vo.postImage.extension;
		}
		
		this.postLikes = "";
		this.vo.postLikes.length == 1 ? this.postLikes = this.vo.postLikes[0].likeUser + "님이 좋아합니다."
				: this.vo.postLikes.length > 1 ? this.postLikes = this.vo.postLikes[0].likeUser + "님외 " + String(this.vo.postLikes.length - 1) + "명이 좋아합니다."
						: this.postLikes = "";
				
		this.content = this.vo.content;
		if (this.vo.compressedContent != null) {
			const moreContent = `<span class="moreContent" id="moreContent-${that.vo.no}">더보기</span>`;
			this.content = that.vo.compressedContent + moreContent;
		}
		
		this.hashtags = "";
		if (this.vo.hashtags.length > 0) {
			for (var i = 0; i < that.vo.hashtags.length; i++) {
				const searchHashtag = `
					<span id="hashtag-${that.vo.no}-${i}">${that.vo.hashtags[i].name}</span>
				`;
				this.hashtags += searchHashtag;
			}
		}
		
		this.postReplies = "";
		this.postUserId = "";
		if (this.vo.postReplies.length == 1) {
			this.postUserId = that.vo.postReplies[0].userId;
			this.postReplies = that.vo.postReplies[0].content;
		} else if (this.vo.postReplies.length > 1) {
			this.postUserId = that.vo.postReplies[0].userId;
			this.postReplies = that.vo.postReplies[0].content + `<div id="postDetail-${that.vo.no}">더보기</span>`;
		}
		
	}
	
	instagram.Post.prototype.renderPost = function() {
		var that = this;
		
		const html = `
			<span class="rownum" data-no="${that.vo.rnum}"></span>
            <header class="post-header">
                <div class="member-profile-div">
                    <img src="${that.memberProfile}" alt="${that.vo.member.loginId}">
                </div>
                <div class="member-id-div">
                    <span class="member-id">${that.vo.member.loginId}</span>
                </div>
            </header>
            <div class="post-menu">
                <div class="post-menu-div">
                    <span class="post-menu-btn"></span>
                </div>
            </div>
            <div class="post-image">
                <div class="post-image-div" id="postImage-${that.vo.no}">
                    <img src="${that.postImage}" alt="">
                </div>
            </div>
            <div class="post-content">
                <div class="post-btn-div">
                    <span class="post-btn-like-span">
                        <span class="post-btn-like" id="btnPostLike-${that.vo.no}"></span>
                    </span>
                    <span class="post-btn-comment-span">
                        <span class="post-btn-comment"></span>
                    </span>
                    <span class="post-btn-share-span">
                        <span class="post-btn-share"></span>
                    </span>
                </div>
                <div class="post-like-div">
                    <span class="post-like-count">좋아요 ${that.vo.postLikes.length}개</span>
                    <span class="post-like-text">
                        <span class="post-like-people">${that.postLikes}</span>
                    </span>
                </div>
                <div class="post-content-div">
                    <span class="post-content-memberid">${that.vo.member.loginId}</span>
                    <span class="post-content-text" id="content-${that.vo.no}">${that.content}</span>
                    <div class="post-content-hashtag">
                        ${that.hashtags}
                    </div>
                </div>
                <div class="post-comment-div">
                    <span class="post-comment-userid">${that.postUserId}</span>
                    <span class="post-comment-usertext">${that.postReplies}</span>
                </div>
            </div>
            <div class="post-input-comment">
                <div class="post-input-comment-form-div">
                    <form class="post-input-comment-form" action="">
                        <input type="text" id="postComment-${that.vo.no}" class="post-input-comment-text" placeholder="댓글 달기...">
                        <button type="button" id="btnCommentInsert-${that.vo.no}" class="post-input-comment-btn">게시</button>
                    </form>
                </div>
            </div>
		`;
		
		$("#post-" + that.vo.no).html(html);
		
		$('#btnPostLike-' + that.vo.no).css({'background-position':'-78px -203px'});
		for (var i = 0; i < that.vo.postLikes.length; i++) {
			if (that.vo.postLikes[i].memberNo == _memberNo) {
				$('#btnPostLike-' + that.vo.no).css({'background-position':'-52px -203px'});
				break;
			}
		}
		
		$("#btnPostLike-" + that.vo.no).click(function(){
			new instagram.PostLike(that.vo).like();
		});
		
		$("#btnCommentInsert-" + that.vo.no).click(function(){
			if ($("#postComment-" + that.vo.no).val() == null || $.trim($("#postComment-" + that.vo.no).val()) == "") {
				return;
			}
			new instagram.PostReply(that.vo).insertComment();
		});
		
		$("#main-btn-update-" + that.vo.no).click(function(){
			new instagram.PostUpdater(that.vo).render();
		});
		
		if ($("#moreContent-" + that.vo.no) != null) {
			$("#moreContent-" + that.vo.no).click(function () {
				$("#content-" + that.vo.no).html(that.vo.content);
			});
		}
		
		if (that.vo.hashtags.length > 0) {
			for (var i = 0; i < that.vo.hashtags.length; i++) {
				$("#hashtag-" + that.vo.no + "-" + i).click(function () {
					$("#main-content").empty();
					new instagram.PostList().fetchList($(this).text());
					$("#searchValue").val($(this).text());
				});
			}
		}
		
		$("#postImage-" + that.vo.no).click(function() {
			new instagram.PostDetail(that.vo).view();
		});
		
		$("#postDetail-" + that.vo.no).click(function() {
			new instagram.PostDetail(that.vo).view();
		});
		
	}
	
}(window, document))