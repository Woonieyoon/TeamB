package kr.sys4u.spring.instagram.core.service.post;

import java.util.List;

import kr.sys4u.spring.instagram.core.dto.post.Hashtag;

public interface HashtagService {
	List<Hashtag> parseHashtag(String hashtag);
}
