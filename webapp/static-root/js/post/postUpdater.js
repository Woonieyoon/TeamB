(function(global, doc){
	/*
	 * instagram.PostUpdater
	 */
	$.namespace('instagram.PostUpdater');
	instagram.PostUpdater = function(vo){
		this.vo = vo;
	};
	
	instagram.PostUpdater.prototype.initialize = function(){
		
	};
	
	instagram.PostUpdater.prototype.render = function(){
		var that = this;
		var vo = this.vo
		$('#main-content').html(this.getHTML(this.vo));
		$("#post-image-file").on('change', function(){
            readURL(this);
        });
		$('#insert-form-btn-update').on('click', function(){
			that.update();
		});
		$('#insert-form-btn-cancel').on('click', function(){
			new instagram.PostDetail(vo).view();
		});
		
		function readURL(input) {
            if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
            	$('#preview-post-image').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
            }
        }
	};
	
	instagram.PostUpdater.prototype.update = function(){
		var that = this;
		var form = $('#insert-post-form')[0];
		var formData = new FormData(form);
		formData.append('memberNoOfPost', this.vo.member.no);
		formData.append('no', this.vo.no);
		
		$.ajax({
			url : '/team-b-webapp/post/update.do'
			,processData: false
	        ,contentType: false
	        ,data: formData
	        ,dataType: 'text'
	        ,type: 'POST'
	        ,success: function(result){
	            if(result == 'success'){
	            	alert('수정성공');
	            	that.cancel();
	            }
	        }
	        ,error : function(e){
	        	alert('수정실패')
	        }
		});
	};
	
	instagram.PostUpdater.prototype.updateDeleted = function(){
		var that = this;
		var formData = new FormData();
		formData.append('memberNoOfPost', this.vo.member.no);
		formData.append('no', this.vo.no);
		
		$.ajax({
			url : '/team-b-webapp/post/delete.do'
			,processData: false
	        ,contentType: false
	        ,data: formData
	        ,dataType: 'text'
	        ,type: 'POST'
	        ,success: function(result){
	            if(result == 'success'){
	            	alert('삭제성공');
	            	that.cancel();
	            }
	        }
	        ,error : function(e){
	        	alert('삭제실패')
	        }
		});
	};
	
	instagram.PostUpdater.prototype.cancel = function(){
		var postList = new instagram.PostList();
		postList.initialize();
	};
	
	instagram.PostUpdater.prototype.getHTML = function(vo){
		var hashtags = "";
		if (vo.hashtags.length > 0) {
			for (var i = 0; i < vo.hashtags.length; i++) {
				hashtags += vo.hashtags[i].name + " ";
			}
		}
		
		var postImage = "";
		if (vo.postImage != null) {
			postImage = _actionUrl + vo.postImage.path + "/" + vo.postImage.name + "." + vo.postImage.extension;
		}
		
		return `
				<section class="insert-post-section">
			        <form id="insert-post-form" action="">
			            <header class="insert-post-header">
			                <div class="insert-post-member-profile">
			                    <img src="${_memberProfile}" alt="">
			                </div>
			                <div class="insert-post-member-id">
			                    ${_memberId}
			                </div>
			            </header>
			            <div class="insert-post-image">
			                <label class="insert-post-image-label">
			                    <img id="preview-post-image" src="${postImage}" alt="">
			                </label>
			            </div>
			            <div class="insert-post-content">
			                <div class="insert-post-content-text">
			                    <textarea class="insert-post-content-textarea" name="content" cols="30" rows="10">${vo.content}</textarea>
			                </div>
			                <div class="insert-post-hashtag">
			                    <textarea class="insert-post-hashtag-textarea" name="hashtag" id="hashtag" cols="30" rows="10" placeholder="해쉬태그...">${hashtags}</textarea>
			                </div>
			            </div>
			            <div class="insert-post-btn">
			                <button type="button" id="insert-form-btn-update">수정하기</button>
			                <button type="button" id="insert-form-btn-cancel">취소하기</button>
			            </div>
			        </form>
			    </section>
			`
	};
	
	
}(window, document))