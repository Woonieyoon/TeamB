 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ 
taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><%@
include file="/WEB-INF/jsp/common/env.jsp" %><%
Member loginMember = (Member) request.getSession().getAttribute("loginMember");

String memberProfile = actionUrl + loginMember.getMemberImage().getPath() + "/" + 
		loginMember.getMemberImage().getName() + "." + 
		loginMember.getMemberImage().getExtension();

request.setAttribute("memberProfile", memberProfile);
%>
<!DOCTYPE html>
<html>
<script type="text/javascript">
	var _memberNo = <%=loginMember.getNo()%>;
	var _memberId = "<%=loginMember.getLoginId()%>";
	var _memberMessage = "<%=loginMember.getMessage()%>";
	var _memberProfile = "<%=memberProfile%>";
</script>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="<%=cssUrl%>/common/reset.css">
<link rel="stylesheet" href="<%=cssUrl%>/common/common.css">
<link rel="stylesheet" href="<%=cssUrl%>/common/haeder.css">
<link rel="stylesheet" href="<%=cssUrl%>/member/mypage.css">
<link rel="stylesheet" href="<%=cssUrl%>/post/main.css">
<link rel="stylesheet" href="<%=cssUrl%>/post/post.css">
<link rel="stylesheet" href="<%=cssUrl%>/post/insertPost.css">
<link rel="stylesheet" href="<%=cssUrl%>/post/detailPost.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="<%=jsUrl%>/common/common.js"></script>
<script type="text/javascript" src="<%=jsUrl%>/common/header.js"></script>
<script type="text/javascript" src="<%=jsUrl%>/common/postMainTrigger.js"></script>
<script type="text/javascript" src="<%=jsUrl%>/post/postList.js"></script>
<script type="text/javascript" src="<%=jsUrl%>/post/postLike.js"></script>
<script type="text/javascript" src="<%=jsUrl%>/post/postReply.js"></script>
<script type="text/javascript" src="<%=jsUrl%>/post/postDetail.js"></script>
<script type="text/javascript" src="<%=jsUrl%>/post/post.js"></script>
<script type="text/javascript" src="<%=jsUrl%>/post/searchUser.js"></script>
<script type="text/javascript" src="<%=jsUrl%>/post/postRegister.js"/></script>
<script type="text/javascript" src="<%=jsUrl%>/post/postUpdater.js"/></script>
<script type="text/javascript" src="<%=jsUrl%>/member/myPage.js"></script>
<script type="text/javascript" src="<%=jsUrl%>/post/postMain.js"></script>
</head>
<body>
	<div class="wrap clearfix">
		<header class="top">
			<%@ include file="/WEB-INF/jsp/common/include/header.jsp"%>
		</header>
		<div class="content-wrap clearfix">
			<div class="content-div">
				<div class="main-content" id="main-content">
				</div>
			</div>
			<div class="main-btn-insert-div" id="main-btn-insert-div">
                <button type="button" id="main-btn-insert" onclick=""></button>
            </div>
			<div id="eventSource" style="display: hidden"></div>
		</div>
	</div>
</body>
</html>