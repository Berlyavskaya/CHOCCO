const element = document.querySelector(".vertical-accord__list");
// const trigger = document.querySelector(".vertical-accord__trigger");
let lastActive; 
const item = document.querySelector ('.vertical-accord__item');

element.addEventListener ('click', function(evt) {
    evt.preventDefault();
    
    if (evt.target.classList.contains("vertical-accord__trigger")) {
        if (lastActive) {
            lastActive.classList.remove("vertical-accord__item--active");
        }
        lastActive = evt.target.parentNode;
        lastActive.classList.add("vertical-accord__item--active");
    }
    if (evt.target.classList.contains("close")) {
        lastActive.classList.remove("vertical-accord__item--active");
    }
})
;const formOrder = document.querySelector ('#form-order');
const sendBtn = document.querySelector ('#send-btn');
var overlayBox = document.querySelector('.overlay-box');
var overlayTextTrue = document.querySelector('.overlay__text--true');
var overlayTextFalse = document.querySelector('.overlay__text--false');


sendBtn.addEventListener ('click', function(evt){
    evt.preventDefault();

    sendBtn.addEventListener('click', evt => {
        evt.preventDefault();
        
        // if (validateForm(formOrder)) {
        //     console.log ('все ок');
        // }

        
        
        var formdata = new FormData(formOrder);
        formdata.append('to', 'mail@mail.ru');

        var data = {
            name: formOrder.elements.name.value,
            phone: formOrder.elements.phone.value,
            comment: formOrder.elements.comment.value,
            to: formdata.get('to')
        };

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        // console.log (xhr.open);
        xhr.send (formdata);
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                console.log('ошибка');
                overlayBox.style.display='flex';
                overlayTextTrue.style.display='none';
                overlayTextFalse.style.display='flex';            
            }
            else {
                console.log('ok');
                overlayBox.style.display='flex';
                overlayTextFalse.style.display='none';
                overlayTextTrue.style.display='flex';
            }
            
        })
    });


    // function validateForm(form) {
    //     let valid = true;
    //     if (!validateField (form.elements.name)) {
    //         valid = false;
    //     }
    //     if (!validateField (form.elements.phone)){
    //         valid = false;
    //     }
    //         return valid;
    // }
    // function validateField(form__input) {
    //     if (!form__input.checkValidity()) {
    //         form__input.nextElementSibling.textContent = form__input.validationMessage;
    //         return false;
    //     } else {
    //         form__input.nextElementSibling.textContent = '';
    //         return true;
    //     }
    // }

    // console.log(formOrder.elements.name.value);
    // console.log(formOrder.elements.phone.value);
    // console.log(formOrder.elements.comment.value);

});var fsMenu = document.querySelector('.fs-menu');
var hamburger = document.querySelector('.hamburger-menu-link');
var close = document.querySelector('.close--fs-menu');


close.addEventListener('click', function(evt){
     if (fsMenu.style.display='flex')
     fsMenu.style.display='none'
})

hamburger.addEventListener('click', function(evt){
     if (fsMenu.style.display='none')
     fsMenu.style.display='flex'
     fsMenu.style.display='flex'
});ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [55.75, 37.60],
            zoom: 13
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark1 = new ymaps.Placemark([55.75893090207855,37.583082952087416], {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Первая'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'icons/map-ikon.gif',
            // Размеры метки.
            iconImageSize: [46, 57],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset:  [-5, -38]
        }),
        myPlacemark2 = new ymaps.Placemark([55.74980682163106,37.604111470764174], {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Вторая'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'icons/map-ikon.gif',
            iconImageSize: [46, 57],
            iconImageOffset:  [-5, -38]
        }),
        myPlacemark3 = new ymaps.Placemark([55.7581807270031,37.62402419049073], {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Третья'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'icons/map-ikon.gif',
            iconImageSize: [46, 57],
            iconImageOffset:  [-5, -38]
        }),
        myPlacemark4 = new ymaps.Placemark([55.74331737582376,37.58082301516784], {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Четвертая'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'icons/map-ikon.gif',
            iconImageSize: [46, 57],
            iconImageOffset:  [-5, -38]
        });
    myMap.geoObjects
    .add(myPlacemark1)
    .add(myPlacemark2)
    .add(myPlacemark3)
    .add(myPlacemark4);
    myMap.behaviors.disable('scrollZoom');
});;/* ===========================================================
 * jquery-onepage-scroll.js v1.3.1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create an Apple-like website that let user scroll
 * one page at a time
 *
 * Credit: Eike Send for the awesome swipe event
 * https://github.com/peachananr/onepage-scroll
 *
 * License: GPL v3
 *
 * ========================================================== */

!function($){

  var defaults = {
    sectionContainer: "section",
    easing: "ease",
    animationTime: 1000,
    pagination: true,
    updateURL: false,
    keyboard: true,
    beforeMove: null,
    afterMove: null,
    loop: true,
    responsiveFallback: false,
    direction : 'vertical'
	};

	/*------------------------------------------------*/
	/*  Credit: Eike Send for the awesome swipe event */
	/*------------------------------------------------*/

	$.fn.swipeEvents = function() {
      return this.each(function() {

        var startX,
            startY,
            $this = $(this);

        $this.bind('touchstart', touchstart);

        function touchstart(event) {
          var touches = event.originalEvent.touches;
          if (touches && touches.length) {
            startX = touches[0].pageX;
            startY = touches[0].pageY;
            $this.bind('touchmove', touchmove);
          }
        }

        function touchmove(event) {
          var touches = event.originalEvent.touches;
          if (touches && touches.length) {
            var deltaX = startX - touches[0].pageX;
            var deltaY = startY - touches[0].pageY;

            if (deltaX >= 50) {
              $this.trigger("swipeLeft");
            }
            if (deltaX <= -50) {
              $this.trigger("swipeRight");
            }
            if (deltaY >= 50) {
              $this.trigger("swipeUp");
            }
            if (deltaY <= -50) {
              $this.trigger("swipeDown");
            }
            if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
              $this.unbind('touchmove', touchmove);
            }
          }
        }

      });
    };

  $.fn.onepage_scroll = function(options){
    var settings = $.extend({}, defaults, options),
        el = $(this),
        sections = $(settings.sectionContainer)
        total = sections.length,
        status = "off",
        topPos = 0,
        leftPos = 0,
        lastAnimation = 0,
        quietPeriod = 500,
        paginationList = "";

    $.fn.transformPage = function(settings, pos, index) {
      if (typeof settings.beforeMove == 'function') settings.beforeMove(index);

      // Just a simple edit that makes use of modernizr to detect an IE8 browser and changes the transform method into
    	// an top animate so IE8 users can also use this script.
    	if($('html').hasClass('ie8')){
        if (settings.direction == 'horizontal') {
          var toppos = (el.width()/100)*pos;
          $(this).animate({left: toppos+'px'},settings.animationTime);
        } else {
          var toppos = (el.height()/100)*pos;
          $(this).animate({top: toppos+'px'},settings.animationTime);
        }
    	} else{
    	  $(this).css({
    	    "-webkit-transform": ( settings.direction == 'horizontal' ) ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
         "-webkit-transition": "all " + settings.animationTime + "ms " + settings.easing,
         "-moz-transform": ( settings.direction == 'horizontal' ) ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
         "-moz-transition": "all " + settings.animationTime + "ms " + settings.easing,
         "-ms-transform": ( settings.direction == 'horizontal' ) ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
         "-ms-transition": "all " + settings.animationTime + "ms " + settings.easing,
         "transform": ( settings.direction == 'horizontal' ) ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
         "transition": "all " + settings.animationTime + "ms " + settings.easing
    	  });
    	}
      $(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
        if (typeof settings.afterMove == 'function') settings.afterMove(index);
      });
    }

    $.fn.moveDown = function() {
      var el = $(this)
      index = $(settings.sectionContainer +".active").data("index");
      current = $(settings.sectionContainer + "[data-index='" + index + "']");
      next = $(settings.sectionContainer + "[data-index='" + (index + 1) + "']");
      if(next.length < 1) {
        if (settings.loop == true) {
          pos = 0;
          next = $(settings.sectionContainer + "[data-index='1']");
        } else {
          return
        }

      }else {
        pos = (index * 100) * -1;
      }
      if (typeof settings.beforeMove == 'function') settings.beforeMove( next.data("index"));
      current.removeClass("active")
      next.addClass("active");
      if(settings.pagination == true) {
        $(".onepage-pagination li a" + "[data-index='" + index + "']").removeClass("active");
        $(".onepage-pagination li a" + "[data-index='" + next.data("index") + "']").addClass("active");
      }

      $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
      $("body").addClass("viewing-page-"+next.data("index"))

      if (history.replaceState && settings.updateURL == true) {
        var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (index + 1);
        history.pushState( {}, document.title, href );
      }
      el.transformPage(settings, pos, next.data("index"));
    }

    $.fn.moveUp = function() {
      var el = $(this)
      index = $(settings.sectionContainer +".active").data("index");
      current = $(settings.sectionContainer + "[data-index='" + index + "']");
      next = $(settings.sectionContainer + "[data-index='" + (index - 1) + "']");

      if(next.length < 1) {
        if (settings.loop == true) {
          pos = ((total - 1) * 100) * -1;
          next = $(settings.sectionContainer + "[data-index='"+total+"']");
        }
        else {
          return
        }
      }else {
        pos = ((next.data("index") - 1) * 100) * -1;
      }
      if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data("index"));
      current.removeClass("active")
      next.addClass("active")
      if(settings.pagination == true) {
        $(".onepage-pagination li a" + "[data-index='" + index + "']").removeClass("active");
        $(".onepage-pagination li a" + "[data-index='" + next.data("index") + "']").addClass("active");
      }
      $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
      $("body").addClass("viewing-page-"+next.data("index"))

      if (history.replaceState && settings.updateURL == true) {
        var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (index - 1);
        history.pushState( {}, document.title, href );
      }
      el.transformPage(settings, pos, next.data("index"));
    }

    $.fn.moveTo = function(page_index) {
      current = $(settings.sectionContainer + ".active")
      next = $(settings.sectionContainer + "[data-index='" + (page_index) + "']");
      if(next.length > 0) {
        if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data("index"));
        current.removeClass("active")
        next.addClass("active")
        $(".onepage-pagination li a" + ".active").removeClass("active");
        $(".onepage-pagination li a" + "[data-index='" + (page_index) + "']").addClass("active");
        $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
        $("body").addClass("viewing-page-"+next.data("index"))

        pos = ((page_index - 1) * 100) * -1;

        if (history.replaceState && settings.updateURL == true) {
            var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (page_index - 1);
            history.pushState( {}, document.title, href );
        }
        el.transformPage(settings, pos, page_index);
      }
    }

    function responsive() {
      //start modification
      var valForTest = false;
      var typeOfRF = typeof settings.responsiveFallback

      if(typeOfRF == "number"){
      	valForTest = $(window).width() < settings.responsiveFallback;
      }
      if(typeOfRF == "boolean"){
      	valForTest = settings.responsiveFallback;
      }
      if(typeOfRF == "function"){
      	valFunction = settings.responsiveFallback();
      	valForTest = valFunction;
      	typeOFv = typeof valForTest;
      	if(typeOFv == "number"){
      		valForTest = $(window).width() < valFunction;
      	}
      }

      //end modification
      if (valForTest) {
        $("body").addClass("disabled-onepage-scroll");
        $(document).unbind('mousewheel DOMMouseScroll MozMousePixelScroll');
        el.swipeEvents().unbind("swipeDown swipeUp");
      } else {
        if($("body").hasClass("disabled-onepage-scroll")) {
          $("body").removeClass("disabled-onepage-scroll");
          $("html, body, .wrapper").animate({ scrollTop: 0 }, "fast");
        }


        el.swipeEvents().bind("swipeDown",  function(event){
          if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
          el.moveUp();
        }).bind("swipeUp", function(event){
          if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
          el.moveDown();
        });

        $(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {
          event.preventDefault();
          var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
          init_scroll(event, delta);
        });
      }
    }


    function init_scroll(event, delta) {
        deltaOfInterest = delta;
        var timeNow = new Date().getTime();
        // Cancel scroll if currently animating or within quiet period
        if(timeNow - lastAnimation < quietPeriod + settings.animationTime) {
            // event.preventDefault();
            return;
        }

        if (deltaOfInterest < 0) {
          el.moveDown()
        } else {
          el.moveUp()
        }
        lastAnimation = timeNow;
    }

    // Prepare everything before binding wheel scroll

    el.addClass("onepage-wrapper").css("position","relative");
    $.each( sections, function(i) {
      $(this).css({
        position: "absolute",
        top: topPos + "%"
      }).addClass("section").attr("data-index", i+1);


      $(this).css({
        position: "absolute",
        left: ( settings.direction == 'horizontal' )
          ? leftPos + "%"
          : 0,
        top: ( settings.direction == 'vertical' || settings.direction != 'horizontal' )
          ? topPos + "%"
          : 0
      });

      if (settings.direction == 'horizontal')
        leftPos = leftPos + 100;
      else
        topPos = topPos + 100;


      if(settings.pagination == true) {
        paginationList += "<li><a data-index='"+(i+1)+"' href='#" + (i+1) + "'></a></li>"
      }
    });

    el.swipeEvents().bind("swipeDown",  function(event){
      if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
      el.moveUp();
    }).bind("swipeUp", function(event){
      if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
      el.moveDown();
    });

    // Create Pagination and Display Them
    if (settings.pagination == true) {
      if ($('ul.onepage-pagination').length < 1) $("<ul class='onepage-pagination'></ul>").prependTo("body");

      if( settings.direction == 'horizontal' ) {
        posLeft = (el.find(".onepage-pagination").width() / 2) * -1;
        el.find(".onepage-pagination").css("margin-left", posLeft);
      } else {
        posTop = (el.find(".onepage-pagination").height() / 2) * -1;
        el.find(".onepage-pagination").css("margin-top", posTop);
      }
      $('ul.onepage-pagination').html(paginationList);
    }

    if(window.location.hash != "" && window.location.hash != "#1") {
      init_index =  window.location.hash.replace("#", "")

      if (parseInt(init_index) <= total && parseInt(init_index) > 0) {
        $(settings.sectionContainer + "[data-index='" + init_index + "']").addClass("active")
        $("body").addClass("viewing-page-"+ init_index)
        if(settings.pagination == true) $(".onepage-pagination li a" + "[data-index='" + init_index + "']").addClass("active");

        next = $(settings.sectionContainer + "[data-index='" + (init_index) + "']");
        if(next) {
          next.addClass("active")
          if(settings.pagination == true) $(".onepage-pagination li a" + "[data-index='" + (init_index) + "']").addClass("active");
          $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
          $("body").addClass("viewing-page-"+next.data("index"))
          if (history.replaceState && settings.updateURL == true) {
            var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (init_index);
            history.pushState( {}, document.title, href );
          }
        }
        pos = ((init_index - 1) * 100) * -1;
        el.transformPage(settings, pos, init_index);
      } else {
        $(settings.sectionContainer + "[data-index='1']").addClass("active")
        $("body").addClass("viewing-page-1")
        if(settings.pagination == true) $(".onepage-pagination li a" + "[data-index='1']").addClass("active");
      }
    }else{
      $(settings.sectionContainer + "[data-index='1']").addClass("active")
      $("body").addClass("viewing-page-1")
      if(settings.pagination == true) $(".onepage-pagination li a" + "[data-index='1']").addClass("active");
    }

    if(settings.pagination == true)  {
      $(".onepage-pagination li a").click(function (){
        var page_index = $(this).data("index");
        el.moveTo(page_index);
      });
    }


    $(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {
      // event.preventDefault();
      var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
      if(!$("body").hasClass("disabled-onepage-scroll")) init_scroll(event, delta);
    });


    if(settings.responsiveFallback != false) {
      $(window).resize(function() {
        responsive();
      });

      responsive();
    }

    if(settings.keyboard == true) {
      $(document).keydown(function(e) {
        var tag = e.target.tagName.toLowerCase();

        if (!$("body").hasClass("disabled-onepage-scroll")) {
          switch(e.which) {
            case 38:
              if (tag != 'input' && tag != 'textarea') el.moveUp()
            break;
            case 40:
              if (tag != 'input' && tag != 'textarea') el.moveDown()
            break;
            case 32: //spacebar
              if (tag != 'input' && tag != 'textarea') el.moveDown()
            break;
            case 33: //pageg up
              if (tag != 'input' && tag != 'textarea') el.moveUp()
            break;
            case 34: //page dwn
              if (tag != 'input' && tag != 'textarea') el.moveDown()
            break;
            case 36: //home
              el.moveTo(1);
            break;
            case 35: //end
              el.moveTo(total);
            break;
            default: return;
          }
        }

      });
    }
    return false;
  }


}(window.jQuery);
;$(document).ready(function(){
        $(".nav").on("click","a", function (event) {
            //отменяем стандартную обработку нажатия по ссылке
            event.preventDefault();
            //забираем идентификатор бока с атрибута href
            var id  = $(this).attr('href'),
            //узнаем высоту от начала страницы до блока на который ссылается якорь
                top = $(id).offset().top;
            //анимируем переход на расстояние - top за 1500 мс
            $('body,html').animate({scrollTop: top}, 500);
        });
    });
    $(document).ready(function(){
        $(".desc").on("click","a", function (event) {
            //отменяем стандартную обработку нажатия по ссылке
            event.preventDefault();
            //забираем идентификатор бока с атрибута href
            var id  = $(this).attr('href'),
            //узнаем высоту от начала страницы до блока на который ссылается якорь
                top = $(id).offset().top;
            //анимируем переход на расстояние - top за 1500 мс
            $('body,html').animate({scrollTop: top}, 500);
        });
    });;var btnClose = document.querySelector('.btn--close');
var overlayBox = document.querySelector('.overlay-box');



btnClose.addEventListener('click', function(evt){
     if (overlayBox.style.display='flex')
     overlayBox.style.display='none'
})
;// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);

  const minutes = Math.floor(roundTime / 60);
  const seconds = roundTime - minutes * 60;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${formattedSeconds}`;
};

const onPlayerReady = () => {
  let interval;
  let durationSec = player.getDuration();

  $(".player__duration-estimate").text(formatTime(durationSec));

  if (typeof interval !== "undefined") {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
      left: `${completedPercent}%`
    });

    $(".player__duration-completed").text(formatTime(completedSec));
  }, 1000);
};

const eventsInit = () => {
  $(".player__start").on("click", e => {
    e.preventDefault();
    const btn = $(e.currentTarget);

    if (btn.hasClass("paused")) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  $(".player__playback").on("click", e => {
    const bar = $(e.currentTarget);
    const newButtonPosition = e.pageX - bar.offset().left;
    const buttonPosPercent = (newButtonPosition / bar.width()) * 100;
    const newPlayerTimeSec = (player.getDuration() / 100) * buttonPosPercent;

    $(".player__playback-button").css({
      left: `${buttonPosPercent}%`
    });

    player.seekTo(newPlayerTimeSec);
  });

  $(".player__splash").on("click", e => {
    player.playVideo();
  });
};

const onPlayerStateChange = event => {
  const playerButton = $(".player__start");
  /*
  -1 (воспроизведение видео не начато)
  0 (воспроизведение видео завершено)
  1 (воспроизведение)
  2 (пауза)
  3 (буферизация)
  5 (видео подают реплики).
   */
  switch (event.data) {
    case 1: 
      $('.player__wrapper').addClass('active');
      playerButton.addClass("paused");
      break;
    case 2: 
      playerButton.removeClass("paused");
      break;
  }
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    height: "405",
    width: "660",
    videoId: "BzdA5rOdwQ8",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}

eventsInit();;/* Индекс слайда по умолчанию */
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
};const left = document.getElementById("left");
const right = document.getElementById("right");
const list = document.getElementById("list");
const computed = getComputedStyle(list);

const minRight = 0;
const maxRight = list.offsetWidth;
const step = list.offsetWidth;
let currentRight = 0;

list.style.right = currentRight + 'px';

right.addEventListener("click",function(evt) {
    evt.preventDefault();    
    if (currentRight < maxRight) {
        currentRight += step;
        list.style.right = currentRight + 'px';
    } else {
        currentRight = minRight;
        list.style.right = currentRight + 'px';
    }
});

left.addEventListener("click",function(evt) {
    evt.preventDefault();

    if (currentRight>minRight) {
        currentRight -= step;
        list.style.right = currentRight + 'px';
    } else {
        currentRight = maxRight;
        list.style.right = currentRight + 'px';
    }
});


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZC5qcyIsImZvcm0uanMiLCJmcy1tZW51LmpzIiwiaWNvbl9jdXN0b21JbWFnZS5qcyIsImpxdWVyeS5vbmVwYWdlLXNjcm9sbC5qcyIsIm1haW4tbWVudS5qcyIsIm92ZXJsYXkuanMiLCJwbGF5ZXIuanMiLCJzbGlkZXItcmV2aWV3cy5qcyIsInNsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0NkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ3phQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0NUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0NqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmVydGljYWwtYWNjb3JkX19saXN0XCIpO1xyXG4vLyBjb25zdCB0cmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi52ZXJ0aWNhbC1hY2NvcmRfX3RyaWdnZXJcIik7XHJcbmxldCBsYXN0QWN0aXZlOyBcclxuY29uc3QgaXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcudmVydGljYWwtYWNjb3JkX19pdGVtJyk7XHJcblxyXG5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgKCdjbGljaycsIGZ1bmN0aW9uKGV2dCkge1xyXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBcclxuICAgIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInZlcnRpY2FsLWFjY29yZF9fdHJpZ2dlclwiKSkge1xyXG4gICAgICAgIGlmIChsYXN0QWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGxhc3RBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZShcInZlcnRpY2FsLWFjY29yZF9faXRlbS0tYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYXN0QWN0aXZlID0gZXZ0LnRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICAgIGxhc3RBY3RpdmUuY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsLWFjY29yZF9faXRlbS0tYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2xvc2VcIikpIHtcclxuICAgICAgICBsYXN0QWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJ2ZXJ0aWNhbC1hY2NvcmRfX2l0ZW0tLWFjdGl2ZVwiKTtcclxuICAgIH1cclxufSlcclxuIiwiY29uc3QgZm9ybU9yZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciAoJyNmb3JtLW9yZGVyJyk7XHJcbmNvbnN0IHNlbmRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnI3NlbmQtYnRuJyk7XHJcbnZhciBvdmVybGF5Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXktYm94Jyk7XHJcbnZhciBvdmVybGF5VGV4dFRydWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheV9fdGV4dC0tdHJ1ZScpO1xyXG52YXIgb3ZlcmxheVRleHRGYWxzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5X190ZXh0LS1mYWxzZScpO1xyXG5cclxuXHJcbnNlbmRCdG4uYWRkRXZlbnRMaXN0ZW5lciAoJ2NsaWNrJywgZnVuY3Rpb24oZXZ0KXtcclxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHNlbmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldnQgPT4ge1xyXG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGlmICh2YWxpZGF0ZUZvcm0oZm9ybU9yZGVyKSkge1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyAoJ9Cy0YHQtSDQvtC6Jyk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICB2YXIgZm9ybWRhdGEgPSBuZXcgRm9ybURhdGEoZm9ybU9yZGVyKTtcclxuICAgICAgICBmb3JtZGF0YS5hcHBlbmQoJ3RvJywgJ21haWxAbWFpbC5ydScpO1xyXG5cclxuICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgbmFtZTogZm9ybU9yZGVyLmVsZW1lbnRzLm5hbWUudmFsdWUsXHJcbiAgICAgICAgICAgIHBob25lOiBmb3JtT3JkZXIuZWxlbWVudHMucGhvbmUudmFsdWUsXHJcbiAgICAgICAgICAgIGNvbW1lbnQ6IGZvcm1PcmRlci5lbGVtZW50cy5jb21tZW50LnZhbHVlLFxyXG4gICAgICAgICAgICB0bzogZm9ybWRhdGEuZ2V0KCd0bycpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcclxuICAgICAgICB4aHIub3BlbignUE9TVCcsICdodHRwczovL3dlYmRldi1hcGkubG9mdHNjaG9vbC5jb20vc2VuZG1haWwnKTtcclxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIlgtUmVxdWVzdGVkLVdpdGhcIiwgXCJYTUxIdHRwUmVxdWVzdFwiKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyAoeGhyLm9wZW4pO1xyXG4gICAgICAgIHhoci5zZW5kIChmb3JtZGF0YSk7XHJcbiAgICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfQvtGI0LjQsdC60LAnKTtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXlCb3guc3R5bGUuZGlzcGxheT0nZmxleCc7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5VGV4dFRydWUuc3R5bGUuZGlzcGxheT0nbm9uZSc7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5VGV4dEZhbHNlLnN0eWxlLmRpc3BsYXk9J2ZsZXgnOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29rJyk7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5Qm94LnN0eWxlLmRpc3BsYXk9J2ZsZXgnO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheVRleHRGYWxzZS5zdHlsZS5kaXNwbGF5PSdub25lJztcclxuICAgICAgICAgICAgICAgIG92ZXJsYXlUZXh0VHJ1ZS5zdHlsZS5kaXNwbGF5PSdmbGV4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vIGZ1bmN0aW9uIHZhbGlkYXRlRm9ybShmb3JtKSB7XHJcbiAgICAvLyAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcclxuICAgIC8vICAgICBpZiAoIXZhbGlkYXRlRmllbGQgKGZvcm0uZWxlbWVudHMubmFtZSkpIHtcclxuICAgIC8vICAgICAgICAgdmFsaWQgPSBmYWxzZTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgaWYgKCF2YWxpZGF0ZUZpZWxkIChmb3JtLmVsZW1lbnRzLnBob25lKSl7XHJcbiAgICAvLyAgICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgICAgICByZXR1cm4gdmFsaWQ7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBmdW5jdGlvbiB2YWxpZGF0ZUZpZWxkKGZvcm1fX2lucHV0KSB7XHJcbiAgICAvLyAgICAgaWYgKCFmb3JtX19pbnB1dC5jaGVja1ZhbGlkaXR5KCkpIHtcclxuICAgIC8vICAgICAgICAgZm9ybV9faW5wdXQubmV4dEVsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50ID0gZm9ybV9faW5wdXQudmFsaWRhdGlvbk1lc3NhZ2U7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICBmb3JtX19pbnB1dC5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQgPSAnJztcclxuICAgIC8vICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKGZvcm1PcmRlci5lbGVtZW50cy5uYW1lLnZhbHVlKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGZvcm1PcmRlci5lbGVtZW50cy5waG9uZS52YWx1ZSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhmb3JtT3JkZXIuZWxlbWVudHMuY29tbWVudC52YWx1ZSk7XHJcblxyXG59KSIsInZhciBmc01lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnMtbWVudScpO1xyXG52YXIgaGFtYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbWJ1cmdlci1tZW51LWxpbmsnKTtcclxudmFyIGNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlLS1mcy1tZW51Jyk7XHJcblxyXG5cclxuY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldnQpe1xyXG4gICAgIGlmIChmc01lbnUuc3R5bGUuZGlzcGxheT0nZmxleCcpXHJcbiAgICAgZnNNZW51LnN0eWxlLmRpc3BsYXk9J25vbmUnXHJcbn0pXHJcblxyXG5oYW1idXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldnQpe1xyXG4gICAgIGlmIChmc01lbnUuc3R5bGUuZGlzcGxheT0nbm9uZScpXHJcbiAgICAgZnNNZW51LnN0eWxlLmRpc3BsYXk9J2ZsZXgnXHJcbiAgICAgZnNNZW51LnN0eWxlLmRpc3BsYXk9J2ZsZXgnXHJcbn0pIiwieW1hcHMucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG15TWFwID0gbmV3IHltYXBzLk1hcCgnbWFwJywge1xyXG4gICAgICAgICAgICBjZW50ZXI6IFs1NS43NSwgMzcuNjBdLFxyXG4gICAgICAgICAgICB6b29tOiAxM1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc2VhcmNoQ29udHJvbFByb3ZpZGVyOiAneWFuZGV4I3NlYXJjaCdcclxuICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgLy8g0KHQvtC30LTQsNGR0Lwg0LzQsNC60LXRgiDRgdC+0LTQtdGA0LbQuNC80L7Qs9C+LlxyXG4gICAgICAgIE15SWNvbkNvbnRlbnRMYXlvdXQgPSB5bWFwcy50ZW1wbGF0ZUxheW91dEZhY3RvcnkuY3JlYXRlQ2xhc3MoXHJcbiAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiY29sb3I6ICNGRkZGRkY7IGZvbnQtd2VpZ2h0OiBib2xkO1wiPiRbcHJvcGVydGllcy5pY29uQ29udGVudF08L2Rpdj4nXHJcbiAgICAgICAgKSxcclxuXHJcbiAgICAgICAgbXlQbGFjZW1hcmsxID0gbmV3IHltYXBzLlBsYWNlbWFyayhbNTUuNzU4OTMwOTAyMDc4NTUsMzcuNTgzMDgyOTUyMDg3NDE2XSwge1xyXG4gICAgICAgICAgICBoaW50Q29udGVudDogJ9Ch0L7QsdGB0YLQstC10L3QvdGL0Lkg0LfQvdCw0YfQvtC6INC80LXRgtC60LgnLFxyXG4gICAgICAgICAgICBiYWxsb29uQ29udGVudDogJ9Cf0LXRgNCy0LDRjydcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIC8vINCe0L/RhtC40LguXHJcbiAgICAgICAgICAgIC8vINCd0LXQvtCx0YXQvtC00LjQvNC+INGD0LrQsNC30LDRgtGMINC00LDQvdC90YvQuSDRgtC40L8g0LzQsNC60LXRgtCwLlxyXG4gICAgICAgICAgICBpY29uTGF5b3V0OiAnZGVmYXVsdCNpbWFnZScsXHJcbiAgICAgICAgICAgIC8vINCh0LLQvtGRINC40LfQvtCx0YDQsNC20LXQvdC40LUg0LjQutC+0L3QutC4INC80LXRgtC60LguXHJcbiAgICAgICAgICAgIGljb25JbWFnZUhyZWY6ICdpY29ucy9tYXAtaWtvbi5naWYnLFxyXG4gICAgICAgICAgICAvLyDQoNCw0LfQvNC10YDRiyDQvNC10YLQutC4LlxyXG4gICAgICAgICAgICBpY29uSW1hZ2VTaXplOiBbNDYsIDU3XSxcclxuICAgICAgICAgICAgLy8g0KHQvNC10YnQtdC90LjQtSDQu9C10LLQvtCz0L4g0LLQtdGA0YXQvdC10LPQviDRg9Cz0LvQsCDQuNC60L7QvdC60Lgg0L7RgtC90L7RgdC40YLQtdC70YzQvdC+XHJcbiAgICAgICAgICAgIC8vINC10ZEgXCLQvdC+0LbQutC4XCIgKNGC0L7Rh9C60Lgg0L/RgNC40LLRj9C30LrQuCkuXHJcbiAgICAgICAgICAgIGljb25JbWFnZU9mZnNldDogIFstNSwgLTM4XVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIG15UGxhY2VtYXJrMiA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoWzU1Ljc0OTgwNjgyMTYzMTA2LDM3LjYwNDExMTQ3MDc2NDE3NF0sIHtcclxuICAgICAgICAgICAgaGludENvbnRlbnQ6ICfQodC+0LHRgdGC0LLQtdC90L3Ri9C5INC30L3QsNGH0L7QuiDQvNC10YLQutC4JyxcclxuICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnQ6ICfQktGC0L7RgNCw0Y8nXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBpY29uTGF5b3V0OiAnZGVmYXVsdCNpbWFnZScsXHJcbiAgICAgICAgICAgIGljb25JbWFnZUhyZWY6ICdpY29ucy9tYXAtaWtvbi5naWYnLFxyXG4gICAgICAgICAgICBpY29uSW1hZ2VTaXplOiBbNDYsIDU3XSxcclxuICAgICAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiAgWy01LCAtMzhdXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgbXlQbGFjZW1hcmszID0gbmV3IHltYXBzLlBsYWNlbWFyayhbNTUuNzU4MTgwNzI3MDAzMSwzNy42MjQwMjQxOTA0OTA3M10sIHtcclxuICAgICAgICAgICAgaGludENvbnRlbnQ6ICfQodC+0LHRgdGC0LLQtdC90L3Ri9C5INC30L3QsNGH0L7QuiDQvNC10YLQutC4JyxcclxuICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnQ6ICfQotGA0LXRgtGM0Y8nXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBpY29uTGF5b3V0OiAnZGVmYXVsdCNpbWFnZScsXHJcbiAgICAgICAgICAgIGljb25JbWFnZUhyZWY6ICdpY29ucy9tYXAtaWtvbi5naWYnLFxyXG4gICAgICAgICAgICBpY29uSW1hZ2VTaXplOiBbNDYsIDU3XSxcclxuICAgICAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiAgWy01LCAtMzhdXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgbXlQbGFjZW1hcms0ID0gbmV3IHltYXBzLlBsYWNlbWFyayhbNTUuNzQzMzE3Mzc1ODIzNzYsMzcuNTgwODIzMDE1MTY3ODRdLCB7XHJcbiAgICAgICAgICAgIGhpbnRDb250ZW50OiAn0KHQvtCx0YHRgtCy0LXQvdC90YvQuSDQt9C90LDRh9C+0Log0LzQtdGC0LrQuCcsXHJcbiAgICAgICAgICAgIGJhbGxvb25Db250ZW50OiAn0KfQtdGC0LLQtdGA0YLQsNGPJ1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxyXG4gICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaWNvbnMvbWFwLWlrb24uZ2lmJyxcclxuICAgICAgICAgICAgaWNvbkltYWdlU2l6ZTogWzQ2LCA1N10sXHJcbiAgICAgICAgICAgIGljb25JbWFnZU9mZnNldDogIFstNSwgLTM4XVxyXG4gICAgICAgIH0pO1xyXG4gICAgbXlNYXAuZ2VvT2JqZWN0c1xyXG4gICAgLmFkZChteVBsYWNlbWFyazEpXHJcbiAgICAuYWRkKG15UGxhY2VtYXJrMilcclxuICAgIC5hZGQobXlQbGFjZW1hcmszKVxyXG4gICAgLmFkZChteVBsYWNlbWFyazQpO1xyXG4gICAgbXlNYXAuYmVoYXZpb3JzLmRpc2FibGUoJ3Njcm9sbFpvb20nKTtcclxufSk7IiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIGpxdWVyeS1vbmVwYWdlLXNjcm9sbC5qcyB2MS4zLjFcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMyBQZXRlIFJvandvbmdzdXJpeWEuXG4gKiBodHRwOi8vd3d3LnRoZXBldGVkZXNpZ24uY29tXG4gKlxuICogQ3JlYXRlIGFuIEFwcGxlLWxpa2Ugd2Vic2l0ZSB0aGF0IGxldCB1c2VyIHNjcm9sbFxuICogb25lIHBhZ2UgYXQgYSB0aW1lXG4gKlxuICogQ3JlZGl0OiBFaWtlIFNlbmQgZm9yIHRoZSBhd2Vzb21lIHN3aXBlIGV2ZW50XG4gKiBodHRwczovL2dpdGh1Yi5jb20vcGVhY2hhbmFuci9vbmVwYWdlLXNjcm9sbFxuICpcbiAqIExpY2Vuc2U6IEdQTCB2M1xuICpcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuIWZ1bmN0aW9uKCQpe1xuXG4gIHZhciBkZWZhdWx0cyA9IHtcbiAgICBzZWN0aW9uQ29udGFpbmVyOiBcInNlY3Rpb25cIixcbiAgICBlYXNpbmc6IFwiZWFzZVwiLFxuICAgIGFuaW1hdGlvblRpbWU6IDEwMDAsXG4gICAgcGFnaW5hdGlvbjogdHJ1ZSxcbiAgICB1cGRhdGVVUkw6IGZhbHNlLFxuICAgIGtleWJvYXJkOiB0cnVlLFxuICAgIGJlZm9yZU1vdmU6IG51bGwsXG4gICAgYWZ0ZXJNb3ZlOiBudWxsLFxuICAgIGxvb3A6IHRydWUsXG4gICAgcmVzcG9uc2l2ZUZhbGxiYWNrOiBmYWxzZSxcbiAgICBkaXJlY3Rpb24gOiAndmVydGljYWwnXG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiAgQ3JlZGl0OiBFaWtlIFNlbmQgZm9yIHRoZSBhd2Vzb21lIHN3aXBlIGV2ZW50ICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkLmZuLnN3aXBlRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBzdGFydFgsXG4gICAgICAgICAgICBzdGFydFksXG4gICAgICAgICAgICAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgJHRoaXMuYmluZCgndG91Y2hzdGFydCcsIHRvdWNoc3RhcnQpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRvdWNoc3RhcnQoZXZlbnQpIHtcbiAgICAgICAgICB2YXIgdG91Y2hlcyA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlcztcbiAgICAgICAgICBpZiAodG91Y2hlcyAmJiB0b3VjaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgc3RhcnRYID0gdG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgICAgIHN0YXJ0WSA9IHRvdWNoZXNbMF0ucGFnZVk7XG4gICAgICAgICAgICAkdGhpcy5iaW5kKCd0b3VjaG1vdmUnLCB0b3VjaG1vdmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHRvdWNobW92ZShldmVudCkge1xuICAgICAgICAgIHZhciB0b3VjaGVzID0gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzO1xuICAgICAgICAgIGlmICh0b3VjaGVzICYmIHRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgZGVsdGFYID0gc3RhcnRYIC0gdG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgICAgIHZhciBkZWx0YVkgPSBzdGFydFkgLSB0b3VjaGVzWzBdLnBhZ2VZO1xuXG4gICAgICAgICAgICBpZiAoZGVsdGFYID49IDUwKSB7XG4gICAgICAgICAgICAgICR0aGlzLnRyaWdnZXIoXCJzd2lwZUxlZnRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVsdGFYIDw9IC01MCkge1xuICAgICAgICAgICAgICAkdGhpcy50cmlnZ2VyKFwic3dpcGVSaWdodFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZWx0YVkgPj0gNTApIHtcbiAgICAgICAgICAgICAgJHRoaXMudHJpZ2dlcihcInN3aXBlVXBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVsdGFZIDw9IC01MCkge1xuICAgICAgICAgICAgICAkdGhpcy50cmlnZ2VyKFwic3dpcGVEb3duXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhWCkgPj0gNTAgfHwgTWF0aC5hYnMoZGVsdGFZKSA+PSA1MCkge1xuICAgICAgICAgICAgICAkdGhpcy51bmJpbmQoJ3RvdWNobW92ZScsIHRvdWNobW92ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgJC5mbi5vbmVwYWdlX3Njcm9sbCA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICAgIHZhciBzZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyksXG4gICAgICAgIGVsID0gJCh0aGlzKSxcbiAgICAgICAgc2VjdGlvbnMgPSAkKHNldHRpbmdzLnNlY3Rpb25Db250YWluZXIpXG4gICAgICAgIHRvdGFsID0gc2VjdGlvbnMubGVuZ3RoLFxuICAgICAgICBzdGF0dXMgPSBcIm9mZlwiLFxuICAgICAgICB0b3BQb3MgPSAwLFxuICAgICAgICBsZWZ0UG9zID0gMCxcbiAgICAgICAgbGFzdEFuaW1hdGlvbiA9IDAsXG4gICAgICAgIHF1aWV0UGVyaW9kID0gNTAwLFxuICAgICAgICBwYWdpbmF0aW9uTGlzdCA9IFwiXCI7XG5cbiAgICAkLmZuLnRyYW5zZm9ybVBhZ2UgPSBmdW5jdGlvbihzZXR0aW5ncywgcG9zLCBpbmRleCkge1xuICAgICAgaWYgKHR5cGVvZiBzZXR0aW5ncy5iZWZvcmVNb3ZlID09ICdmdW5jdGlvbicpIHNldHRpbmdzLmJlZm9yZU1vdmUoaW5kZXgpO1xuXG4gICAgICAvLyBKdXN0IGEgc2ltcGxlIGVkaXQgdGhhdCBtYWtlcyB1c2Ugb2YgbW9kZXJuaXpyIHRvIGRldGVjdCBhbiBJRTggYnJvd3NlciBhbmQgY2hhbmdlcyB0aGUgdHJhbnNmb3JtIG1ldGhvZCBpbnRvXG4gICAgXHQvLyBhbiB0b3AgYW5pbWF0ZSBzbyBJRTggdXNlcnMgY2FuIGFsc28gdXNlIHRoaXMgc2NyaXB0LlxuICAgIFx0aWYoJCgnaHRtbCcpLmhhc0NsYXNzKCdpZTgnKSl7XG4gICAgICAgIGlmIChzZXR0aW5ncy5kaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgdmFyIHRvcHBvcyA9IChlbC53aWR0aCgpLzEwMCkqcG9zO1xuICAgICAgICAgICQodGhpcykuYW5pbWF0ZSh7bGVmdDogdG9wcG9zKydweCd9LHNldHRpbmdzLmFuaW1hdGlvblRpbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciB0b3Bwb3MgPSAoZWwuaGVpZ2h0KCkvMTAwKSpwb3M7XG4gICAgICAgICAgJCh0aGlzKS5hbmltYXRlKHt0b3A6IHRvcHBvcysncHgnfSxzZXR0aW5ncy5hbmltYXRpb25UaW1lKTtcbiAgICAgICAgfVxuICAgIFx0fSBlbHNle1xuICAgIFx0ICAkKHRoaXMpLmNzcyh7XG4gICAgXHQgICAgXCItd2Via2l0LXRyYW5zZm9ybVwiOiAoIHNldHRpbmdzLmRpcmVjdGlvbiA9PSAnaG9yaXpvbnRhbCcgKSA/IFwidHJhbnNsYXRlM2QoXCIgKyBwb3MgKyBcIiUsIDAsIDApXCIgOiBcInRyYW5zbGF0ZTNkKDAsIFwiICsgcG9zICsgXCIlLCAwKVwiLFxuICAgICAgICAgXCItd2Via2l0LXRyYW5zaXRpb25cIjogXCJhbGwgXCIgKyBzZXR0aW5ncy5hbmltYXRpb25UaW1lICsgXCJtcyBcIiArIHNldHRpbmdzLmVhc2luZyxcbiAgICAgICAgIFwiLW1vei10cmFuc2Zvcm1cIjogKCBzZXR0aW5ncy5kaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnICkgPyBcInRyYW5zbGF0ZTNkKFwiICsgcG9zICsgXCIlLCAwLCAwKVwiIDogXCJ0cmFuc2xhdGUzZCgwLCBcIiArIHBvcyArIFwiJSwgMClcIixcbiAgICAgICAgIFwiLW1vei10cmFuc2l0aW9uXCI6IFwiYWxsIFwiICsgc2V0dGluZ3MuYW5pbWF0aW9uVGltZSArIFwibXMgXCIgKyBzZXR0aW5ncy5lYXNpbmcsXG4gICAgICAgICBcIi1tcy10cmFuc2Zvcm1cIjogKCBzZXR0aW5ncy5kaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnICkgPyBcInRyYW5zbGF0ZTNkKFwiICsgcG9zICsgXCIlLCAwLCAwKVwiIDogXCJ0cmFuc2xhdGUzZCgwLCBcIiArIHBvcyArIFwiJSwgMClcIixcbiAgICAgICAgIFwiLW1zLXRyYW5zaXRpb25cIjogXCJhbGwgXCIgKyBzZXR0aW5ncy5hbmltYXRpb25UaW1lICsgXCJtcyBcIiArIHNldHRpbmdzLmVhc2luZyxcbiAgICAgICAgIFwidHJhbnNmb3JtXCI6ICggc2V0dGluZ3MuZGlyZWN0aW9uID09ICdob3Jpem9udGFsJyApID8gXCJ0cmFuc2xhdGUzZChcIiArIHBvcyArIFwiJSwgMCwgMClcIiA6IFwidHJhbnNsYXRlM2QoMCwgXCIgKyBwb3MgKyBcIiUsIDApXCIsXG4gICAgICAgICBcInRyYW5zaXRpb25cIjogXCJhbGwgXCIgKyBzZXR0aW5ncy5hbmltYXRpb25UaW1lICsgXCJtcyBcIiArIHNldHRpbmdzLmVhc2luZ1xuICAgIFx0ICB9KTtcbiAgICBcdH1cbiAgICAgICQodGhpcykub25lKCd3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAodHlwZW9mIHNldHRpbmdzLmFmdGVyTW92ZSA9PSAnZnVuY3Rpb24nKSBzZXR0aW5ncy5hZnRlck1vdmUoaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgJC5mbi5tb3ZlRG93biA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGVsID0gJCh0aGlzKVxuICAgICAgaW5kZXggPSAkKHNldHRpbmdzLnNlY3Rpb25Db250YWluZXIgK1wiLmFjdGl2ZVwiKS5kYXRhKFwiaW5kZXhcIik7XG4gICAgICBjdXJyZW50ID0gJChzZXR0aW5ncy5zZWN0aW9uQ29udGFpbmVyICsgXCJbZGF0YS1pbmRleD0nXCIgKyBpbmRleCArIFwiJ11cIik7XG4gICAgICBuZXh0ID0gJChzZXR0aW5ncy5zZWN0aW9uQ29udGFpbmVyICsgXCJbZGF0YS1pbmRleD0nXCIgKyAoaW5kZXggKyAxKSArIFwiJ11cIik7XG4gICAgICBpZihuZXh0Lmxlbmd0aCA8IDEpIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLmxvb3AgPT0gdHJ1ZSkge1xuICAgICAgICAgIHBvcyA9IDA7XG4gICAgICAgICAgbmV4dCA9ICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lciArIFwiW2RhdGEtaW5kZXg9JzEnXVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICB9ZWxzZSB7XG4gICAgICAgIHBvcyA9IChpbmRleCAqIDEwMCkgKiAtMTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3MuYmVmb3JlTW92ZSA9PSAnZnVuY3Rpb24nKSBzZXR0aW5ncy5iZWZvcmVNb3ZlKCBuZXh0LmRhdGEoXCJpbmRleFwiKSk7XG4gICAgICBjdXJyZW50LnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpXG4gICAgICBuZXh0LmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgaWYoc2V0dGluZ3MucGFnaW5hdGlvbiA9PSB0cnVlKSB7XG4gICAgICAgICQoXCIub25lcGFnZS1wYWdpbmF0aW9uIGxpIGFcIiArIFwiW2RhdGEtaW5kZXg9J1wiICsgaW5kZXggKyBcIiddXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAkKFwiLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhXCIgKyBcIltkYXRhLWluZGV4PSdcIiArIG5leHQuZGF0YShcImluZGV4XCIpICsgXCInXVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgIH1cblxuICAgICAgJChcImJvZHlcIilbMF0uY2xhc3NOYW1lID0gJChcImJvZHlcIilbMF0uY2xhc3NOYW1lLnJlcGxhY2UoL1xcYnZpZXdpbmctcGFnZS1cXGQuKj9cXGIvZywgJycpO1xuICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJ2aWV3aW5nLXBhZ2UtXCIrbmV4dC5kYXRhKFwiaW5kZXhcIikpXG5cbiAgICAgIGlmIChoaXN0b3J5LnJlcGxhY2VTdGF0ZSAmJiBzZXR0aW5ncy51cGRhdGVVUkwgPT0gdHJ1ZSkge1xuICAgICAgICB2YXIgaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnN1YnN0cigwLHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJyMnKSkgKyBcIiNcIiArIChpbmRleCArIDEpO1xuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSgge30sIGRvY3VtZW50LnRpdGxlLCBocmVmICk7XG4gICAgICB9XG4gICAgICBlbC50cmFuc2Zvcm1QYWdlKHNldHRpbmdzLCBwb3MsIG5leHQuZGF0YShcImluZGV4XCIpKTtcbiAgICB9XG5cbiAgICAkLmZuLm1vdmVVcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGVsID0gJCh0aGlzKVxuICAgICAgaW5kZXggPSAkKHNldHRpbmdzLnNlY3Rpb25Db250YWluZXIgK1wiLmFjdGl2ZVwiKS5kYXRhKFwiaW5kZXhcIik7XG4gICAgICBjdXJyZW50ID0gJChzZXR0aW5ncy5zZWN0aW9uQ29udGFpbmVyICsgXCJbZGF0YS1pbmRleD0nXCIgKyBpbmRleCArIFwiJ11cIik7XG4gICAgICBuZXh0ID0gJChzZXR0aW5ncy5zZWN0aW9uQ29udGFpbmVyICsgXCJbZGF0YS1pbmRleD0nXCIgKyAoaW5kZXggLSAxKSArIFwiJ11cIik7XG5cbiAgICAgIGlmKG5leHQubGVuZ3RoIDwgMSkge1xuICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PSB0cnVlKSB7XG4gICAgICAgICAgcG9zID0gKCh0b3RhbCAtIDEpICogMTAwKSAqIC0xO1xuICAgICAgICAgIG5leHQgPSAkKHNldHRpbmdzLnNlY3Rpb25Db250YWluZXIgKyBcIltkYXRhLWluZGV4PSdcIit0b3RhbCtcIiddXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9ZWxzZSB7XG4gICAgICAgIHBvcyA9ICgobmV4dC5kYXRhKFwiaW5kZXhcIikgLSAxKSAqIDEwMCkgKiAtMTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3MuYmVmb3JlTW92ZSA9PSAnZnVuY3Rpb24nKSBzZXR0aW5ncy5iZWZvcmVNb3ZlKG5leHQuZGF0YShcImluZGV4XCIpKTtcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIilcbiAgICAgIG5leHQuYWRkQ2xhc3MoXCJhY3RpdmVcIilcbiAgICAgIGlmKHNldHRpbmdzLnBhZ2luYXRpb24gPT0gdHJ1ZSkge1xuICAgICAgICAkKFwiLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhXCIgKyBcIltkYXRhLWluZGV4PSdcIiArIGluZGV4ICsgXCInXVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgJChcIi5vbmVwYWdlLXBhZ2luYXRpb24gbGkgYVwiICsgXCJbZGF0YS1pbmRleD0nXCIgKyBuZXh0LmRhdGEoXCJpbmRleFwiKSArIFwiJ11cIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICB9XG4gICAgICAkKFwiYm9keVwiKVswXS5jbGFzc05hbWUgPSAkKFwiYm9keVwiKVswXS5jbGFzc05hbWUucmVwbGFjZSgvXFxidmlld2luZy1wYWdlLVxcZC4qP1xcYi9nLCAnJyk7XG4gICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcInZpZXdpbmctcGFnZS1cIituZXh0LmRhdGEoXCJpbmRleFwiKSlcblxuICAgICAgaWYgKGhpc3RvcnkucmVwbGFjZVN0YXRlICYmIHNldHRpbmdzLnVwZGF0ZVVSTCA9PSB0cnVlKSB7XG4gICAgICAgIHZhciBocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3Vic3RyKDAsd2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignIycpKSArIFwiI1wiICsgKGluZGV4IC0gMSk7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKCB7fSwgZG9jdW1lbnQudGl0bGUsIGhyZWYgKTtcbiAgICAgIH1cbiAgICAgIGVsLnRyYW5zZm9ybVBhZ2Uoc2V0dGluZ3MsIHBvcywgbmV4dC5kYXRhKFwiaW5kZXhcIikpO1xuICAgIH1cblxuICAgICQuZm4ubW92ZVRvID0gZnVuY3Rpb24ocGFnZV9pbmRleCkge1xuICAgICAgY3VycmVudCA9ICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lciArIFwiLmFjdGl2ZVwiKVxuICAgICAgbmV4dCA9ICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lciArIFwiW2RhdGEtaW5kZXg9J1wiICsgKHBhZ2VfaW5kZXgpICsgXCInXVwiKTtcbiAgICAgIGlmKG5leHQubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAodHlwZW9mIHNldHRpbmdzLmJlZm9yZU1vdmUgPT0gJ2Z1bmN0aW9uJykgc2V0dGluZ3MuYmVmb3JlTW92ZShuZXh0LmRhdGEoXCJpbmRleFwiKSk7XG4gICAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIilcbiAgICAgICAgbmV4dC5hZGRDbGFzcyhcImFjdGl2ZVwiKVxuICAgICAgICAkKFwiLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhXCIgKyBcIi5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICQoXCIub25lcGFnZS1wYWdpbmF0aW9uIGxpIGFcIiArIFwiW2RhdGEtaW5kZXg9J1wiICsgKHBhZ2VfaW5kZXgpICsgXCInXVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgJChcImJvZHlcIilbMF0uY2xhc3NOYW1lID0gJChcImJvZHlcIilbMF0uY2xhc3NOYW1lLnJlcGxhY2UoL1xcYnZpZXdpbmctcGFnZS1cXGQuKj9cXGIvZywgJycpO1xuICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcInZpZXdpbmctcGFnZS1cIituZXh0LmRhdGEoXCJpbmRleFwiKSlcblxuICAgICAgICBwb3MgPSAoKHBhZ2VfaW5kZXggLSAxKSAqIDEwMCkgKiAtMTtcblxuICAgICAgICBpZiAoaGlzdG9yeS5yZXBsYWNlU3RhdGUgJiYgc2V0dGluZ3MudXBkYXRlVVJMID09IHRydWUpIHtcbiAgICAgICAgICAgIHZhciBocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3Vic3RyKDAsd2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignIycpKSArIFwiI1wiICsgKHBhZ2VfaW5kZXggLSAxKTtcbiAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKCB7fSwgZG9jdW1lbnQudGl0bGUsIGhyZWYgKTtcbiAgICAgICAgfVxuICAgICAgICBlbC50cmFuc2Zvcm1QYWdlKHNldHRpbmdzLCBwb3MsIHBhZ2VfaW5kZXgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc3BvbnNpdmUoKSB7XG4gICAgICAvL3N0YXJ0IG1vZGlmaWNhdGlvblxuICAgICAgdmFyIHZhbEZvclRlc3QgPSBmYWxzZTtcbiAgICAgIHZhciB0eXBlT2ZSRiA9IHR5cGVvZiBzZXR0aW5ncy5yZXNwb25zaXZlRmFsbGJhY2tcblxuICAgICAgaWYodHlwZU9mUkYgPT0gXCJudW1iZXJcIil7XG4gICAgICBcdHZhbEZvclRlc3QgPSAkKHdpbmRvdykud2lkdGgoKSA8IHNldHRpbmdzLnJlc3BvbnNpdmVGYWxsYmFjaztcbiAgICAgIH1cbiAgICAgIGlmKHR5cGVPZlJGID09IFwiYm9vbGVhblwiKXtcbiAgICAgIFx0dmFsRm9yVGVzdCA9IHNldHRpbmdzLnJlc3BvbnNpdmVGYWxsYmFjaztcbiAgICAgIH1cbiAgICAgIGlmKHR5cGVPZlJGID09IFwiZnVuY3Rpb25cIil7XG4gICAgICBcdHZhbEZ1bmN0aW9uID0gc2V0dGluZ3MucmVzcG9uc2l2ZUZhbGxiYWNrKCk7XG4gICAgICBcdHZhbEZvclRlc3QgPSB2YWxGdW5jdGlvbjtcbiAgICAgIFx0dHlwZU9GdiA9IHR5cGVvZiB2YWxGb3JUZXN0O1xuICAgICAgXHRpZih0eXBlT0Z2ID09IFwibnVtYmVyXCIpe1xuICAgICAgXHRcdHZhbEZvclRlc3QgPSAkKHdpbmRvdykud2lkdGgoKSA8IHZhbEZ1bmN0aW9uO1xuICAgICAgXHR9XG4gICAgICB9XG5cbiAgICAgIC8vZW5kIG1vZGlmaWNhdGlvblxuICAgICAgaWYgKHZhbEZvclRlc3QpIHtcbiAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZC1vbmVwYWdlLXNjcm9sbFwiKTtcbiAgICAgICAgJChkb2N1bWVudCkudW5iaW5kKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsIE1vek1vdXNlUGl4ZWxTY3JvbGwnKTtcbiAgICAgICAgZWwuc3dpcGVFdmVudHMoKS51bmJpbmQoXCJzd2lwZURvd24gc3dpcGVVcFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKCQoXCJib2R5XCIpLmhhc0NsYXNzKFwiZGlzYWJsZWQtb25lcGFnZS1zY3JvbGxcIikpIHtcbiAgICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkLW9uZXBhZ2Utc2Nyb2xsXCIpO1xuICAgICAgICAgICQoXCJodG1sLCBib2R5LCAud3JhcHBlclwiKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIFwiZmFzdFwiKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZWwuc3dpcGVFdmVudHMoKS5iaW5kKFwic3dpcGVEb3duXCIsICBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgaWYgKCEkKFwiYm9keVwiKS5oYXNDbGFzcyhcImRpc2FibGVkLW9uZXBhZ2Utc2Nyb2xsXCIpKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGVsLm1vdmVVcCgpO1xuICAgICAgICB9KS5iaW5kKFwic3dpcGVVcFwiLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgaWYgKCEkKFwiYm9keVwiKS5oYXNDbGFzcyhcImRpc2FibGVkLW9uZXBhZ2Utc2Nyb2xsXCIpKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGVsLm1vdmVEb3duKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLmJpbmQoJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwgTW96TW91c2VQaXhlbFNjcm9sbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB2YXIgZGVsdGEgPSBldmVudC5vcmlnaW5hbEV2ZW50LndoZWVsRGVsdGEgfHwgLWV2ZW50Lm9yaWdpbmFsRXZlbnQuZGV0YWlsO1xuICAgICAgICAgIGluaXRfc2Nyb2xsKGV2ZW50LCBkZWx0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gaW5pdF9zY3JvbGwoZXZlbnQsIGRlbHRhKSB7XG4gICAgICAgIGRlbHRhT2ZJbnRlcmVzdCA9IGRlbHRhO1xuICAgICAgICB2YXIgdGltZU5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAvLyBDYW5jZWwgc2Nyb2xsIGlmIGN1cnJlbnRseSBhbmltYXRpbmcgb3Igd2l0aGluIHF1aWV0IHBlcmlvZFxuICAgICAgICBpZih0aW1lTm93IC0gbGFzdEFuaW1hdGlvbiA8IHF1aWV0UGVyaW9kICsgc2V0dGluZ3MuYW5pbWF0aW9uVGltZSkge1xuICAgICAgICAgICAgLy8gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWx0YU9mSW50ZXJlc3QgPCAwKSB7XG4gICAgICAgICAgZWwubW92ZURvd24oKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsLm1vdmVVcCgpXG4gICAgICAgIH1cbiAgICAgICAgbGFzdEFuaW1hdGlvbiA9IHRpbWVOb3c7XG4gICAgfVxuXG4gICAgLy8gUHJlcGFyZSBldmVyeXRoaW5nIGJlZm9yZSBiaW5kaW5nIHdoZWVsIHNjcm9sbFxuXG4gICAgZWwuYWRkQ2xhc3MoXCJvbmVwYWdlLXdyYXBwZXJcIikuY3NzKFwicG9zaXRpb25cIixcInJlbGF0aXZlXCIpO1xuICAgICQuZWFjaCggc2VjdGlvbnMsIGZ1bmN0aW9uKGkpIHtcbiAgICAgICQodGhpcykuY3NzKHtcbiAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgdG9wOiB0b3BQb3MgKyBcIiVcIlxuICAgICAgfSkuYWRkQ2xhc3MoXCJzZWN0aW9uXCIpLmF0dHIoXCJkYXRhLWluZGV4XCIsIGkrMSk7XG5cblxuICAgICAgJCh0aGlzKS5jc3Moe1xuICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICBsZWZ0OiAoIHNldHRpbmdzLmRpcmVjdGlvbiA9PSAnaG9yaXpvbnRhbCcgKVxuICAgICAgICAgID8gbGVmdFBvcyArIFwiJVwiXG4gICAgICAgICAgOiAwLFxuICAgICAgICB0b3A6ICggc2V0dGluZ3MuZGlyZWN0aW9uID09ICd2ZXJ0aWNhbCcgfHwgc2V0dGluZ3MuZGlyZWN0aW9uICE9ICdob3Jpem9udGFsJyApXG4gICAgICAgICAgPyB0b3BQb3MgKyBcIiVcIlxuICAgICAgICAgIDogMFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChzZXR0aW5ncy5kaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnKVxuICAgICAgICBsZWZ0UG9zID0gbGVmdFBvcyArIDEwMDtcbiAgICAgIGVsc2VcbiAgICAgICAgdG9wUG9zID0gdG9wUG9zICsgMTAwO1xuXG5cbiAgICAgIGlmKHNldHRpbmdzLnBhZ2luYXRpb24gPT0gdHJ1ZSkge1xuICAgICAgICBwYWdpbmF0aW9uTGlzdCArPSBcIjxsaT48YSBkYXRhLWluZGV4PSdcIisoaSsxKStcIicgaHJlZj0nI1wiICsgKGkrMSkgKyBcIic+PC9hPjwvbGk+XCJcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGVsLnN3aXBlRXZlbnRzKCkuYmluZChcInN3aXBlRG93blwiLCAgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgaWYgKCEkKFwiYm9keVwiKS5oYXNDbGFzcyhcImRpc2FibGVkLW9uZXBhZ2Utc2Nyb2xsXCIpKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZWwubW92ZVVwKCk7XG4gICAgfSkuYmluZChcInN3aXBlVXBcIiwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgaWYgKCEkKFwiYm9keVwiKS5oYXNDbGFzcyhcImRpc2FibGVkLW9uZXBhZ2Utc2Nyb2xsXCIpKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZWwubW92ZURvd24oKTtcbiAgICB9KTtcblxuICAgIC8vIENyZWF0ZSBQYWdpbmF0aW9uIGFuZCBEaXNwbGF5IFRoZW1cbiAgICBpZiAoc2V0dGluZ3MucGFnaW5hdGlvbiA9PSB0cnVlKSB7XG4gICAgICBpZiAoJCgndWwub25lcGFnZS1wYWdpbmF0aW9uJykubGVuZ3RoIDwgMSkgJChcIjx1bCBjbGFzcz0nb25lcGFnZS1wYWdpbmF0aW9uJz48L3VsPlwiKS5wcmVwZW5kVG8oXCJib2R5XCIpO1xuXG4gICAgICBpZiggc2V0dGluZ3MuZGlyZWN0aW9uID09ICdob3Jpem9udGFsJyApIHtcbiAgICAgICAgcG9zTGVmdCA9IChlbC5maW5kKFwiLm9uZXBhZ2UtcGFnaW5hdGlvblwiKS53aWR0aCgpIC8gMikgKiAtMTtcbiAgICAgICAgZWwuZmluZChcIi5vbmVwYWdlLXBhZ2luYXRpb25cIikuY3NzKFwibWFyZ2luLWxlZnRcIiwgcG9zTGVmdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3NUb3AgPSAoZWwuZmluZChcIi5vbmVwYWdlLXBhZ2luYXRpb25cIikuaGVpZ2h0KCkgLyAyKSAqIC0xO1xuICAgICAgICBlbC5maW5kKFwiLm9uZXBhZ2UtcGFnaW5hdGlvblwiKS5jc3MoXCJtYXJnaW4tdG9wXCIsIHBvc1RvcCk7XG4gICAgICB9XG4gICAgICAkKCd1bC5vbmVwYWdlLXBhZ2luYXRpb24nKS5odG1sKHBhZ2luYXRpb25MaXN0KTtcbiAgICB9XG5cbiAgICBpZih3aW5kb3cubG9jYXRpb24uaGFzaCAhPSBcIlwiICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoICE9IFwiIzFcIikge1xuICAgICAgaW5pdF9pbmRleCA9ICB3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKFwiI1wiLCBcIlwiKVxuXG4gICAgICBpZiAocGFyc2VJbnQoaW5pdF9pbmRleCkgPD0gdG90YWwgJiYgcGFyc2VJbnQoaW5pdF9pbmRleCkgPiAwKSB7XG4gICAgICAgICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lciArIFwiW2RhdGEtaW5kZXg9J1wiICsgaW5pdF9pbmRleCArIFwiJ11cIikuYWRkQ2xhc3MoXCJhY3RpdmVcIilcbiAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJ2aWV3aW5nLXBhZ2UtXCIrIGluaXRfaW5kZXgpXG4gICAgICAgIGlmKHNldHRpbmdzLnBhZ2luYXRpb24gPT0gdHJ1ZSkgJChcIi5vbmVwYWdlLXBhZ2luYXRpb24gbGkgYVwiICsgXCJbZGF0YS1pbmRleD0nXCIgKyBpbml0X2luZGV4ICsgXCInXVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblxuICAgICAgICBuZXh0ID0gJChzZXR0aW5ncy5zZWN0aW9uQ29udGFpbmVyICsgXCJbZGF0YS1pbmRleD0nXCIgKyAoaW5pdF9pbmRleCkgKyBcIiddXCIpO1xuICAgICAgICBpZihuZXh0KSB7XG4gICAgICAgICAgbmV4dC5hZGRDbGFzcyhcImFjdGl2ZVwiKVxuICAgICAgICAgIGlmKHNldHRpbmdzLnBhZ2luYXRpb24gPT0gdHJ1ZSkgJChcIi5vbmVwYWdlLXBhZ2luYXRpb24gbGkgYVwiICsgXCJbZGF0YS1pbmRleD0nXCIgKyAoaW5pdF9pbmRleCkgKyBcIiddXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICQoXCJib2R5XCIpWzBdLmNsYXNzTmFtZSA9ICQoXCJib2R5XCIpWzBdLmNsYXNzTmFtZS5yZXBsYWNlKC9cXGJ2aWV3aW5nLXBhZ2UtXFxkLio/XFxiL2csICcnKTtcbiAgICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcInZpZXdpbmctcGFnZS1cIituZXh0LmRhdGEoXCJpbmRleFwiKSlcbiAgICAgICAgICBpZiAoaGlzdG9yeS5yZXBsYWNlU3RhdGUgJiYgc2V0dGluZ3MudXBkYXRlVVJMID09IHRydWUpIHtcbiAgICAgICAgICAgIHZhciBocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3Vic3RyKDAsd2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignIycpKSArIFwiI1wiICsgKGluaXRfaW5kZXgpO1xuICAgICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoIHt9LCBkb2N1bWVudC50aXRsZSwgaHJlZiApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwb3MgPSAoKGluaXRfaW5kZXggLSAxKSAqIDEwMCkgKiAtMTtcbiAgICAgICAgZWwudHJhbnNmb3JtUGFnZShzZXR0aW5ncywgcG9zLCBpbml0X2luZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lciArIFwiW2RhdGEtaW5kZXg9JzEnXVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKVxuICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcInZpZXdpbmctcGFnZS0xXCIpXG4gICAgICAgIGlmKHNldHRpbmdzLnBhZ2luYXRpb24gPT0gdHJ1ZSkgJChcIi5vbmVwYWdlLXBhZ2luYXRpb24gbGkgYVwiICsgXCJbZGF0YS1pbmRleD0nMSddXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgJChzZXR0aW5ncy5zZWN0aW9uQ29udGFpbmVyICsgXCJbZGF0YS1pbmRleD0nMSddXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpXG4gICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcInZpZXdpbmctcGFnZS0xXCIpXG4gICAgICBpZihzZXR0aW5ncy5wYWdpbmF0aW9uID09IHRydWUpICQoXCIub25lcGFnZS1wYWdpbmF0aW9uIGxpIGFcIiArIFwiW2RhdGEtaW5kZXg9JzEnXVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICB9XG5cbiAgICBpZihzZXR0aW5ncy5wYWdpbmF0aW9uID09IHRydWUpICB7XG4gICAgICAkKFwiLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhXCIpLmNsaWNrKGZ1bmN0aW9uICgpe1xuICAgICAgICB2YXIgcGFnZV9pbmRleCA9ICQodGhpcykuZGF0YShcImluZGV4XCIpO1xuICAgICAgICBlbC5tb3ZlVG8ocGFnZV9pbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG5cblxuICAgICQoZG9jdW1lbnQpLmJpbmQoJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwgTW96TW91c2VQaXhlbFNjcm9sbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAvLyBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIGRlbHRhID0gZXZlbnQub3JpZ2luYWxFdmVudC53aGVlbERlbHRhIHx8IC1ldmVudC5vcmlnaW5hbEV2ZW50LmRldGFpbDtcbiAgICAgIGlmKCEkKFwiYm9keVwiKS5oYXNDbGFzcyhcImRpc2FibGVkLW9uZXBhZ2Utc2Nyb2xsXCIpKSBpbml0X3Njcm9sbChldmVudCwgZGVsdGEpO1xuICAgIH0pO1xuXG5cbiAgICBpZihzZXR0aW5ncy5yZXNwb25zaXZlRmFsbGJhY2sgIT0gZmFsc2UpIHtcbiAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc3BvbnNpdmUoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXNwb25zaXZlKCk7XG4gICAgfVxuXG4gICAgaWYoc2V0dGluZ3Mua2V5Ym9hcmQgPT0gdHJ1ZSkge1xuICAgICAgJChkb2N1bWVudCkua2V5ZG93bihmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciB0YWcgPSBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKCEkKFwiYm9keVwiKS5oYXNDbGFzcyhcImRpc2FibGVkLW9uZXBhZ2Utc2Nyb2xsXCIpKSB7XG4gICAgICAgICAgc3dpdGNoKGUud2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgIGlmICh0YWcgIT0gJ2lucHV0JyAmJiB0YWcgIT0gJ3RleHRhcmVhJykgZWwubW92ZVVwKClcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgaWYgKHRhZyAhPSAnaW5wdXQnICYmIHRhZyAhPSAndGV4dGFyZWEnKSBlbC5tb3ZlRG93bigpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzI6IC8vc3BhY2ViYXJcbiAgICAgICAgICAgICAgaWYgKHRhZyAhPSAnaW5wdXQnICYmIHRhZyAhPSAndGV4dGFyZWEnKSBlbC5tb3ZlRG93bigpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzM6IC8vcGFnZWcgdXBcbiAgICAgICAgICAgICAgaWYgKHRhZyAhPSAnaW5wdXQnICYmIHRhZyAhPSAndGV4dGFyZWEnKSBlbC5tb3ZlVXAoKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM0OiAvL3BhZ2UgZHduXG4gICAgICAgICAgICAgIGlmICh0YWcgIT0gJ2lucHV0JyAmJiB0YWcgIT0gJ3RleHRhcmVhJykgZWwubW92ZURvd24oKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM2OiAvL2hvbWVcbiAgICAgICAgICAgICAgZWwubW92ZVRvKDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM1OiAvL2VuZFxuICAgICAgICAgICAgICBlbC5tb3ZlVG8odG90YWwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuXG59KHdpbmRvdy5qUXVlcnkpO1xuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgICAgICAkKFwiLm5hdlwiKS5vbihcImNsaWNrXCIsXCJhXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAvL9C+0YLQvNC10L3Rj9C10Lwg0YHRgtCw0L3QtNCw0YDRgtC90YPRjiDQvtCx0YDQsNCx0L7RgtC60YMg0L3QsNC20LDRgtC40Y8g0L/QviDRgdGB0YvQu9C60LVcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgLy/Qt9Cw0LHQuNGA0LDQtdC8INC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGAINCx0L7QutCwINGBINCw0YLRgNC40LHRg9GC0LAgaHJlZlxyXG4gICAgICAgICAgICB2YXIgaWQgID0gJCh0aGlzKS5hdHRyKCdocmVmJyksXHJcbiAgICAgICAgICAgIC8v0YPQt9C90LDQtdC8INCy0YvRgdC+0YLRgyDQvtGCINC90LDRh9Cw0LvQsCDRgdGC0YDQsNC90LjRhtGLINC00L4g0LHQu9C+0LrQsCDQvdCwINC60L7RgtC+0YDRi9C5INGB0YHRi9C70LDQtdGC0YHRjyDRj9C60L7RgNGMXHJcbiAgICAgICAgICAgICAgICB0b3AgPSAkKGlkKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgIC8v0LDQvdC40LzQuNGA0YPQtdC8INC/0LXRgNC10YXQvtC0INC90LAg0YDQsNGB0YHRgtC+0Y/QvdC40LUgLSB0b3Ag0LfQsCAxNTAwINC80YFcclxuICAgICAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0b3B9LCA1MDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgICAgICQoXCIuZGVzY1wiKS5vbihcImNsaWNrXCIsXCJhXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAvL9C+0YLQvNC10L3Rj9C10Lwg0YHRgtCw0L3QtNCw0YDRgtC90YPRjiDQvtCx0YDQsNCx0L7RgtC60YMg0L3QsNC20LDRgtC40Y8g0L/QviDRgdGB0YvQu9C60LVcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgLy/Qt9Cw0LHQuNGA0LDQtdC8INC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGAINCx0L7QutCwINGBINCw0YLRgNC40LHRg9GC0LAgaHJlZlxyXG4gICAgICAgICAgICB2YXIgaWQgID0gJCh0aGlzKS5hdHRyKCdocmVmJyksXHJcbiAgICAgICAgICAgIC8v0YPQt9C90LDQtdC8INCy0YvRgdC+0YLRgyDQvtGCINC90LDRh9Cw0LvQsCDRgdGC0YDQsNC90LjRhtGLINC00L4g0LHQu9C+0LrQsCDQvdCwINC60L7RgtC+0YDRi9C5INGB0YHRi9C70LDQtdGC0YHRjyDRj9C60L7RgNGMXHJcbiAgICAgICAgICAgICAgICB0b3AgPSAkKGlkKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgIC8v0LDQvdC40LzQuNGA0YPQtdC8INC/0LXRgNC10YXQvtC0INC90LAg0YDQsNGB0YHRgtC+0Y/QvdC40LUgLSB0b3Ag0LfQsCAxNTAwINC80YFcclxuICAgICAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0b3B9LCA1MDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7IiwidmFyIGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi0tY2xvc2UnKTtcclxudmFyIG92ZXJsYXlCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheS1ib3gnKTtcclxuXHJcblxyXG5cclxuYnRuQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldnQpe1xyXG4gICAgIGlmIChvdmVybGF5Qm94LnN0eWxlLmRpc3BsYXk9J2ZsZXgnKVxyXG4gICAgIG92ZXJsYXlCb3guc3R5bGUuZGlzcGxheT0nbm9uZSdcclxufSlcclxuIiwiLy8gMi4gVGhpcyBjb2RlIGxvYWRzIHRoZSBJRnJhbWUgUGxheWVyIEFQSSBjb2RlIGFzeW5jaHJvbm91c2x5LlxyXG52YXIgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcblxyXG50YWcuc3JjID0gXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpXCI7XHJcbnZhciBmaXJzdFNjcmlwdFRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcclxuZmlyc3RTY3JpcHRUYWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGFnLCBmaXJzdFNjcmlwdFRhZyk7XHJcblxyXG5sZXQgcGxheWVyO1xyXG5cclxuY29uc3QgZm9ybWF0VGltZSA9IHRpbWVTZWMgPT4ge1xyXG4gIGNvbnN0IHJvdW5kVGltZSA9IE1hdGgucm91bmQodGltZVNlYyk7XHJcblxyXG4gIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHJvdW5kVGltZSAvIDYwKTtcclxuICBjb25zdCBzZWNvbmRzID0gcm91bmRUaW1lIC0gbWludXRlcyAqIDYwO1xyXG5cclxuICBjb25zdCBmb3JtYXR0ZWRTZWNvbmRzID0gc2Vjb25kcyA8IDEwID8gYDAke3NlY29uZHN9YCA6IHNlY29uZHM7XHJcblxyXG4gIHJldHVybiBgJHttaW51dGVzfToke2Zvcm1hdHRlZFNlY29uZHN9YDtcclxufTtcclxuXHJcbmNvbnN0IG9uUGxheWVyUmVhZHkgPSAoKSA9PiB7XHJcbiAgbGV0IGludGVydmFsO1xyXG4gIGxldCBkdXJhdGlvblNlYyA9IHBsYXllci5nZXREdXJhdGlvbigpO1xyXG5cclxuICAkKFwiLnBsYXllcl9fZHVyYXRpb24tZXN0aW1hdGVcIikudGV4dChmb3JtYXRUaW1lKGR1cmF0aW9uU2VjKSk7XHJcblxyXG4gIGlmICh0eXBlb2YgaW50ZXJ2YWwgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICBjb25zdCBjb21wbGV0ZWRTZWMgPSBwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKTtcclxuICAgIGNvbnN0IGNvbXBsZXRlZFBlcmNlbnQgPSAoY29tcGxldGVkU2VjIC8gZHVyYXRpb25TZWMpICogMTAwO1xyXG5cclxuICAgICQoXCIucGxheWVyX19wbGF5YmFjay1idXR0b25cIikuY3NzKHtcclxuICAgICAgbGVmdDogYCR7Y29tcGxldGVkUGVyY2VudH0lYFxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5wbGF5ZXJfX2R1cmF0aW9uLWNvbXBsZXRlZFwiKS50ZXh0KGZvcm1hdFRpbWUoY29tcGxldGVkU2VjKSk7XHJcbiAgfSwgMTAwMCk7XHJcbn07XHJcblxyXG5jb25zdCBldmVudHNJbml0ID0gKCkgPT4ge1xyXG4gICQoXCIucGxheWVyX19zdGFydFwiKS5vbihcImNsaWNrXCIsIGUgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgYnRuID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgIGlmIChidG4uaGFzQ2xhc3MoXCJwYXVzZWRcIikpIHtcclxuICAgICAgcGxheWVyLnBhdXNlVmlkZW8oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBsYXllci5wbGF5VmlkZW8oKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgJChcIi5wbGF5ZXJfX3BsYXliYWNrXCIpLm9uKFwiY2xpY2tcIiwgZSA9PiB7XHJcbiAgICBjb25zdCBiYXIgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgICBjb25zdCBuZXdCdXR0b25Qb3NpdGlvbiA9IGUucGFnZVggLSBiYXIub2Zmc2V0KCkubGVmdDtcclxuICAgIGNvbnN0IGJ1dHRvblBvc1BlcmNlbnQgPSAobmV3QnV0dG9uUG9zaXRpb24gLyBiYXIud2lkdGgoKSkgKiAxMDA7XHJcbiAgICBjb25zdCBuZXdQbGF5ZXJUaW1lU2VjID0gKHBsYXllci5nZXREdXJhdGlvbigpIC8gMTAwKSAqIGJ1dHRvblBvc1BlcmNlbnQ7XHJcblxyXG4gICAgJChcIi5wbGF5ZXJfX3BsYXliYWNrLWJ1dHRvblwiKS5jc3Moe1xyXG4gICAgICBsZWZ0OiBgJHtidXR0b25Qb3NQZXJjZW50fSVgXHJcbiAgICB9KTtcclxuXHJcbiAgICBwbGF5ZXIuc2Vla1RvKG5ld1BsYXllclRpbWVTZWMpO1xyXG4gIH0pO1xyXG5cclxuICAkKFwiLnBsYXllcl9fc3BsYXNoXCIpLm9uKFwiY2xpY2tcIiwgZSA9PiB7XHJcbiAgICBwbGF5ZXIucGxheVZpZGVvKCk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBvblBsYXllclN0YXRlQ2hhbmdlID0gZXZlbnQgPT4ge1xyXG4gIGNvbnN0IHBsYXllckJ1dHRvbiA9ICQoXCIucGxheWVyX19zdGFydFwiKTtcclxuICAvKlxyXG4gIC0xICjQstC+0YHQv9GA0L7QuNC30LLQtdC00LXQvdC40LUg0LLQuNC00LXQviDQvdC1INC90LDRh9Cw0YLQvilcclxuICAwICjQstC+0YHQv9GA0L7QuNC30LLQtdC00LXQvdC40LUg0LLQuNC00LXQviDQt9Cw0LLQtdGA0YjQtdC90L4pXHJcbiAgMSAo0LLQvtGB0L/RgNC+0LjQt9Cy0LXQtNC10L3QuNC1KVxyXG4gIDIgKNC/0LDRg9C30LApXHJcbiAgMyAo0LHRg9GE0LXRgNC40LfQsNGG0LjRjylcclxuICA1ICjQstC40LTQtdC+INC/0L7QtNCw0Y7RgiDRgNC10L/Qu9C40LrQuCkuXHJcbiAgICovXHJcbiAgc3dpdGNoIChldmVudC5kYXRhKSB7XHJcbiAgICBjYXNlIDE6IFxyXG4gICAgICAkKCcucGxheWVyX193cmFwcGVyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICBwbGF5ZXJCdXR0b24uYWRkQ2xhc3MoXCJwYXVzZWRcIik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOiBcclxuICAgICAgcGxheWVyQnV0dG9uLnJlbW92ZUNsYXNzKFwicGF1c2VkXCIpO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBvbllvdVR1YmVJZnJhbWVBUElSZWFkeSgpIHtcclxuICBwbGF5ZXIgPSBuZXcgWVQuUGxheWVyKFwieXQtcGxheWVyXCIsIHtcclxuICAgIGhlaWdodDogXCI0MDVcIixcclxuICAgIHdpZHRoOiBcIjY2MFwiLFxyXG4gICAgdmlkZW9JZDogXCJCemRBNXJPZHdROFwiLFxyXG4gICAgZXZlbnRzOiB7XHJcbiAgICAgIG9uUmVhZHk6IG9uUGxheWVyUmVhZHksXHJcbiAgICAgIG9uU3RhdGVDaGFuZ2U6IG9uUGxheWVyU3RhdGVDaGFuZ2VcclxuICAgIH0sXHJcbiAgICBwbGF5ZXJWYXJzOiB7XHJcbiAgICAgIGNvbnRyb2xzOiAwLFxyXG4gICAgICBkaXNhYmxla2I6IDAsXHJcbiAgICAgIHNob3dpbmZvOiAwLFxyXG4gICAgICByZWw6IDAsXHJcbiAgICAgIGF1dG9wbGF5OiAwLFxyXG4gICAgICBtb2Rlc3RicmFuZGluZzogMFxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5ldmVudHNJbml0KCk7IiwiLyog0JjQvdC00LXQutGBINGB0LvQsNC50LTQsCDQv9C+INGD0LzQvtC70YfQsNC90LjRjiAqL1xyXG52YXIgc2xpZGVJbmRleCA9IDE7XHJcbnNob3dTbGlkZXMoc2xpZGVJbmRleCk7XHJcbi8qINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdGCINGC0LXQutGD0YnQuNC5INGB0LvQsNC50LQgKi9cclxuZnVuY3Rpb24gY3VycmVudFNsaWRlKG4pIHtcclxuICAgIHZhciBzbGlkZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicmV2aWV3X19pdGVtXCIpO1xyXG4gICAgc2hvd1NsaWRlcyhzbGlkZUluZGV4ID0gbik7ICAgIFxyXG59XHJcblxyXG4vKiDQntGB0L3QvtCy0L3QsNGPINGE0YPQvdC60YbQuNGPINGB0LvQsNC50LTQtdGA0LAgKi9cclxuZnVuY3Rpb24gc2hvd1NsaWRlcyhuKSB7XHJcbiAgICB2YXIgaTtcclxuICAgIHZhciBzbGlkZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicmV2aWV3X19pdGVtXCIpO1xyXG4gICAgdmFyIGRvdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicmV2aWV3X19jYXJyb3VzZWwtaXRlbVwiKTtcclxuXHJcbiAgICBpZiAobiA+IHNsaWRlcy5sZW5ndGgpIHtcclxuICAgICAgc2xpZGVJbmRleCA9IDFcclxuICAgIH1cclxuICAgIGlmIChuIDwgMSkge1xyXG4gICAgICAgIHNsaWRlSW5kZXggPSBzbGlkZXMubGVuZ3RoXHJcbiAgICB9XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc2xpZGVzW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH1cclxuICAgIGZvciAoaSA9IDA7IGkgPCBkb3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZG90c1tpXS5jbGFzc05hbWUgPSBkb3RzW2ldLmNsYXNzTmFtZS5yZXBsYWNlKFwicmV2aWV3X19jYXJyb3VzZWwtaXRlbS0tY3VycmVudFwiLCBcIlwiKTtcclxuICAgIH1cclxuICAgIHNsaWRlc1tzbGlkZUluZGV4IC0gMV0uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgZG90c1tzbGlkZUluZGV4IC0gMV0uY2xhc3NOYW1lICs9IFwiIHJldmlld19fY2Fycm91c2VsLWl0ZW0tLWN1cnJlbnRcIjtcclxufSIsImNvbnN0IGxlZnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxlZnRcIik7XHJcbmNvbnN0IHJpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyaWdodFwiKTtcclxuY29uc3QgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdFwiKTtcclxuY29uc3QgY29tcHV0ZWQgPSBnZXRDb21wdXRlZFN0eWxlKGxpc3QpO1xyXG5cclxuY29uc3QgbWluUmlnaHQgPSAwO1xyXG5jb25zdCBtYXhSaWdodCA9IGxpc3Qub2Zmc2V0V2lkdGg7XHJcbmNvbnN0IHN0ZXAgPSBsaXN0Lm9mZnNldFdpZHRoO1xyXG5sZXQgY3VycmVudFJpZ2h0ID0gMDtcclxuXHJcbmxpc3Quc3R5bGUucmlnaHQgPSBjdXJyZW50UmlnaHQgKyAncHgnO1xyXG5cclxucmlnaHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oZXZ0KSB7XHJcbiAgICBldnQucHJldmVudERlZmF1bHQoKTsgICAgXHJcbiAgICBpZiAoY3VycmVudFJpZ2h0IDwgbWF4UmlnaHQpIHtcclxuICAgICAgICBjdXJyZW50UmlnaHQgKz0gc3RlcDtcclxuICAgICAgICBsaXN0LnN0eWxlLnJpZ2h0ID0gY3VycmVudFJpZ2h0ICsgJ3B4JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY3VycmVudFJpZ2h0ID0gbWluUmlnaHQ7XHJcbiAgICAgICAgbGlzdC5zdHlsZS5yaWdodCA9IGN1cnJlbnRSaWdodCArICdweCc7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubGVmdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbihldnQpIHtcclxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGlmIChjdXJyZW50UmlnaHQ+bWluUmlnaHQpIHtcclxuICAgICAgICBjdXJyZW50UmlnaHQgLT0gc3RlcDtcclxuICAgICAgICBsaXN0LnN0eWxlLnJpZ2h0ID0gY3VycmVudFJpZ2h0ICsgJ3B4JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY3VycmVudFJpZ2h0ID0gbWF4UmlnaHQ7XHJcbiAgICAgICAgbGlzdC5zdHlsZS5yaWdodCA9IGN1cnJlbnRSaWdodCArICdweCc7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuIl19
