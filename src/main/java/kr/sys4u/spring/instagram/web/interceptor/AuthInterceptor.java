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
public class AuthInterceptor extends HandlerInterceptorAdapter {
	private static final Logger logger = LoggerFactory.getLogger(AuthInterceptor.class);

	@Autowired
	Environment environment;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		logger.debug("=============AuthInterceptor pre Handle================");
		String rootPath = environment.getProperty("action-url");
		
		HttpSession httpSession = request.getSession();
		String url = request.getRequestURL().toString();
		
		logger.debug("요청받은 url:["+url+"]");
		
		String beforeDestination = (String) httpSession.getAttribute("destination");
		logger.debug("로그인전 화면에서 요청이 왔을때  url: " + beforeDestination);

		if (beforeDestination != null && beforeDestination.equals(url)
				&& httpSession.getAttribute("loginMember") != null) {
			request.setAttribute("dupCheck", true);
		}

		if (httpSession.getAttribute("loginMember") == null) {
			logger.debug("=================== current is not login ===================");
//			httpSession.setAttribute("destination", request.getRequestURL().toString());
			response.sendRedirect(rootPath + "/login.do");
			return false;
		}
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {

		logger.debug("================AuthInterceptor post Handle================");
		HttpSession httpSession = request.getSession();
		Object member = httpSession.getAttribute("loginMember");

		boolean dupCheck = (Boolean) request.getAttribute("dupCheck") == null ? false : true;
		if (member != null && !dupCheck) {
			String destination = (String) httpSession.getAttribute("destination");
			logger.debug("====destination=====: " + (String) destination);
			if(destination==null) {
				return;
			}
			response.sendRedirect(destination);
		}
		httpSession.setAttribute("destination", request.getRequestURL().toString());
	}
}
