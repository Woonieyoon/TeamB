(function(global, doc) {
	
	localStorage.setItem('idCheck',false);
	localStorage.setItem('pwdDoubleCheck',false); //비밀번호 2개 일치
	localStorage.setItem('pwdValidation',false);  //비밀번호 검증 
	
	global.onload = function() {
		
		doc.getElementById('join_btn_idCheck').onclick = function() {
			idCheckFunc();
		}
		
		$("#join_memberPwd").change(function(){
			console.log('pwd change');
			$("#join_memberPwdTwo").val('');
//			$("#label_idCheck").text('');
			localStorage.setItem('pwdDoubleCheck',false); //비밀번호 2개 일치
			localStorage.setItem('pwdValidation',false);  //비밀번호 검증 
			
			let data = $("#join_memberPwd").val();
			if(pwdCheckFunc(data)){
				localStorage.setItem('pwdValidation',true);
//				$("#label_idCheck").text("사용가능한 PWD 입니다.");
				alert("사용가능한 PWD 입니다.");
			}else{
//				$("#label_idCheck").text("");
			}
		});
		
		$("#join_memberPwdTwo").change(function(){
			console.log('pwdTwo change');
			let pwdOne = $("#join_memberPwd").val(); 
			let pwdTwo = $("#join_memberPwdTwo").val();
			if(pwdOne === pwdTwo){
//				$("#label_idCheck").text("비밀번호가 일치합니다.");
				alert("비밀번호가 일치합니다.");
				localStorage.setItem('pwdDoubleCheck',true); 
			}else{
//				$("#label_idCheck").text("비밀번호가 불일치합니다.");
				alert("비밀번호가 불일치합니다.");
				localStorage.setItem('pwdDoubleCheck',false); 
			} 				
		});
		
		// id 중복체크
		var idCheckFunc = function(){
			localStorage.setItem('idCheck',false);
			const idCheckSuccess = "사용 가능 합니다.";
			const idCheckFail = "ID 중복 확인하세요.";
			
			var userId = doc.getElementById('join_memberId').value;
			var idCheck = localStorage.getItem('idCheck');

			if(userId === ''){
				alert('ID를 입력하세요');
//				$('#label_idCheck').text(idCheckFail);
				return;
			}
			
			if(userId.indexOf(" ") != -1){
				alert('아이디에 공백이 들어갈수 없습니다.');
//				$('#label_idCheck').text("아이디에 공백이 들어갈수 없습니다.");
				 return false;
			 }
			
			$.ajax({
				type : "POST",
				data : {
					"userId":userId
				},
				url : "idCheck.do",
				success : function(data) {
					if (data==='1') {
						alert("다른 아이디가 존재")
//						$('#label_idCheck').text(idCheckFail);
						localStorage.setItem('idCheck',false);
					} else {
						alert("사용 가능한 ID")
//						$('#label_idCheck').text(idCheckSuccess);
						localStorage.setItem('idCheck',true);
					}
				},
				error : function(error){
					alert("Error : " + error);
				}
			})
		}
		
		// pwd 체크
		var pwdCheckFunc = function(pwdData){
			 var pwd = pwdData;
			 var num = pwd.search(/[0-9]/g);
			 var eng = pwd.search(/[a-z]/ig);
			 var spe = pwd.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
			 
			 if(pwd.length < 8){
			    alert("8자리 이상 입력해주세요.");
			    return false;
     		 }

			 if(pwd.indexOf(" ") != -1){
				 alert("비밀번호는 공백업이 입력해주세요.");
				 return false;
			 }
			 
			 console.log(`${num},${eng},${spe}`);
			 
			 if( num < 0 || eng < 0 || spe <0 ){
			    alert("영문,숫자,특수문자 혼합하여 입력해주세요.");
                return false;
		     }
			 return true;
		}
		
		doc.getElementById('btn_join').onclick = function() {
			let idCheck = localStorage.getItem('idCheck');
			let pwdDoubleCheck = localStorage.getItem('pwdDoubleCheck');
			let pwdValidation = localStorage.getItem('pwdValidation');
			
			console.log(`${idCheck},${pwdDoubleCheck}.${pwdValidation}`);
			console.log(typeof(idCheck));
			if(idCheck === 'false' || pwdDoubleCheck === 'false' || pwdValidation === 'false'){
				alert('아이디 또는 비밀번호를 다시 입력하세요!!');
				return;
			}
		
			let imageName = doc.getElementById('join_file').value;
			if(imageName == ""){
				alert('프로필 이미지를 설정해주세요!!');
				return;
			}
			console.log("가입 last");
			doc.getElementById('authForm').submit();
		}
		
		$("#join_file").on('change', function(){
            readURL(this);
        });
		
		function readURL(input) {
            if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                    $('#preview-profile-image').attr('src', e.target.result);
                }
              reader.readAsDataURL(input.files[0]);
            }
        }

	}
}(window, document));