(function(global,doc){
	
	$.namespace('instagram.MyPage');
	instagram.MyPage = function(no){
		this.no = no;
		this.initialize();
	};
	
	instagram.MyPage.prototype.initialize = function(){
		$('#main-btn-insert').css({'visibility':'hidden'});
		$('#main-btn-insert-div').css({'visibility':'hidden'});
		$("#main-content").empty();
	};
	
	instagram.MyPage.prototype.render = function(){
		var that = this;
		$('#main-content').html(this.getHTML());
	};
	
	instagram.MyPage.prototype.getHTML = function(){
		$.get(`${_actionUrl}/member/myPage.do?memberNo=${this.no}`)
		.done(function(data){
			var profile_message = data.message;
			if(profile_message == null){
				profile_message = "";
			}
			
			// 프로필 부분
			var tempProfileHTML = `<section class="mypage-section">
                        <header class="mypage-header">
                            <div class="mypage-profile-image-div">
                                <div class="mypage-profile-image">
                                      <img src="${_actionUrl}${data.memberImage.path}/${data.memberImage.name}.${data.memberImage.extension}" alt="">
                                </div>
                            </div>
                            <div class="mypage-profile-info-div">
                                <div class="mypage-profile-info-top">
                                    <div class="mypage-profile-id">
                                        ${data.loginID}
                                    </div>
                                    <div class="mypage-profile-btn-update" id="mypage-profile-btn-update">
                                        		프로필 편집
                                    </div>
                                    <div class="mypage-profile-btn-logout" id="mypage-profile-btn-logout">
                                        		로그아웃
                                    </div>
                                </div>
                                <ul class="mypage-profile-info-mid">
                                    <li>
                                        <label>게시물</label>
                                        <span>${data.postImage.length}</span>
                                    </li>
                                    <li>
                                        <label>팔로워</label>
                                        <span>146</span>
                                    </li>
                                    <li>
                                        <label>팔로우</label>
                                        <span>138</span>
                                    </li>
                                </ul>
                                <div class="mypage-profile-info-bottom">
                                    ${profile_message}
                                </div>
                            </div>
                        </header>
                        <div class="mypage-content">
                            <div class="mypage-post-div">
                            </div>
                        </div>
                    </section>`;
			
			$("#main-content").append(tempProfileHTML);
			var images = data.postImage;
			var loginId = data.loginID;
			for(let i=0;i<images.length;i++){	
				var tempImageHTML = `<div class="mypage-post-image" id="mypage-post-image-${data.postImage[i].NO}">
	            <img src="${_actionUrl}${data.postImage[i].PATH}/${data.postImage[i].NAME}.${data.postImage[i].EXTENSION}" alt="">
	            	<div class="mypage-post-info">
	                	<span class="like-icon"></span><span>${data.postImage[i].likeCount}</span>
	                	<span class="comment-icon"></span><span>${data.postImage[i].replyCount}</span>
	                </div>
	            </div>`

				$(".mypage-post-div").append(tempImageHTML);
//				각 이미지 hover
				$("#mypage-post-image-"+data.postImage[i].NO).hover(function(){
					$('#mypage-post-image-' + data.postImage[i].NO + '>div').css({'visibility':'visible'});
				},function(){
					$('#mypage-post-image-' + data.postImage[i].NO + '>div').css({'visibility':'hidden'});
				});
				
				$("#mypage-post-image-"+data.postImage[i].NO).click(function() {
					data.no = data.postImage[i].NO;
					data.member = {};
					data.member.loginId = {};
					data.member.loginId = data.loginID;
					new instagram.PostDetail(data).view();
				});
			}
			
//			프로필 편집
			$("#mypage-profile-btn-update").click(function() {
				alert("편집");
				var profileUpdate = new instagram.ProfileUpdate();
				profileUpdate.initialize();
				profileUpdate.render();
			});
			
//			로그아웃
			$("#mypage-profile-btn-logout").click(function() {
				global.location.href = _actionUrl+"/member/logout.do";
			});
			
		})
		.fail(function(e){
			console.log("error : " + e);
		});
	};
	
	instagram.MyPage.prototype.destroy = function(){
		
	}
	
}(window,document))