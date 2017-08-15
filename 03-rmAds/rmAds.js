// remove ads that shows up in Douban's broadcast

var ads = document.getElementsByClassName("status-wrapper");
for (var i = 0; i < ads.length; i++){
    if(ads[i].dataset.uid === "None"){
        // console.log(a[i]);
        ads[i].parentNode.removeChild(ads[i]);
    }
}