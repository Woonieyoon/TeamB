package kr.sys4u.spring.instagram.core.dto.member;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class MemberImage {
    private int memberNo;
    private String path;
    private String name;
    private String extension;
    private Timestamp createdDate;
    private Timestamp updatedDate;
    
    public MemberImage(int memberNo,String path,String name,String extension) {
    	this.memberNo = memberNo;
    	this.path = path;
    	this.name = name;
    	this.extension = extension;
    }
}