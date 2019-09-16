;/* Индекс слайда по умолчанию */
var slideIndex = 1;
showSlides(slideIndex);
/* Устанавливает текущий слайд */
function currentSlide(n) {
    var slides = document.getElementsByClassName("review__item");
    showSlides(slideIndex = n);    
}

/* Основная функция слайдера */
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("review__item");
    var dots = document.getElementsByClassName("review__carrousel-item");

    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("review__carrousel-item--current", "");
    }
    slides[slideIndex - 1].style.display = "flex";
    dots[slideIndex - 1].className += " review__carrousel-item--current";
}