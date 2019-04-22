<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%><%@
include file="/WEB-INF/jsp/common/env.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="<%=cssUrl%>/common/reset.css">
<link rel="stylesheet" href="<%=cssUrl%>/common/common.css">
<link rel="stylesheet" href="<%=cssUrl %>/member/join.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="/team-b-webapp/static-root/js/member/join.js"></script>
<title>Insert title here</title>
</head>
<body>
	<div class="wrap clearfix">
		<div class="join-image-div">
			<div class="join-images">
				<img src="/team-b-webapp/static-root/images/login-first.jpg" alt="">
			</div>
		</div>
		<div class="join-content-div">
			<div class="join-div">
				<div class="join-logo-div"></div>
				<div class="join-form-div">
					<form class="join-form" id="authForm" action="" method="post" enctype="multipart/form-data">
						<fieldset>
							<legend class="screen_out hide">회원가입 정보</legend>
							<div class="box_join">
								<div class="join-profile-div">
									<label class="join-profile-label" for="join_file">
										<img id="preview-profile-image" src="/team-b-webapp/static-root/images/insert_instagram_image.png" alt="">
									</label> 
									<input class="hide" id="join_file" name="picture" type="file" placeholder="Add profile picture" />
								</div>
								<div class="input-id">
									<label for="joinId" class="screen_out hide">아이디</label> <input
										type="text" name="loginId" id="join_memberId" size="20"
										placeholder="아이디" /> <input type="button"
										id="join_btn_idCheck" value="중복확인" /> 
								</div>
								<div class="input-pw">
									<input type="password" name="password" id="join_memberPwd"
										size="20" placeholder="비밀번호" />
								</div>
								<div class="input-pw">
									<input type="password" name="pwdTwo" id="join_memberPwdTwo"
										size="20" placeholder="비밀번호 확인" />
								</div>
								<div class="join-password-message">
									<label id="label_idCheck"></label></br>
									<!-- <label id="label_pwdCheck"></label></br>
									<label id="label_pwdCheckTwo"></label></br> -->
								</div>
								<p class="join-agreement-text">
								가입하면 Instagram의 <span>약관</span>, <span>데이터정책</span> 및 <span>쿠키</span>
								정책에 동의하게 됩니다.
								</p>
								<div class="join-btn-box">
								<input class="join-btn" type="button" id="btn_join" value="가입" />
								</div>
							</div>
							<!-- <div class="join-btn-box">
								<input class="join-btn" type="button" id="btn_join" value="가입" />
							</div> -->
						</fieldset>
					</form>
				</div>
			</div>
			<div class="login-btn-div">
				<div class="login-btn-text">
					계정이 있으신가요?
					<button type="button" id="btn_loginpage">로그인</button>
				</div>
			</div>
			<div class="download-div">
				<p class="download-text">앱을 다운로드하세요.</p>
				<div class="download-btn-div">
					<a class="appstore" href="#">
                        <img src="/team-b-webapp/static-root/images/download_app_store.png" alt="">
                    </a>
                    <a class="google" href="#">
                        <img src="/team-b-webapp/static-root/images/download_google_play.png" alt="">
                    </a>
                    <a class="microsoft" href="#">
                        <img src="/team-b-webapp/static-root/images/download_microsoft.png" alt="">
                    </a>
				</div>
			</div>
		</div>
	</div>
</body>
</html>