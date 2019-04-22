(function(global,doc){
	
	$.namespace('instagram.ProfileUpdate');
	instagram.ProfileUpdate = function(no){
		this.no = no;
		this.initialize();
	};
	
	instagram.ProfileUpdate.prototype.initialize = function(){
		$('#main-btn-insert').css({'visibility':'hidden'});
		$('#main-btn-insert-div').css({'visibility':'hidden'});
		$("#main-content").empty();
	};
	
	instagram.ProfileUpdate.prototype.render = function(){
		var that = this;
		$('#main-content').html(this.getHTML());
	};
	
	instagram.ProfileUpdate.prototype.getHTML = function(){
		
		return `<label>LOGIN ID</label><input type="text" id="Profile_ID"/></br>
		<label>현재 비밀번호</label><input type="password" id="Profile_CurrentPwd"/></br>
		<label>새 비밀번호</label><input type="password" id="Profile_ChangePwd"/></br>
		<label>새 비밀번호 확인</label><input type="password" id="Profile_ConfirmChangePwd"/></br>
		<label>MESSAGE</label><input type="password" id="Profile_Message"/>`
		
		
		$.get(`${_actionUrl}/member/myPage.do?memberNo=${this.no}`)
		.done(function(data){
			
		})
		.fail(function(e){
			console.log("error : " + e);
		});
	};
	
	instagram.ProfileUpdate.prototype.destroy = function(){
		
	}
	
}(window,document))