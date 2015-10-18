chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
        return redirectOnMatch(details);
    },
    {
        urls: ["<all_urls>"],
    },
    ["blocking"]   
);       

function redirectOnMatch(details){
    var key;
    for(var i = window.localStorage.length;i > 0; i--){
        key = window.localStorage.key(i);
       if(/ruls:\d+/.test(key)){
            value = JSON.parse(window.localStorage.getItem(key));
            if(details.url.indexOf(value.from) > -1){
                return {redirectUrl:details.url.replace(value.from,value.to)};
            }
        }
    }
    return details.url;
}