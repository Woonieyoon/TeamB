package kr.sys4u.spring.instagram.core.service.post;

import java.util.List;

import kr.sys4u.spring.instagram.core.dto.post.Post;
import kr.sys4u.spring.instagram.core.dto.post.PostLike;
import kr.sys4u.spring.instagram.core.dto.post.PostReply;

public interface MainService {
	List<Post> getPostList(String searchValue, int startRowIndex);
	Post getPost(int postNo);
	Post like(PostLike postLike);
	Post insertComment(PostReply postReply);
	Post deleteComment(int postNo, int replyNo);
	int searchUser(String memberId);
}
