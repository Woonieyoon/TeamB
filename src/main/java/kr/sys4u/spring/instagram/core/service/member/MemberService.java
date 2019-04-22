package kr.sys4u.spring.instagram.core.service.member;


import org.springframework.web.multipart.MultipartFile;

import kr.sys4u.spring.instagram.core.dto.member.Member;
import kr.sys4u.spring.instagram.core.dto.member.MyPage;

public interface MemberService {
	
	Integer insertMember(Member member,MultipartFile multipartFile);
	String existMemberId(String id);
	boolean checkMemberExists(Member member);
	Member getUser(Member member);
	MyPage getMyPage(int memberNo);

}
