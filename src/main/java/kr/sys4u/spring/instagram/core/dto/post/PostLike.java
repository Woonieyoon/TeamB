package kr.sys4u.spring.instagram.core.dto.post;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class PostLike {
    private int no;
	@NotNull
    private int memberNo;
    private String likeUser;
	@NotNull
    private int postNo;
}