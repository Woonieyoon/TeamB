package kr.sys4u.spring.instagram.web.controller.member;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.sys4u.spring.instagram.core.dto.member.Member;
import kr.sys4u.spring.instagram.core.dto.member.MemberImage;
import kr.sys4u.spring.instagram.core.dto.member.MyPage;
import kr.sys4u.spring.instagram.core.service.member.MemberService;
import kr.sys4u.spring.instagram.web.controller.AbstractController;

@Controller
public class MemberController extends AbstractController {
	@Autowired
	protected MemberService memberService;
	
	@GetMapping("/login.do")
	public String loginForm() {
		LOGGER.debug("================= Login.GET 시작  =================");
		return "/member/loginForm";
	}

	@PostMapping("/login.do")
	public String login(Member member, HttpSession httpSession) {
		LOGGER.debug("================= Login.DO 시작 =================");
		String rootPath = environment.getProperty("action-url"); //jsp에서 actionUrl로 대체 가능
		Member fetchedMember = memberService.getUser(member);
		
		if(fetchedMember == null) {
			httpSession.setAttribute("REDIRECT_URL", rootPath + "/login.do"); //request로
			httpSession.setAttribute("MESSAGE", "아이디,비밀번호를 확인해주세요.");
			return REDIRECT_VIEW_NAME;
		}
		
		LOGGER.debug(fetchedMember.toString());
		
		if(fetchedMember.getMemberImage() == null) {
			fetchedMember.setMemberImage(new MemberImage(fetchedMember.getNo(), "", "", ""));
		}
		
		httpSession.setAttribute("REDIRECT_URL", rootPath + "/post/home.do");
		httpSession.setAttribute("MESSAGE", "");
		httpSession.setAttribute("loginMember", fetchedMember);
		return REDIRECT_VIEW_NAME;
	}

	@GetMapping("/member/join.do")
	public String joinForm() {
		return "/member/joinForm";
	}

	@PostMapping("/member/join.do")
	public String join(Member member, @RequestPart("picture") MultipartFile file){
		memberService.insertMember(member, file);
		return "redirect:/login.do";
	}

	@GetMapping("/member/logout.do")
	public String logout(HttpSession httpSession) {
		httpSession.invalidate();
		String url = environment.getProperty("action-url");
		return "redirect:/login.do" ;
	}
	
	@PostMapping("/member/idCheck.do")
	public @ResponseBody String idCheck(@RequestParam("userId") String userId) {
		return memberService.existMemberId(userId);
	}
	
	@GetMapping("/member/myPage.do")
	public @ResponseBody MyPage myPage(@RequestParam(value="memberNo", required = false, defaultValue="") int memberNo) {
		LOGGER.debug("enter myPage : " + memberNo);
		MyPage myPage = new MyPage();
		
		myPage = memberService.getMyPage(memberNo);
		LOGGER.debug("사용자 Image는 "+myPage.getMemberImage().toString());
		LOGGER.debug("포스트 이미지들은"+myPage.getPostImage().size());
		return myPage;
	}
	
	@GetMapping("/member/profileUpdate.do")
	public @ResponseBody boolean profileUpdate(@RequestParam("userId") String userId) {
		return true;
	}

}
