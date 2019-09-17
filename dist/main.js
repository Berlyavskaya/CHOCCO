;!function($){

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
;;const elem2 = document.querySelector(".vertical-accord__list");
// const trigger = document.querySelector(".vertical-accord__trigger");
let lastActive2; 
const item2 = document.querySelector ('.vertical-accord__item');

elem2.addEventListener ('click', function(evt) {
    evt.preventDefault();
    
    if (evt.target.classList.contains("vertical-accord__trigger")) {
        if (lastActive2) {
            lastActive2.classList.remove("vertical-accord__item--active");
        }
        lastActive2 = evt.target.parentNode;
        lastActive2.classList.add("vertical-accord__item--active");
    }
    if (evt.target.classList.contains("close")) {
        lastActive2.classList.remove("vertical-accord__item--active");
    }
})
;;const formOrder2 = document.querySelector ('#form-order');
const sendBtn2 = document.querySelector ('#send-btn');
var overlayBox = document.querySelector('.overlay-box');
var overlayTextTrue = document.querySelector('.overlay__text--true');
var overlayTextFalse = document.querySelector('.overlay__text--false');


sendBtn2.addEventListener ('click', function(evt){
    evt.preventDefault();

    sendBtn2.addEventListener('click', evt => {
        evt.preventDefault();
        
        // if (validateForm(formOrder)) {
        //     console.log ('все ок');
        // }

        
        
        var formdata = new FormData(formOrder);
        formdata.append('to', 'mail@mail.ru');

        var data = {
            name: formOrder2.elements.name.value,
            phone: formOrder2.elements.phone.value,
            comment: formOrder2.elements.comment.value,
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

});;var fsMenu = document.querySelector('.fs-menu');
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
});;ymaps.ready(function () {
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
});;;$(document).ready(function(){
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
    });;;var btnClose = document.querySelector('.btn--close');
var overlayBox = document.querySelector('.overlay-box');



btnClose.addEventListener('click', function(evt){
     if (overlayBox.style.display='flex')
     overlayBox.style.display='none'
})
;// 2. This code loads the IFrame Player API code asynchronously.
;var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player2;

const formatTime2 = timeSec => {
  const roundTime = Math.round(timeSec);

  const minutes = Math.floor(roundTime / 60);
  const seconds = roundTime - minutes * 60;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${formattedSeconds}`;
};

const onPlayerReady2 = () => {
  let interval;
  let durationSec = player2.getDuration();

  $(".player__duration-estimate").text(formatTime2(durationSec));

  if (typeof interval !== "undefined") {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player2.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
      left: `${completedPercent}%`
    });

    $(".player__duration-completed").text(formatTime2(completedSec));
  }, 1000);
};

const eventsInit2 = () => {
  $(".player__start").on("click", e => {
    e.preventDefault();
    const btn = $(e.currentTarget);

    if (btn.hasClass("paused")) {
      player2.pauseVideo();
    } else {
      player2.playVideo();
    }
  });

  $(".player__playback").on("click", e => {
    const bar = $(e.currentTarget);
    const newButtonPosition = e.pageX - bar.offset().left;
    const buttonPosPercent = (newButtonPosition / bar.width()) * 100;
    const newPlayerTimeSec = (player2.getDuration() / 100) * buttonPosPercent;

    $(".player__playback-button").css({
      left: `${buttonPosPercent}%`
    });

    player2.seekTo(newPlayerTimeSec);
  });

  $(".player__splash").on("click", e => {
    player2.playVideo();
  });
};

const onPlayerStateChange2 = event => {
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
  player2 = new YT.Player("yt-player", {
    height: "405",
    width: "660",
    videoId: "BzdA5rOdwQ8",
    events: {
      onReady: onPlayerReady2,
      onStateChange: onPlayerStateChange2
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

eventsInit2();;;/* Индекс слайда по умолчанию */
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
};;const left2 = document.getElementById("left");
const right2 = document.getElementById("right");
const list2 = document.getElementById("list");
const computed2 = getComputedStyle(list2);

const minRight2 = 0;
const maxRight2 = list.offsetWidth;
const step2 = list.offsetWidth;
let currentRight2 = 0;

list2.style.right = currentRight2 + 'px';

right2.addEventListener("click",function(evt) {
    evt.preventDefault();    
    if (currentRight2 < maxRight2) {
        currentRight2 += step2;
        list2.style.right = currentRight2 + 'px';
    } else {
        currentRight2 = minRight2;
        list2.style.right = currentRight2 + 'px';
    }
});

left2.addEventListener("click",function(evt) {
    evt.preventDefault();

    if (currentRight2>minRight2) {
        currentRight2 -= step2;
        list2.style.right = currentRight2 + 'px';
    } else {
        currentRight2 = maxRight2;
        list2.style.right = currentRight2 + 'px';
    }
});

