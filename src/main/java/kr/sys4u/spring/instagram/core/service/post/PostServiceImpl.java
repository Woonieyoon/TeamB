package kr.sys4u.spring.instagram.core.service.post;

import java.io.File;
import java.util.List;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.sys4u.spring.instagram.core.dto.member.Member;
import kr.sys4u.spring.instagram.core.dto.post.Hashtag;
import kr.sys4u.spring.instagram.core.dto.post.Post;
import kr.sys4u.spring.instagram.core.dto.post.PostImage;
import kr.sys4u.spring.instagram.core.repository.post.HashtagRepository;
import kr.sys4u.spring.instagram.core.repository.post.PostImageRepository;
import kr.sys4u.spring.instagram.core.repository.post.PostRepository;
import kr.sys4u.spring.instagram.exception.FileTransferFailedException;

@Service
public class PostServiceImpl implements PostService {

	private static final Logger LOGGER = LoggerFactory.getLogger(PostServiceImpl.class);
	
	@Autowired
	private Environment environment;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private PostImageRepository postImageRepository;
	
	@Autowired
	private HashtagRepository hashtagRepository;
	
	@Transactional
	@Override
	public void insertPost(Member member, Post post, MultipartFile files) {
		
		String webAppHome = environment.getProperty("fileupload-localDir");
		String imagePath = environment.getProperty("fileupload-image-path");
		String postImageUploadFolder = environment.getProperty("fileupload-post-path");
		
		/* Post Insert */
		post.setMemberNo(member.getNo());
		postRepository.insert(post);
		
		/* PostImage Create */
		int postNo = postRepository.getCurrentPostNo();
		
		String fullPath = String.format("%s%s%s/%d/%s", webAppHome, imagePath, postImageUploadFolder, postNo, files.getOriginalFilename());
		File postImageFile = new File(fullPath);
		
		PostImage postImage = new PostImage();
		postImage.setPath(imagePath + postImageUploadFolder + "/" + postNo);
		postImage.setName(FilenameUtils.getBaseName(postImageFile.getName()));
		postImage.setExtension(FilenameUtils.getExtension(files.getOriginalFilename()));
		postImage.setPostNo(postNo);
		
		/* Post Image Insert */
		postImageRepository.insert(postImage);
		
		/* Hashtag Insert */
		List<Hashtag> hashtags = post.getHashtags();
		for(Hashtag hashtag : hashtags) {
			hashtag.setPostNo(postNo);
		}
		hashtagRepository.insert(hashtags);
		
		/* PostImageFile Transfer */
		try {
			files.transferTo(postImageFile);
		}catch (Exception e) {
			throw new FileTransferFailedException(e);
		}
	}

	@Override
	public void updatePost(Member member, Post post) {
		post.setMemberNo(member.getNo());
		postRepository.update(post);
		
		hashtagRepository.deleteAllByPostNo(post.getNo());
		List<Hashtag> hashtags = post.getHashtags();
		for(Hashtag hashtag : hashtags) {
			hashtag.setPostNo(post.getNo());
		}
		hashtagRepository.insert(hashtags);
	}

	@Override
	public void deletePost(int postNumber) {
		hashtagRepository.deleteAllByPostNo(postNumber);
		postImageRepository.deleteByPostNo(postNumber);
		postRepository.updateDeleted(postNumber);
	}

}
