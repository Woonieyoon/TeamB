<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%><%@
include file="/WEB-INF/jsp/common/env.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="<%=cssUrl%>/common/reset.css">
<link rel="stylesheet" href="<%=cssUrl%>/common/common.css">
<link rel="stylesheet" href="<%=cssUrl%>/member/login.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="<%=jsUrl%>/member/login.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<title>login</title>
</head>
<body>
	<div class="wrap clearfix">
        <div class="login-image-div">
            <div class="login-images">
                <img src="/team-b-webapp/static-root/images/login-first.jpg" alt="">
            </div>
        </div>
        <div class="login-content-div">
            <div class="login-div">
                <div class="login-logo-div"></div>
                <div class="login-form-div">
                    <form class="login-form" id="authForm" action="" method="post">
                        <fieldset>
                            <legend class="screen_out hide">로그인 정보 입력폼</legend>
                            <div class="box_login">
                                <div class="inp_text">
                                    <label for="loginId" class="screen_out hide">아이디</label>
                                    <input type="text" id="loginId" name="loginId" placeholder="전화번호,사용자 이름 또는 이메일">
                                </div>
                                <div class="inp_text">
                                    <label for="loginPw" class="screen_out hide">비밀번호</label>
                                    <input type="password" id="loginPw" name="password" placeholder="비밀번호">
                                </div>
                            </div>
                            <div class="login-btn-box">
                                <input class="login-btn" type="button" id="btn_login" value="로그인" disabled="disabled" />
                            </div>
                            <div class="login-or-box">
                                <div class="login-or-bar"></div>
                                <div class="login-or-text">또는</div>
                                <div class="login-or-bar"></div>
                            </div>
                            <div class="login-facebook-box">
                                <button class="btn-login-facebook">
                                    <span class="login-facebook-logo"></span>
                                    <span class="login-facebook-text">Facebook으로 로그인</span>
                                </button>
                            </div>
                            <a class="forget-password" href="#">비밀번호를 잊으셨나요?</a>
                        </fieldset>
                    </form>
                </div>
            </div>
            <div class="join-btn-div">
                <div class="join-btn-text">
                   	 계정이 없으신가요?
                    <button type="button" id="btn_join">가입하기</button>
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