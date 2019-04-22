package kr.sys4u.spring.instagram.web.controller.advisor;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import kr.sys4u.spring.instagram.core.dto.exception.ExecutionResult;

@ControllerAdvice
public class ExceptionAdvisor {
	protected static final Logger LOGGER = LoggerFactory.getLogger(ExceptionAdvisor.class);
	
	@ExceptionHandler(value= {Exception.class})
	public String handleException(HttpServletRequest request, Exception exception) {
		LOGGER.error("handleException : ", exception);
		ExecutionResult exceutionResult = new ExecutionResult();
		
		exceutionResult.setSuccessed(false);
		exceutionResult.setMessage(exception.getMessage());
		
		String xRequestedWith = request.getHeader("X-Requested-With");
	    boolean isAjax = xRequestedWith != null && xRequestedWith.equals("XMLHttpRequest");
	    request.setAttribute("exceutionResult", exceutionResult);
	    if(isAjax) {
	    	return "common/error/ajaxError";
	    }
		return "common/error/500";
	}
	
	@ExceptionHandler(BindException.class)
	public String handleBindingException(HttpServletRequest request, Exception exception) {
		LOGGER.error("handleBindingException : ", exception);
		String xRequestedWith = request.getHeader("X-Requested-With");
	    boolean isAjax = xRequestedWith != null && xRequestedWith.equals("XMLHttpRequest");
	    request.setAttribute("exception", exception);
	    if(isAjax) {
	    	return "common/error/ajaxError";
	    }
		return "common/error/404";
	}
	
}
