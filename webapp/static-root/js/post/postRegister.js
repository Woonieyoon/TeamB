(function(global, doc){
	/*
	 * instagrma.PostRegister
	 * */
	$.namespace('instagram.PostRegister');
	instagram.PostRegister = function(vo){
		this.vo = vo;
		this.initialize();
	};
	
	instagram.PostRegister.prototype.initialize = function(){
		
	};
	
	instagram.PostRegister.prototype.render = function(){
		var that = this;
		$('#main-content').html(this.getHTML(this.vo));
		$('#insert-form-btn-register').click(function(){
			that.register();
			$(this).attr('disabled',true);
		});
		$('#insert-form-btn-cancel').click(function(){
			that.cancel();
		});
		$("#post-image-file").on('change', function(){
            readURL(this);
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
	
	instagram.PostRegister.prototype.register = function(){
		var form = $('#insert-post-form')[0];
		var formData = new FormData(form);
		var that = this;
		
		 $.ajax({
             url: '/team-b-webapp/post/insert.do'
             ,processData: false
             ,contentType: false
             ,data: formData
             ,dataType: 'text'
             ,type: 'POST'
             ,success: function(result){
                 if(result == 'success'){
                	 alert('등록성공');
                	 that.cancel();
                 }
             }
             ,error : function(e){
            	 alert('등록실패')
             }
         });
	};
	
	instagram.PostRegister.prototype.cancel = function(){
		var postMain = new instagram.PostMain();
		postMain.initialize();
		postMain.destroy();
	};
	
	instagram.PostRegister.prototype.getHTML = function(vo){
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
                        <label for="post-image-file" class="insert-post-image-label">
                            <img id="preview-post-image" src="/team-b-webapp/static-root/images/insert_instagram_image.png" alt="">
                        </label>
                        <input type="file" class="hide" id="post-image-file" name="postImageFile" value="">
                    </div>
                    <div class="insert-post-content">
                        <div class="insert-post-content-text">
                            <textarea class="insert-post-content-textarea" name="content" cols="30" rows="10" placeholder="내용..."></textarea>
                        </div>
                        <div class="insert-post-hashtag">
                            <textarea class="insert-post-hashtag-textarea" name="hashtag" id="hashtag" cols="30" rows="10" placeholder="해쉬태그..."></textarea>
                        </div>
                    </div>
                    <div class="insert-post-btn">
                        <button type="button" id="insert-form-btn-register">등록하기</button>
                        <button type="button" id="insert-form-btn-cancel">취소하기</button>
                    </div>
                </form>
            </section>
	`
	};

	instagram.PostRegister.prototype.destroy = function(){
		
	};
	
}(window, document))