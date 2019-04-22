package kr.sys4u.spring.instagram.core.service.post;

import org.springframework.web.multipart.MultipartFile;

import kr.sys4u.spring.instagram.core.dto.member.Member;
import kr.sys4u.spring.instagram.core.dto.post.Post;

public interface PostService {
	void insertPost(Member member, Post post, MultipartFile files);
	void updatePost(Member member, Post post);
	void deletePost(int postNumber);
}
