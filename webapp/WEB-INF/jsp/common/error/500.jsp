<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isErrorPage="true" %><%
    response.setStatus(500);
    exception = exception == null ? (Exception)request.getAttribute("exception") : exception;
    String message = exception == null ? "unknown error" : exception.getMessage();
    message = message == null || message.isEmpty() ? "unknown error" : message;
    %><!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Internal Server Error</title>
</head>
<body>
	<h2>Error Message: <%=message %></h2>
</body>
</html>