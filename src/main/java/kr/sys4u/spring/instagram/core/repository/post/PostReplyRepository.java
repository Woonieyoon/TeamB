package kr.sys4u.spring.instagram.core.repository.post;

import org.springframework.stereotype.Repository;

import kr.sys4u.spring.instagram.core.dto.post.PostReply;

@Repository
public interface PostReplyRepository {
	PostReply getReplies(int postNo);
	void insert(PostReply postReply);
	void delete(int replyNo);
	int getPostReplyCount(int postNo);
}