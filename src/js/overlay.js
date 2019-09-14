var btnClose = document.querySelector('.btn--close');
var overlayBox = document.querySelector('.overlay-box');



btnClose.addEventListener('click', function(evt){
     if (overlayBox.style.display='flex')
     overlayBox.style.display='none'
})
