package kr.sys4u.spring.instagram.core.dto.member;

import java.sql.Timestamp;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import lombok.Data;
@Data
public class Member {
    private int no;
    
    @NotNull
    @Pattern(regexp="\\\\S{2,6}",message="이름에 공백없이 입력해야 합니다.")
    private String loginId;
    
    @NotNull
//    @Pattern(regexp="1",message="8자리 입력해주세요.")
    private String password;
    
    private String message;
    private String deleted;
    private Timestamp createdDate;
    private Timestamp updatedDate;
    private MemberImage memberImage;
}