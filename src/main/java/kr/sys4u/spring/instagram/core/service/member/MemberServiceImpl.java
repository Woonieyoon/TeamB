package kr.sys4u.spring.instagram.core.service.member;

import java.io.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kr.sys4u.spring.instagram.core.dto.member.Member;
import kr.sys4u.spring.instagram.core.dto.member.MemberImage;
import kr.sys4u.spring.instagram.core.dto.member.MyPage;
import kr.sys4u.spring.instagram.core.repository.member.MemberImageRepository;
import kr.sys4u.spring.instagram.core.repository.member.MemberRepository;
import kr.sys4u.spring.instagram.core.repository.post.PostLikeRepository;
import kr.sys4u.spring.instagram.core.repository.post.PostReplyRepository;
import kr.sys4u.spring.instagram.exception.FileTransferFailedException;

@Service
public class MemberServiceImpl implements MemberService{
	private static Logger LOGGER = LoggerFactory.getLogger(MemberServiceImpl.class);

	@Autowired
	private Environment environment;

	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private MemberImageRepository memberImageRepository;
	
	@Autowired
	private PostLikeRepository postLikeRepository;
	
	@Autowired
	private PostReplyRepository postReplyRepository;
	
	
	@Override
	public Integer insertMember(Member member,MultipartFile file){
		String localDir = environment.getProperty("fileupload-localDir", String.class, "c:/image/temp");
		String imagePath = environment.getProperty("fileupload-image-path");
		String imageMemberPath = environment.getProperty("fileupload-member-path");
		String loginId = member.getLoginId();
		String fileOriginalFilename = file.getOriginalFilename(); 
		String fileName = fileOriginalFilename.substring(0,fileOriginalFilename.lastIndexOf("."));
		String fileExtension = fileOriginalFilename.substring(fileOriginalFilename.lastIndexOf(".")+1,fileOriginalFilename.length());
		
		memberRepository.insertMember(member);
		
		int memberNo = memberRepository.getMemberNo(loginId);
		
		String uploadDataBasePath = imagePath + imageMemberPath + "/" + loginId;
		String uploadFilePath = localDir + uploadDataBasePath ;
		File destFile = new File(uploadFilePath, fileOriginalFilename);
		
		try{
			file.transferTo(destFile);
		}catch(Exception e) {
			throw new FileTransferFailedException();
		}
		return memberImageRepository.insertMemberImage(new MemberImage(memberNo,uploadDataBasePath,fileName,fileExtension));
	}

	@Override
	public String existMemberId(String id) {
		return memberRepository.existMemberId(id);
	}


	@Override
	public boolean checkMemberExists(Member member) {
		return memberRepository.existMember(member) != null;
	}

	@Override
	public Member getUser(Member member) {
		return memberRepository.getLoginUser(member);
	}

	@Override
	public MyPage getMyPage(int memberNo) {
		MyPage myPage = memberRepository.getMyPage(memberNo);
		
		for(int i = 0; i < myPage.getPostImage().size(); i++) {
			String strPostNo = String.valueOf(myPage.getPostImage().get(i).get("NO"));
			int postNo = 0;
			
			try {
				postNo = Integer.parseInt(strPostNo); 
			} catch(Exception e) {
				postNo = 0;
			}
					
			myPage.getPostImage().get(i).put("likeCount", postLikeRepository.getPostLikeCount(postNo));
			myPage.getPostImage().get(i).put("replyCount", postReplyRepository.getPostReplyCount(postNo));
		}
		
		return myPage;
	}
	
}
