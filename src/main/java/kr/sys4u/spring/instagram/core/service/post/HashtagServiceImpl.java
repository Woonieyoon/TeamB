package kr.sys4u.spring.instagram.core.service.post;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import kr.sys4u.spring.instagram.core.dto.post.Hashtag;

@Service
public class HashtagServiceImpl implements HashtagService {

	@Override
	public List<Hashtag> parseHashtag(String hashtagStr) {
		List<Hashtag> hashtags = new ArrayList<>();
		List<String> hashtagNames = Arrays.asList(hashtagStr.split("#"));
		for(int i = 1; i < hashtagNames.size(); i++) {
			Hashtag hashtag = new Hashtag();
			hashtag.setName("#"+hashtagNames.get(i));
			hashtags.add(hashtag);
		}
		return hashtags;
	}

}
