package kr.sys4u.spring.instagram.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

public abstract class AbstractController {
	protected static final Logger LOGGER = LoggerFactory.getLogger(AbstractController.class);
	protected static final String REDIRECT_VIEW_NAME = "/common/redirect";
	
	@Autowired
	protected Environment environment;
}
