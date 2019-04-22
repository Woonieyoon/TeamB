package kr.sys4u.spring.instagram.exception;

public class AjaxException extends RuntimeException {
	private static final long serialVersionUID = -7189113272857698163L;

	public AjaxException() {
		super();
	}

	public AjaxException(String message, Throwable cause) {
		super(message, cause);
	}

	public AjaxException(String message) {
		super(message);
	}

	public AjaxException(Throwable cause) {
		super(cause);
	}

}
