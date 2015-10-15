'use strict';

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
        //重定向URL
        if(details.url == "http://www.wxscreen.com/images/v6_colorful/bg.jpg"){
        	return {redirectUrl: "http://www.pp3.cn/uploads/allimg/111116/11021321R-4.jpg"};   
        }
        //屏蔽logo
        if(details.url == "http://www.wxscreen.com/images/common/logo-b.png"){
        	return {redirectUrl: "http://www.csufter.com/other/b.png"};   
        }
        if(details.url == "http://www.wxscreen.com/images/common/logo_v6.png"){
        	return {redirectUrl: "http://www.csufter.com/other/b.png"};  
        }

		return details.url;
    },
    {
        urls: ["<all_urls>"],
    },
    ["blocking"]
);