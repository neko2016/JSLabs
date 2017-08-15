var broadcast = document.getElementsByClassName("js-verify-account");
for (var i = 0; i < broadcast.length; i++){
    broadcast[i].dataset.isVerified = "True";
}

var reviews = document.getElementsByClassName('create-review');
for (var i = 0; i < reviews.length; i++){
    reviews[i].dataset.isverify = "True";
}