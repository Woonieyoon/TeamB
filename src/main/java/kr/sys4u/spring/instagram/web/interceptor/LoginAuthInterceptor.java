package kr.sys4u.spring.instagram.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

@Component
public class LoginAuthInterceptor extends HandlerInterceptorAdapter{
	private static final Logger LOGGER = LoggerFactory.getLogger(AuthInterceptor.class);
	
	@Autowired
	Environment environment;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		LOGGER.debug("LOGIN PRE INTERCEPTOR 시작");
		HttpSession httpSession = request.getSession();
		if(httpSession.getAttribute("loginMember") != null) {
			LOGGER.debug("LOGIN INTERCEPTOR: 데이터 있음");
			String rootPath = environment.getProperty("action-url");
			response.sendRedirect(rootPath+"/post/home.do");
			return false;
		}		
				
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		LOGGER.debug("LOGIN POST INTERCEPTOR 시작");
	}

}
