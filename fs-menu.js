var fsMenu = document.querySelector('.fs-menu');
var hamburger = document.querySelector('.hamburger-menu-link');
var close = document.querySelector('.close--fs-menu');


close.addEventListener('click', function(evt){
     if (fsMenu.style.display='flex')
     fsMenu.style.display='none'
})

hamburger.addEventListener('click', function(evt){
     if (fsMenu.style.display='none')
     fsMenu.style.display='flex'
})