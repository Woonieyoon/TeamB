package kr.sys4u.spring.instagram.core.dto.member;

import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class MyPage {
	private int no;
	private String loginID;
	private String message;
	private MemberImage memberImage;
	private List<Map<String, Object>> postImage;
}
