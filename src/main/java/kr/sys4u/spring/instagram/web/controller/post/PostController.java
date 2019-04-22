package kr.sys4u.spring.instagram.web.controller.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import kr.sys4u.spring.instagram.core.dto.member.Member;
import kr.sys4u.spring.instagram.core.dto.post.Post;
import kr.sys4u.spring.instagram.core.service.post.HashtagService;
import kr.sys4u.spring.instagram.core.service.post.PostService;
import kr.sys4u.spring.instagram.exception.NotEqualUserInfoException;
import kr.sys4u.spring.instagram.web.controller.AbstractController;

@Controller
public class PostController extends AbstractController {
	
	@Autowired
	private PostService postService;
	
	@Autowired
	protected HashtagService hashtagService;
	
	@PostMapping("/post/insert.do")
	public @ResponseBody String insertPost(@SessionAttribute("loginMember") Member member, 
			@RequestParam("postImageFile") MultipartFile files, Post post, @RequestParam("hashtag") String hashtag){
		post.setHashtags(hashtagService.parseHashtag(hashtag));
		postService.insertPost(member, post, files);
		return "success";
	}
	
	@PostMapping("/post/update.do")
	public @ResponseBody String updatePost(@SessionAttribute("loginMember") Member member,
			Post post, @RequestParam("hashtag") String hashtag, @RequestParam("memberNoOfPost") int memberNoOfPost) {
		if(memberNoOfPost != member.getNo()) {
			throw new NotEqualUserInfoException();
		}
		post.setHashtags(hashtagService.parseHashtag(hashtag));
		postService.updatePost(member, post);
		return "success";
	}
	
	@PostMapping("/post/delete.do")
	public @ResponseBody String deletePost(@SessionAttribute("loginMember") Member member, 
			@RequestParam("memberNoOfPost") int memberNoOfPost, @RequestParam("no") int postNo) {
		if(memberNoOfPost != member.getNo()) {
			throw new NotEqualUserInfoException();
		}
		postService.deletePost(postNo);
		return "success";
	}
	
}
