package kr.sys4u.spring.instagram.exception;

public class FileTransferFailedException extends RuntimeException {

	private static final long serialVersionUID = 2756226126040674683L;

	public FileTransferFailedException() {
		super();
	}

	public FileTransferFailedException(String arg0, Throwable arg1) {
		super(arg0, arg1);
	}

	public FileTransferFailedException(String arg0) {
		super(arg0);
	}

	public FileTransferFailedException(Throwable arg0) {
		super(arg0);
	}
	
}
