package kr.sys4u.spring.instagram.exception;

public class NoSuchResourceException extends RuntimeException {
	private static final long serialVersionUID = -7189113272857698163L;

	public NoSuchResourceException() {
		super();
	}

	public NoSuchResourceException(String message, Throwable cause) {
		super(message, cause);
	}

	public NoSuchResourceException(String message) {
		super(message);
	}

	public NoSuchResourceException(Throwable cause) {
		super(cause);
	}

}
