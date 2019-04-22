package kr.sys4u.spring.instagram.web.controller.post;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.sys4u.spring.instagram.core.dto.post.Post;
import kr.sys4u.spring.instagram.core.dto.post.PostLike;
import kr.sys4u.spring.instagram.core.dto.post.PostReply;
import kr.sys4u.spring.instagram.core.service.post.MainService;
import kr.sys4u.spring.instagram.web.controller.AbstractController;

@Controller
public class MainController extends AbstractController {
	@Autowired
	private MainService mainService;
	
	@GetMapping("/post/home.do")
	public String view(Model model) {
		model.addAttribute("html_title", "Instagram");
		return "post/main";
	}
	
	@GetMapping("/ajax/list.do")
	public @ResponseBody List<Post> list(
			@RequestParam(value="searchValue", required = false, defaultValue="") String searchValue,
			@RequestParam(value="startRowIndex", required = false, defaultValue="1") String strStartRowIndex) {
		int startRowIndex = 1;
		try {
			startRowIndex = Integer.parseInt(strStartRowIndex);
		} catch (Exception e) {
			startRowIndex = 1;
		}
		
		return mainService.getPostList(searchValue, startRowIndex);
	}
	
	@PostMapping("/ajax/like.do")
	public @ResponseBody Post like(@Valid @ModelAttribute PostLike postLike, BindingResult bindingResult) throws BindException {
		
		if (postLike.getPostNo() == 0 || postLike.getMemberNo() == 0) {
			throw new BindException(bindingResult);
		}
		
		if(bindingResult.hasErrors()) {
			throw new BindException(bindingResult);
		}
		return mainService.like(postLike);
	}
	
	@PostMapping("/ajax/insertComment.do")
	public @ResponseBody Post insertComment(@Valid @ModelAttribute PostReply postReply, BindingResult bindResult) {
		return mainService.insertComment(postReply);
	}
	
	@PostMapping("/ajax/deleteComment.do")
	public @ResponseBody Post deleteComment(@ModelAttribute PostReply postReply) {
		return mainService.deleteComment(postReply.getPostNo(), postReply.getNo());
	}
	
	@GetMapping("/ajax/postDetail.do")
	public @ResponseBody Post postDetail(@RequestParam(value="postNo") int postNo) {
		
		return mainService.getPost(postNo);
	}
	
	@GetMapping("/ajax/searchUser.do")
	public @ResponseBody int searchUser(@RequestParam(value="memberId") String  memberId) {
		
		return mainService.searchUser(memberId);
	}
	
}
