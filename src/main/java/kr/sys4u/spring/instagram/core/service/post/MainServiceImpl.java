package kr.sys4u.spring.instagram.core.service.post;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.sys4u.spring.instagram.core.dto.post.Post;
import kr.sys4u.spring.instagram.core.dto.post.PostLike;
import kr.sys4u.spring.instagram.core.dto.post.PostReply;
import kr.sys4u.spring.instagram.core.repository.member.MemberRepository;
import kr.sys4u.spring.instagram.core.repository.post.PostLikeRepository;
import kr.sys4u.spring.instagram.core.repository.post.PostReplyRepository;
import kr.sys4u.spring.instagram.core.repository.post.PostRepository;
import kr.sys4u.spring.instagram.exception.NoSuchResourceException;

@Service
public class MainServiceImpl implements MainService {
	protected static Logger LOGGER = LoggerFactory.getLogger(MainServiceImpl.class);
	
	@Autowired
	private PostRepository postRepository;
	@Autowired
	private PostLikeRepository postLikeRepository;
	@Autowired
	private PostReplyRepository postReplyRepository;
	@Autowired
	private MemberRepository memberRepository;
	
	@Override
	public List<Post> getPostList(String searchValue, int startRowIndex) {
		List<Post> posts = postRepository.getPostList(searchValue, startRowIndex);
		for (Post post : posts) {
			post.setContent(post.getContent().replace("\r\n", "<br/>"));
			String content = post.getContent();
			if (content.length() < 20) {
				continue;
			}
			
			if (content.contains("<br/>")) {
				post.setCompressedContent(content.substring(0, content.indexOf("<br/>")) + "...");
			} else {
				post.setCompressedContent(content.substring(0, 20) + "...");
			}
		}
		
		return posts;
	}

	@Override
	public Post getPost(int postNo) {
		Post post = postRepository.getPost(postNo);
		if (post == null) {
			throw new NoSuchResourceException("No Such Post for postNo: " + postNo);
		}
		post.setContent(post.getContent().replace("\r\n", "<br/>"));
		return post;
	}

	@Override
	public Post like(PostLike postLike) {
		if (postLikeRepository.postLikeExist(postLike) != null) {
			postLikeRepository.delLike(postLike);
		} else {
			postLikeRepository.setLike(postLike);
		}
		
		Post post = postRepository.getPost(postLike.getPostNo());
		
		post.setContent(post.getContent().replace("\r\n", "<br/>"));
		String content = post.getContent();
		if (content.length() < 20) {
			return post;
		}
		
		if (content.contains("<br/>")) {
			post.setCompressedContent(content.substring(0, content.indexOf("<br/>")) + "...");
		} else {
			post.setCompressedContent(content.substring(0, 20) + "...");
		}
		
		return post;
	}
	
	@Override
	public Post insertComment(PostReply postReply) {
		postReplyRepository.insert(postReply);
		
		return getPost(postReply.getPostNo());
		
	}

	@Override
	public int searchUser(String memberId) {
		
		if (memberRepository.existMemberId(memberId) == null) {
			 return 0;
		}
		
		return memberRepository.getMemberNo(memberId);
	}

	@Override
	public Post deleteComment(int postNo, int replyNo) {
		postReplyRepository.delete(replyNo);
		
		return getPost(postNo);
	}
}
