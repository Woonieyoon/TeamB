package kr.sys4u.spring.instagram.core.dto.post;

import java.sql.Timestamp;
import java.util.List;

import kr.sys4u.spring.instagram.core.dto.member.Member;
import kr.sys4u.spring.instagram.core.dto.member.MemberImage;
import lombok.Data;

@Data
public class Post {
	private int rnum;
    private int no;
    private int memberNo;
    private String content;
    private String compressedContent;
    private Timestamp createdDate;
    private Timestamp updatedDate;
    private Member member;
    private MemberImage memberImage;
    private PostImage postImage;
    private List<PostLike> postLikes;
    private List<Hashtag> hashtags;
    private List<PostReply> postReplies;
}