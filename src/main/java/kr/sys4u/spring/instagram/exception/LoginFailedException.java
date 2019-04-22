package kr.sys4u.spring.instagram.exception;

public class LoginFailedException extends RuntimeException {
	private static final long serialVersionUID = -5940123106924995088L;

	public LoginFailedException() {
		super();
	}

	public LoginFailedException(String message, Throwable cause) {
		super(message, cause);
	}

	public LoginFailedException(String message) {
		super(message);
	}

	public LoginFailedException(Throwable cause) {
		super(cause);
	}

}
