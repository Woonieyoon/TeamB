(function(global, doc){
	
	$(function(){
	
		$('#loginId').on('propertychange change keyup paste input', function() {
		    var loginIdValue = $(this).val();
		    var loginPwValue = $('#loginPw').val();
		    
		    if(loginIdValue != "" && loginPwValue != "") {
		    	$('#btn_login').css({'background-color':'#3897f0'});
		    	$('#btn_login').css({'box-shadow':'2px 1px 5px 1px gray'});
		    	$('#btn_login').css({'cursor':'pointer'});
		    	$('#btn_login').attr('disabled',false);
		    }else{
		    	$('#btn_login').css({'background-color':'#C4E0FB'});
		    	$('#btn_login').css({'box-shadow':'none'});
		    	$('#btn_login').css({'cursor':'none'});
		    	$('#btn_login').attr('disabled',true);
		    	
		    }
		});
		
		$('#loginPw').on('propertychange change keyup paste input', function() {
			var loginIdValue = $('#loginId').val();
		    var loginPwValue = $(this).val();
		    
		    if(loginIdValue != "" && loginPwValue != "") {
		    	$('#btn_login').css({'background-color':'#3897f0'});
		    	$('#btn_login').css({'box-shadow':'2px 1px 5px 1px gray'});
		    	$('#btn_login').css({'cursor':'pointer'});
		    	$('#btn_login').attr('disabled',false);
		    }else{
		    	$('#btn_login').css({'background-color':'#C4E0FB'});
		    	$('#btn_login').css({'box-shadow':'none'});
		    	$('#btn_login').css({'cursor':'none'});
		    	$('#btn_login').attr('disabled',true);
		    }
		});
		
		doc.getElementById('btn_login').onclick = function(){
			doc.getElementById('authForm').submit();
		}
		
		/* document.getElementById('btn_logout').onclick = function(){
			document.location.href = "member/logout.do";	
		} */
		
		doc.getElementById('btn_join').onclick = function(){
			doc.location.href = "member/join.do";
		}
		
	});
	
}(window, document))