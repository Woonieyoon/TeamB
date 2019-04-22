<%@page import="kr.sys4u.spring.instagram.core.dto.member.Member"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    import="org.springframework.core.env.Environment"
    %><%
	Environment environment = (Environment)request.getAttribute("environment");
    
    String localDirectoryPath = environment.getProperty("fileupload-localDir");
    String imageDirectoryPath = environment.getProperty("fileupload-image-path");
    
    String actionUrl = environment.getProperty("action-url");
	String imageUrl = environment.getProperty("image-url");
    String cssUrl = environment.getProperty("css-url");
    String jsUrl = environment.getProperty("js-url");
    String contextPath = application.getContextPath();
%>
<script>
	var _localDirectoryPath = "<%=localDirectoryPath%>";
	var _imageDirectoryPath = "<%=imageDirectoryPath%>";

	var _actionUrl  =   "<%=actionUrl%>";
	var _imageUrl   =   "<%=imageUrl%>";
	var _cssUrl     =   "<%=cssUrl%>";
	var _jsUrl      =   "<%=jsUrl%>";
	var _contextPath = "<%=contextPath%>";
</script>