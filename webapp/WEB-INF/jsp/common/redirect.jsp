<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
		String redirectUrl = (String)request.getSession().getAttribute("REDIRECT_URL");   
    	String message = (String)request.getSession().getAttribute("MESSAGE");
%><script>
	if('<%=message%>' !== ''){
		alert('<%=message%>');
	}
	document.location.replace('<%=redirectUrl%>');
</script>