package kr.sys4u.spring.instagram.core.repository.post;

import org.springframework.stereotype.Repository;

import kr.sys4u.spring.instagram.core.dto.post.PostLike;

@Repository
public interface PostLikeRepository {
	String postLikeExist(PostLike postLike);
	PostLike getPostLikes(int postNo);
	int setLike(PostLike postLike);
	int delLike(PostLike postLike);
	int getPostLikeCount(int postNo);
}