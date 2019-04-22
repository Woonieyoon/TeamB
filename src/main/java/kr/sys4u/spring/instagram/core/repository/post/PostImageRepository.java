package kr.sys4u.spring.instagram.core.repository.post;

import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.sys4u.spring.instagram.core.dto.post.PostImage;

@Repository
public interface PostImageRepository {
	void insert(PostImage postImage);
	Map<Object, Object> getMyPageImage(int memberNo);
	int deleteByPostNo(int postNumber);
}