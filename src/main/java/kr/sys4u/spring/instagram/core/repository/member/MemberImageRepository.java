package kr.sys4u.spring.instagram.core.repository.member;

import org.springframework.stereotype.Repository;

import kr.sys4u.spring.instagram.core.dto.member.MemberImage;

@Repository
public interface MemberImageRepository {
	Integer insertMemberImage(MemberImage memberImage);
	MemberImage getMemberImage(int member_no);
}