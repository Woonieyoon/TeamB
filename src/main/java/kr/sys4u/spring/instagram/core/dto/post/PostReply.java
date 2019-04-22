package kr.sys4u.spring.instagram.core.dto.post;

import java.sql.Timestamp;

import javax.validation.constraints.NotNull;

import kr.sys4u.spring.instagram.core.dto.member.MemberImage;
import lombok.Data;

@Data
public class PostReply {
    private int no;
	@NotNull
    private int postNo;
	@NotNull
    private int memberNo;
    private MemberImage memberImage;
    private String userId;
    @NotNull
    private String content;
    private String deleted;
    private Timestamp createdDate;
    private Timestamp updatedDate;
}