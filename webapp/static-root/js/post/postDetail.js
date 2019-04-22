(function(global, doc) {
	$.namespace("instagram.PostDetail");

	instagram.PostDetail = function(vo) {
		this.vo = vo;
	};

	instagram.PostDetail.prototype.initialize = function() {

	};

	instagram.PostDetail.prototype.destroyFunction = function() {

	};

	instagram.PostDetail.prototype.view = function() {
		var that = this;
		$.get(_actionUrl + "/ajax/postDetail.do?postNo=" + this.vo.no)
		.done(function(vo) {
			var memberProfile = "";
			if (vo.memberImage != null) {
				memberProfile = _actionUrl + vo.memberImage.path + "/" + vo.memberImage.name + "." + vo.memberImage.extension;
			}
			
			var postImage = "";
			if (vo.postImage != null) {
				postImage = _actionUrl + vo.postImage.path + "/" + vo.postImage.name + "." + vo.postImage.extension;
			}
			
			var postLikes = "";
			vo.postLikes.length == 1 ? postLikes = vo.postLikes[0].likeUser + "님이 좋아합니다."
					: vo.postLikes.length > 1 ? postLikes = vo.postLikes[0].likeUser + "님외 " + String(vo.postLikes.length - 1) + "명이 좋아합니다."
							: postLikes = "";
					
			var hashtags = "";
			if (vo.hashtags.length > 0) {
				for (var i = 0; i < vo.hashtags.length; i++) {
					const searchHashtag = `
						<span id="hashtag-${vo.no}-${i}">${vo.hashtags[i].name}</span>
					`;
					hashtags += searchHashtag;
				}
			}

			const html = `
				<section class="detail-post-section">
                    <form id="detail-post-form" action="">
                        <header class="detail-post-header">
                            <div class="detail-post-member-profile">
                                <img src="${memberProfile}" alt="">
                            </div>
                            <div class="detail-post-member-id">
                                ${vo.member.loginId}
                            </div>
                        </header>
                        <div class="detail-post-image">
                            <label class="detail-post-image-label">
                                <img id="preview-post-image" src="${postImage}" alt="">
                            </label>
                        </div>
                        <div class="detail-post-content">
                            <div class="detail-post-content-text" id="detail-post-content-text">
                            	<div class="detail-post-comment-userProfile">
	                            	<img src="${memberProfile}" alt="">
	                            </div>
	                            <span class="detail-post-comment-userid">${vo.member.loginId}</span>
	                            <p class="detail-post-content-textarea" name="" id="">
			                        <span>${vo.content}</span>
						            <span class="detail-post-hashtag">${hashtags}</span>
					            </p>
                            </div>
                            <div class="detail-post-comment" id="detail-post-comment">
                            </div>
                        </div>
                        
                    </form>
                </section>
			`;

			$("#main-content").html(html);
			
			for (var i = 0; i < vo.postReplies.length; i++) {
				var commentMemberImage = ""

				if (vo.postReplies[i].memberImage) {
					var memberImage = vo.postReplies[i].memberImage;
					commentMemberImage = _actionUrl + memberImage.path + "/" + memberImage.name + "." + memberImage.extension;
				}
				
				const comment = `
					<article class="detail-post-comment-article" id="comment-article-${vo.postReplies[i].no}">
						<div class="detail-post-comment-userProfile">
		            		<img src="${commentMemberImage}" alt="">
		                </div>
						<span class="detail-post-comment-userid">${vo.postReplies[i].userId}</span>
						<span class="detail-post-comment-text">${vo.postReplies[i].content}</span>
					</article>
				`;
				$("#detail-post-content-text").append(comment);
				
				if (vo.postReplies[i].memberNo == _memberNo) {
					const commentNo = `${vo.postReplies[i].no}`;
					const deleteComment = `
						<span class="detail-post-comment-delete" id="comment-delete-${vo.postReplies[i].no}">[삭제]</span>
					`;
					
					$("#comment-article-" + vo.postReplies[i].no).append(deleteComment);
					$("#comment-delete-" + vo.postReplies[i].no).click(function () {
						new instagram.PostReply(vo).deleteComment(commentNo);
					});
				}
			}
			
			if (that.vo.member.loginId == _memberId) {
				const updateDeleteButton = `
						<div class="detail-post-btn">
	                        <button type="button" class="detail-form-btn-update" id="detail-form-btn-update-${vo.no}">수정하기</button>
	                        <button type="button" class="detail-form-btn-delete" id="detail-form-btn-delete-${vo.no}">삭제하기</button>
	                    </div>`;
				$("#detail-post-form").append(updateDeleteButton);
			}
			
			$("#btnPostLike-" + vo.no).click(function(){
				new instagram.PostLike(vo).like();
			});
			
			$("#detail-form-btn-update-" + vo.no).click(function(){
				new instagram.PostUpdater(vo).render();
			});
			
			$("#detail-form-btn-delete-" + vo.no).click(function(){
				if(confirm("이 글을 삭제하시겠습니까?")){
					new instagram.PostUpdater(vo).updateDeleted();
				}
			});
			
			if (vo.hashtags.length > 0) {
				for (var i = 0; i < vo.hashtags.length; i++) {
					$("#hashtag-" + vo.no + "-" + i).click(function () {
						$("#main-content").empty();
						new instagram.PostList().fetchList($(this).text());
						$("#searchValue").val($(this).text());
					});
				}
			}
			
			$('#btnPostLike-' + vo.no).css({'background-position':'-78px -203px'});
			for (var i = 0; i < vo.postLikes.length; i++) {
				if (vo.postLikes[i].memberNo == _memberNo) {
					$('#btnPostLike-' + vo.no).css({'background-position':'-52px -203px'});
					break;
				}
			}
			
		}).fail(function(e) {
			console.log("error : " + e);
		});

	};

}(window, document))