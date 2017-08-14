// remove tracking parameters after the question mark in URLs
if( location.href.indexOf("?") !== -1){
    window.location.href = location.href.substring(0,location.href.indexOf("?"));
}
