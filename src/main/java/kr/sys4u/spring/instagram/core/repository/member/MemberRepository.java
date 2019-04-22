package kr.sys4u.spring.instagram.core.repository.member;

import org.springframework.stereotype.Repository;

import kr.sys4u.spring.instagram.core.dto.member.Member;
import kr.sys4u.spring.instagram.core.dto.member.MyPage;

@Repository
public interface MemberRepository {
	Integer insertMember(Member member);
	Integer  getMemberNo(String id);
	Integer selectCount();
	String existMemberId(String id);
	Member getMember(int no);
	String existMember(Member member);
	Member getLoginUser(Member member);
	MyPage getMyPage(int memberNo);
}