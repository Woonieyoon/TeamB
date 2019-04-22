<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="header">
    <div class="logo-div" id="logo-div">
        <span class="logo-image-span"> </span>
        <div class="logo-vertical-line"></div>
        <span class="logo-title-span">
            <h2 class="hide">Instagram</h2>
        </span>
    </div>
    <div class="search-div">
        <div class="search-form" id="search-form">
            <input type="text" class="search-value" name="searchBox" id="searchBox" placeholder="검색">
            <span class="search-image-span" id="search-image-span"></span>
            <input type="hidden" id="searchValue" value="">
        </div>
    </div>
    <div class="userinfo-div">
        <div class="userinfo-button-div" id="userinfo-button-div">
            <div class="userinfo-profile-div">
                <img src="${memberProfile}" alt="">
            </div>
            <div class="userinfo-identity-div">
                <div class="userinfo-id">${loginMember.loginId}</div>
                <div class="userinfo-message">${loginMember.message }</div>
            </div>
        </div>
    </div>
</div>
