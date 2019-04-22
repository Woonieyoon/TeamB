<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" 
    import="java.util.Map, java.util.HashMap, com.fasterxml.jackson.databind.ObjectMapper"%><%
    response.setStatus(500);
    Exception exception = (Exception)request.getAttribute("exception");
    
    String message = exception == null ? "unknown error" : exception.getMessage();
    message = message == null || message.isEmpty() ? "unknown error" : message;
    
   	Map<String, String> resultMap = new HashMap<>();
   	resultMap.put("succeeded", "false");
   	resultMap.put("message", message);
   	ObjectMapper mapper = new ObjectMapper();
%><%=mapper.writeValueAsString(resultMap)  %>