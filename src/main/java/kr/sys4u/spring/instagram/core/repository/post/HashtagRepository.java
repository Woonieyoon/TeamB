package kr.sys4u.spring.instagram.core.repository.post;

import java.util.List;

import org.springframework.stereotype.Repository;

import kr.sys4u.spring.instagram.core.dto.post.Hashtag;

@Repository
public interface HashtagRepository {
	void insert(List<Hashtag> hashtags);
	int deleteAllByPostNo(int postNo);
}