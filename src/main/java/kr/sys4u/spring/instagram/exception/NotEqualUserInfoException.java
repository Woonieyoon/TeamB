package kr.sys4u.spring.instagram.exception;

public class NotEqualUserInfoException extends RuntimeException {

	private static final long serialVersionUID = 7370414350038775252L;

	public NotEqualUserInfoException() {
		super();
	}

	public NotEqualUserInfoException(String arg0, Throwable arg1) {
		super(arg0, arg1);
	}

	public NotEqualUserInfoException(String arg0) {
		super(arg0);
	}

	public NotEqualUserInfoException(Throwable arg0) {
		super(arg0);
	}
	
}
