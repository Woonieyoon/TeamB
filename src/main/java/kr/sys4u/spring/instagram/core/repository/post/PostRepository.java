package kr.sys4u.spring.instagram.core.repository.post;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import kr.sys4u.spring.instagram.core.dto.post.Post;

@Repository
public interface PostRepository {
	int insert(Post post);
	int update(Post post);
	int getCurrentPostNo();
	List<Post> getPostList(@Param("searchValue") String searchValue,
			@Param("startRowIndex") int startRowIndex);
	Post getPost(int postNo);
	int updateDeleted(int postNumber);
}