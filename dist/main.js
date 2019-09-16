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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjFfanF1ZXJ5Lm9uZXBhZ2Utc2Nyb2xsLmpzIiwiYWNjb3JkLmpzIiwiZm9ybS5qcyIsImZzLW1lbnUuanMiLCJpY29uX2N1c3RvbUltYWdlLmpzIiwibWFpbi1tZW51LmpzIiwib3ZlcmxheS5qcyIsInBsYXllci5qcyIsInNsaWRlci1yZXZpZXdzLmpzIiwic2xpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0N6WkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIjshZnVuY3Rpb24oJCl7XG5cbiAgdmFyIGRlZmF1bHRzID0ge1xuICAgIHNlY3Rpb25Db250YWluZXI6IFwic2VjdGlvblwiLFxuICAgIGVhc2luZzogXCJlYXNlXCIsXG4gICAgYW5pbWF0aW9uVGltZTogMTAwMCxcbiAgICBwYWdpbmF0aW9uOiB0cnVlLFxuICAgIHVwZGF0ZVVSTDogZmFsc2UsXG4gICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgYmVmb3JlTW92ZTogbnVsbCxcbiAgICBhZnRlck1vdmU6IG51bGwsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICByZXNwb25zaXZlRmFsbGJhY2s6IGZhbHNlLFxuICAgIGRpcmVjdGlvbiA6ICd2ZXJ0aWNhbCdcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qICBDcmVkaXQ6IEVpa2UgU2VuZCBmb3IgdGhlIGF3ZXNvbWUgc3dpcGUgZXZlbnQgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCQuZm4uc3dpcGVFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIHN0YXJ0WCxcbiAgICAgICAgICAgIHN0YXJ0WSxcbiAgICAgICAgICAgICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICAkdGhpcy5iaW5kKCd0b3VjaHN0YXJ0JywgdG91Y2hzdGFydCk7XG5cbiAgICAgICAgZnVuY3Rpb24gdG91Y2hzdGFydChldmVudCkge1xuICAgICAgICAgIHZhciB0b3VjaGVzID0gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzO1xuICAgICAgICAgIGlmICh0b3VjaGVzICYmIHRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzdGFydFggPSB0b3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgICAgICAgc3RhcnRZID0gdG91Y2hlc1swXS5wYWdlWTtcbiAgICAgICAgICAgICR0aGlzLmJpbmQoJ3RvdWNobW92ZScsIHRvdWNobW92ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdG91Y2htb3ZlKGV2ZW50KSB7XG4gICAgICAgICAgdmFyIHRvdWNoZXMgPSBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXM7XG4gICAgICAgICAgaWYgKHRvdWNoZXMgJiYgdG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBkZWx0YVggPSBzdGFydFggLSB0b3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgICAgICAgdmFyIGRlbHRhWSA9IHN0YXJ0WSAtIHRvdWNoZXNbMF0ucGFnZVk7XG5cbiAgICAgICAgICAgIGlmIChkZWx0YVggPj0gNTApIHtcbiAgICAgICAgICAgICAgJHRoaXMudHJpZ2dlcihcInN3aXBlTGVmdFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZWx0YVggPD0gLTUwKSB7XG4gICAgICAgICAgICAgICR0aGlzLnRyaWdnZXIoXCJzd2lwZVJpZ2h0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlbHRhWSA+PSA1MCkge1xuICAgICAgICAgICAgICAkdGhpcy50cmlnZ2VyKFwic3dpcGVVcFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZWx0YVkgPD0gLTUwKSB7XG4gICAgICAgICAgICAgICR0aGlzLnRyaWdnZXIoXCJzd2lwZURvd25cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGFYKSA+PSA1MCB8fCBNYXRoLmFicyhkZWx0YVkpID49IDUwKSB7XG4gICAgICAgICAgICAgICR0aGlzLnVuYmluZCgndG91Y2htb3ZlJywgdG91Y2htb3ZlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfTtcblxuICAkLmZuLm9uZXBhZ2Vfc2Nyb2xsID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgdmFyIHNldHRpbmdzID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zKSxcbiAgICAgICAgZWwgPSAkKHRoaXMpLFxuICAgICAgICBzZWN0aW9ucyA9ICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lcilcbiAgICAgICAgdG90YWwgPSBzZWN0aW9ucy5sZW5ndGgsXG4gICAgICAgIHN0YXR1cyA9IFwib2ZmXCIsXG4gICAgICAgIHRvcFBvcyA9IDAsXG4gICAgICAgIGxlZnRQb3MgPSAwLFxuICAgICAgICBsYXN0QW5pbWF0aW9uID0gMCxcbiAgICAgICAgcXVpZXRQZXJpb2QgPSA1MDAsXG4gICAgICAgIHBhZ2luYXRpb25MaXN0ID0gXCJcIjtcblxuICAgICQuZm4udHJhbnNmb3JtUGFnZSA9IGZ1bmN0aW9uKHNldHRpbmdzLCBwb3MsIGluZGV4KSB7XG4gICAgICBpZiAodHlwZW9mIHNldHRpbmdzLmJlZm9yZU1vdmUgPT0gJ2Z1bmN0aW9uJykgc2V0dGluZ3MuYmVmb3JlTW92ZShpbmRleCk7XG5cbiAgICAgIC8vIEp1c3QgYSBzaW1wbGUgZWRpdCB0aGF0IG1ha2VzIHVzZSBvZiBtb2Rlcm5penIgdG8gZGV0ZWN0IGFuIElFOCBicm93c2VyIGFuZCBjaGFuZ2VzIHRoZSB0cmFuc2Zvcm0gbWV0aG9kIGludG9cbiAgICBcdC8vIGFuIHRvcCBhbmltYXRlIHNvIElFOCB1c2VycyBjYW4gYWxzbyB1c2UgdGhpcyBzY3JpcHQuXG4gICAgXHRpZigkKCdodG1sJykuaGFzQ2xhc3MoJ2llOCcpKXtcbiAgICAgICAgaWYgKHNldHRpbmdzLmRpcmVjdGlvbiA9PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICB2YXIgdG9wcG9zID0gKGVsLndpZHRoKCkvMTAwKSpwb3M7XG4gICAgICAgICAgJCh0aGlzKS5hbmltYXRlKHtsZWZ0OiB0b3Bwb3MrJ3B4J30sc2V0dGluZ3MuYW5pbWF0aW9uVGltZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHRvcHBvcyA9IChlbC5oZWlnaHQoKS8xMDApKnBvcztcbiAgICAgICAgICAkKHRoaXMpLmFuaW1hdGUoe3RvcDogdG9wcG9zKydweCd9LHNldHRpbmdzLmFuaW1hdGlvblRpbWUpO1xuICAgICAgICB9XG4gICAgXHR9IGVsc2V7XG4gICAgXHQgICQodGhpcykuY3NzKHtcbiAgICBcdCAgICBcIi13ZWJraXQtdHJhbnNmb3JtXCI6ICggc2V0dGluZ3MuZGlyZWN0aW9uID09ICdob3Jpem9udGFsJyApID8gXCJ0cmFuc2xhdGUzZChcIiArIHBvcyArIFwiJSwgMCwgMClcIiA6IFwidHJhbnNsYXRlM2QoMCwgXCIgKyBwb3MgKyBcIiUsIDApXCIsXG4gICAgICAgICBcIi13ZWJraXQtdHJhbnNpdGlvblwiOiBcImFsbCBcIiArIHNldHRpbmdzLmFuaW1hdGlvblRpbWUgKyBcIm1zIFwiICsgc2V0dGluZ3MuZWFzaW5nLFxuICAgICAgICAgXCItbW96LXRyYW5zZm9ybVwiOiAoIHNldHRpbmdzLmRpcmVjdGlvbiA9PSAnaG9yaXpvbnRhbCcgKSA/IFwidHJhbnNsYXRlM2QoXCIgKyBwb3MgKyBcIiUsIDAsIDApXCIgOiBcInRyYW5zbGF0ZTNkKDAsIFwiICsgcG9zICsgXCIlLCAwKVwiLFxuICAgICAgICAgXCItbW96LXRyYW5zaXRpb25cIjogXCJhbGwgXCIgKyBzZXR0aW5ncy5hbmltYXRpb25UaW1lICsgXCJtcyBcIiArIHNldHRpbmdzLmVhc2luZyxcbiAgICAgICAgIFwiLW1zLXRyYW5zZm9ybVwiOiAoIHNldHRpbmdzLmRpcmVjdGlvbiA9PSAnaG9yaXpvbnRhbCcgKSA/IFwidHJhbnNsYXRlM2QoXCIgKyBwb3MgKyBcIiUsIDAsIDApXCIgOiBcInRyYW5zbGF0ZTNkKDAsIFwiICsgcG9zICsgXCIlLCAwKVwiLFxuICAgICAgICAgXCItbXMtdHJhbnNpdGlvblwiOiBcImFsbCBcIiArIHNldHRpbmdzLmFuaW1hdGlvblRpbWUgKyBcIm1zIFwiICsgc2V0dGluZ3MuZWFzaW5nLFxuICAgICAgICAgXCJ0cmFuc2Zvcm1cIjogKCBzZXR0aW5ncy5kaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnICkgPyBcInRyYW5zbGF0ZTNkKFwiICsgcG9zICsgXCIlLCAwLCAwKVwiIDogXCJ0cmFuc2xhdGUzZCgwLCBcIiArIHBvcyArIFwiJSwgMClcIixcbiAgICAgICAgIFwidHJhbnNpdGlvblwiOiBcImFsbCBcIiArIHNldHRpbmdzLmFuaW1hdGlvblRpbWUgKyBcIm1zIFwiICsgc2V0dGluZ3MuZWFzaW5nXG4gICAgXHQgIH0pO1xuICAgIFx0fVxuICAgICAgJCh0aGlzKS5vbmUoJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3MuYWZ0ZXJNb3ZlID09ICdmdW5jdGlvbicpIHNldHRpbmdzLmFmdGVyTW92ZShpbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkLmZuLm1vdmVEb3duID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZWwgPSAkKHRoaXMpXG4gICAgICBpbmRleCA9ICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lciArXCIuYWN0aXZlXCIpLmRhdGEoXCJpbmRleFwiKTtcbiAgICAgIGN1cnJlbnQgPSAkKHNldHRpbmdzLnNlY3Rpb25Db250YWluZXIgKyBcIltkYXRhLWluZGV4PSdcIiArIGluZGV4ICsgXCInXVwiKTtcbiAgICAgIG5leHQgPSAkKHNldHRpbmdzLnNlY3Rpb25Db250YWluZXIgKyBcIltkYXRhLWluZGV4PSdcIiArIChpbmRleCArIDEpICsgXCInXVwiKTtcbiAgICAgIGlmKG5leHQubGVuZ3RoIDwgMSkge1xuICAgICAgICBpZiAoc2V0dGluZ3MubG9vcCA9PSB0cnVlKSB7XG4gICAgICAgICAgcG9zID0gMDtcbiAgICAgICAgICBuZXh0ID0gJChzZXR0aW5ncy5zZWN0aW9uQ29udGFpbmVyICsgXCJbZGF0YS1pbmRleD0nMSddXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgIH1lbHNlIHtcbiAgICAgICAgcG9zID0gKGluZGV4ICogMTAwKSAqIC0xO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBzZXR0aW5ncy5iZWZvcmVNb3ZlID09ICdmdW5jdGlvbicpIHNldHRpbmdzLmJlZm9yZU1vdmUoIG5leHQuZGF0YShcImluZGV4XCIpKTtcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIilcbiAgICAgIG5leHQuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICBpZihzZXR0aW5ncy5wYWdpbmF0aW9uID09IHRydWUpIHtcbiAgICAgICAgJChcIi5vbmVwYWdlLXBhZ2luYXRpb24gbGkgYVwiICsgXCJbZGF0YS1pbmRleD0nXCIgKyBpbmRleCArIFwiJ11cIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICQoXCIub25lcGFnZS1wYWdpbmF0aW9uIGxpIGFcIiArIFwiW2RhdGEtaW5kZXg9J1wiICsgbmV4dC5kYXRhKFwiaW5kZXhcIikgKyBcIiddXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgfVxuXG4gICAgICAkKFwiYm9keVwiKVswXS5jbGFzc05hbWUgPSAkKFwiYm9keVwiKVswXS5jbGFzc05hbWUucmVwbGFjZSgvXFxidmlld2luZy1wYWdlLVxcZC4qP1xcYi9nLCAnJyk7XG4gICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcInZpZXdpbmctcGFnZS1cIituZXh0LmRhdGEoXCJpbmRleFwiKSlcblxuICAgICAgaWYgKGhpc3RvcnkucmVwbGFjZVN0YXRlICYmIHNldHRpbmdzLnVwZGF0ZVVSTCA9PSB0cnVlKSB7XG4gICAgICAgIHZhciBocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3Vic3RyKDAsd2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignIycpKSArIFwiI1wiICsgKGluZGV4ICsgMSk7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKCB7fSwgZG9jdW1lbnQudGl0bGUsIGhyZWYgKTtcbiAgICAgIH1cbiAgICAgIGVsLnRyYW5zZm9ybVBhZ2Uoc2V0dGluZ3MsIHBvcywgbmV4dC5kYXRhKFwiaW5kZXhcIikpO1xuICAgIH1cblxuICAgICQuZm4ubW92ZVVwID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZWwgPSAkKHRoaXMpXG4gICAgICBpbmRleCA9ICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lciArXCIuYWN0aXZlXCIpLmRhdGEoXCJpbmRleFwiKTtcbiAgICAgIGN1cnJlbnQgPSAkKHNldHRpbmdzLnNlY3Rpb25Db250YWluZXIgKyBcIltkYXRhLWluZGV4PSdcIiArIGluZGV4ICsgXCInXVwiKTtcbiAgICAgIG5leHQgPSAkKHNldHRpbmdzLnNlY3Rpb25Db250YWluZXIgKyBcIltkYXRhLWluZGV4PSdcIiArIChpbmRleCAtIDEpICsgXCInXVwiKTtcblxuICAgICAgaWYobmV4dC5sZW5ndGggPCAxKSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5sb29wID09IHRydWUpIHtcbiAgICAgICAgICBwb3MgPSAoKHRvdGFsIC0gMSkgKiAxMDApICogLTE7XG4gICAgICAgICAgbmV4dCA9ICQoc2V0dGluZ3Muc2VjdGlvbkNvbnRhaW5lciArIFwiW2RhdGEtaW5kZXg9J1wiK3RvdGFsK1wiJ11cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1lbHNlIHtcbiAgICAgICAgcG9zID0gKChuZXh0LmRhdGEoXCJpbmRleFwiKSAtIDEpICogMTAwKSAqIC0xO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBzZXR0aW5ncy5iZWZvcmVNb3ZlID09ICdmdW5jdGlvbicpIHNldHRpbmdzLmJlZm9yZU1vdmUobmV4dC5kYXRhKFwiaW5kZXhcIikpO1xuICAgICAgY3VycmVudC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKVxuICAgICAgbmV4dC5hZGRDbGFzcyhcImFjdGl2ZVwiKVxuICAgICAgaWYoc2V0dGluZ3MucGFnaW5hdGlvbiA9PSB0cnVlKSB7XG4gICAgICAgICQoXCIub25lcGFnZS1wYWdpbmF0aW9uIGxpIGFcIiArIFwiW2RhdGEtaW5kZXg9J1wiICsgaW5kZXggKyBcIiddXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAkKFwiLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhXCIgKyBcIltkYXRhLWluZGV4PSdcIiArIG5leHQuZGF0YShcImluZGV4XCIpICsgXCInXVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgIH1cbiAgICAgICQoXCJib2R5XCIpWzBdLmNsYXNzTmFtZSA9ICQoXCJib2R5XCIpWzBdLmNsYXNzTmFtZS5yZXBsYWNlKC9cXGJ2aWV3aW5nLXBhZ2UtXFxkLio/XFxiL2csICcnKTtcbiAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwidmlld2luZy1wYWdlLVwiK25leHQuZGF0YShcImluZGV4XCIpKVxuXG4gICAgICBpZiAoaGlzdG9yeS5yZXBsYWNlU3RhdGUgJiYgc2V0dGluZ3MudXBkYXRlVVJMID09IHRydWUpIHtcbiAgICAgICAgdmFyIGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zdWJzdHIoMCx3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjJykpICsgXCIjXCIgKyAoaW5kZXggLSAxKTtcbiAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoIHt9LCBkb2N1bWVudC50aXRsZSwgaHJlZiApO1xuICAgICAgfVxuICAgICAgZWwudHJhbnNmb3JtUGFnZShzZXR0aW5ncywgcG9zLCBuZXh0LmRhdGEoXCJpbmRleFwiKSk7XG4gICAgfVxuXG4gICAgJC5mbi5tb3ZlVG8gPSBmdW5jdGlvbihwYWdlX2luZGV4KSB7XG4gICAgICBjdXJyZW50ID0gJChzZXR0aW5ncy5zZWN0aW9uQ29udGFpbmVyICsgXCIuYWN0aXZlXCIpXG4gICAgICBuZXh0ID0gJChzZXR0aW5ncy5zZWN0aW9uQ29udGFpbmVyICsgXCJbZGF0YS1pbmRleD0nXCIgKyAocGFnZV9pbmRleCkgKyBcIiddXCIpO1xuICAgICAgaWYobmV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3MuYmVmb3JlTW92ZSA9PSAnZnVuY3Rpb24nKSBzZXR0aW5ncy5iZWZvcmVNb3ZlKG5leHQuZGF0YShcImluZGV4XCIpKTtcbiAgICAgICAgY3VycmVudC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKVxuICAgICAgICBuZXh0LmFkZENsYXNzKFwiYWN0aXZlXCIpXG4gICAgICAgICQoXCIub25lcGFnZS1wYWdpbmF0aW9uIGxpIGFcIiArIFwiLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgJChcIi5vbmVwYWdlLXBhZ2luYXRpb24gbGkgYVwiICsgXCJbZGF0YS1pbmRleD0nXCIgKyAocGFnZV9pbmRleCkgKyBcIiddXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAkKFwiYm9keVwiKVswXS5jbGFzc05hbWUgPSAkKFwiYm9keVwiKVswXS5jbGFzc05hbWUucmVwbGFjZSgvXFxidmlld2luZy1wYWdlLVxcZC4qP1xcYi9nLCAnJyk7XG4gICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwidmlld2luZy1wYWdlLVwiK25leHQuZGF0YShcImluZGV4XCIpKVxuXG4gICAgICAgIHBvcyA9ICgocGFnZV9pbmRleCAtIDEpICogMTAwKSAqIC0xO1xuXG4gICAgICAgIGlmIChoaXN0b3J5LnJlcGxhY2VTdGF0ZSAmJiBzZXR0aW5ncy51cGRhdGVVUkwgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zdWJzdHIoMCx3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjJykpICsgXCIjXCIgKyAocGFnZV9pbmRleCAtIDEpO1xuICAgICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoIHt9LCBkb2N1bWVudC50aXRsZSwgaHJlZiApO1xuICAgICAgICB9XG4gICAgICAgIGVsLnRyYW5zZm9ybVBhZ2Uoc2V0dGluZ3MsIHBvcywgcGFnZV9pbmRleCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzcG9uc2l2ZSgpIHtcbiAgICAgIC8vc3RhcnQgbW9kaWZpY2F0aW9uXG4gICAgICB2YXIgdmFsRm9yVGVzdCA9IGZhbHNlO1xuICAgICAgdmFyIHR5cGVPZlJGID0gdHlwZW9mIHNldHRpbmdzLnJlc3BvbnNpdmVGYWxsYmFja1xuXG4gICAgICBpZih0eXBlT2ZSRiA9PSBcIm51bWJlclwiKXtcbiAgICAgIFx0dmFsRm9yVGVzdCA9ICQod2luZG93KS53aWR0aCgpIDwgc2V0dGluZ3MucmVzcG9uc2l2ZUZhbGxiYWNrO1xuICAgICAgfVxuICAgICAgaWYodHlwZU9mUkYgPT0gXCJib29sZWFuXCIpe1xuICAgICAgXHR2YWxGb3JUZXN0ID0gc2V0dGluZ3MucmVzcG9uc2l2ZUZhbGxiYWNrO1xuICAgICAgfVxuICAgICAgaWYodHlwZU9mUkYgPT0gXCJmdW5jdGlvblwiKXtcbiAgICAgIFx0dmFsRnVuY3Rpb24gPSBzZXR0aW5ncy5yZXNwb25zaXZlRmFsbGJhY2soKTtcbiAgICAgIFx0dmFsRm9yVGVzdCA9IHZhbEZ1bmN0aW9uO1xuICAgICAgXHR0eXBlT0Z2ID0gdHlwZW9mIHZhbEZvclRlc3Q7XG4gICAgICBcdGlmKHR5cGVPRnYgPT0gXCJudW1iZXJcIil7XG4gICAgICBcdFx0dmFsRm9yVGVzdCA9ICQod2luZG93KS53aWR0aCgpIDwgdmFsRnVuY3Rpb247XG4gICAgICBcdH1cbiAgICAgIH1cblxuICAgICAgLy9lbmQgbW9kaWZpY2F0aW9uXG4gICAgICBpZiAodmFsRm9yVGVzdCkge1xuICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcImRpc2FibGVkLW9uZXBhZ2Utc2Nyb2xsXCIpO1xuICAgICAgICAkKGRvY3VtZW50KS51bmJpbmQoJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwgTW96TW91c2VQaXhlbFNjcm9sbCcpO1xuICAgICAgICBlbC5zd2lwZUV2ZW50cygpLnVuYmluZChcInN3aXBlRG93biBzd2lwZVVwXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYoJChcImJvZHlcIikuaGFzQ2xhc3MoXCJkaXNhYmxlZC1vbmVwYWdlLXNjcm9sbFwiKSkge1xuICAgICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWQtb25lcGFnZS1zY3JvbGxcIik7XG4gICAgICAgICAgJChcImh0bWwsIGJvZHksIC53cmFwcGVyXCIpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgXCJmYXN0XCIpO1xuICAgICAgICB9XG5cblxuICAgICAgICBlbC5zd2lwZUV2ZW50cygpLmJpbmQoXCJzd2lwZURvd25cIiwgIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICBpZiAoISQoXCJib2R5XCIpLmhhc0NsYXNzKFwiZGlzYWJsZWQtb25lcGFnZS1zY3JvbGxcIikpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZWwubW92ZVVwKCk7XG4gICAgICAgIH0pLmJpbmQoXCJzd2lwZVVwXCIsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICBpZiAoISQoXCJib2R5XCIpLmhhc0NsYXNzKFwiZGlzYWJsZWQtb25lcGFnZS1zY3JvbGxcIikpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZWwubW92ZURvd24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuYmluZCgnbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCBNb3pNb3VzZVBpeGVsU2Nyb2xsJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHZhciBkZWx0YSA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQud2hlZWxEZWx0YSB8fCAtZXZlbnQub3JpZ2luYWxFdmVudC5kZXRhaWw7XG4gICAgICAgICAgaW5pdF9zY3JvbGwoZXZlbnQsIGRlbHRhKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBpbml0X3Njcm9sbChldmVudCwgZGVsdGEpIHtcbiAgICAgICAgZGVsdGFPZkludGVyZXN0ID0gZGVsdGE7XG4gICAgICAgIHZhciB0aW1lTm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIC8vIENhbmNlbCBzY3JvbGwgaWYgY3VycmVudGx5IGFuaW1hdGluZyBvciB3aXRoaW4gcXVpZXQgcGVyaW9kXG4gICAgICAgIGlmKHRpbWVOb3cgLSBsYXN0QW5pbWF0aW9uIDwgcXVpZXRQZXJpb2QgKyBzZXR0aW5ncy5hbmltYXRpb25UaW1lKSB7XG4gICAgICAgICAgICAvLyBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlbHRhT2ZJbnRlcmVzdCA8IDApIHtcbiAgICAgICAgICBlbC5tb3ZlRG93bigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwubW92ZVVwKClcbiAgICAgICAgfVxuICAgICAgICBsYXN0QW5pbWF0aW9uID0gdGltZU5vdztcbiAgICB9XG5cbiAgICAvLyBQcmVwYXJlIGV2ZXJ5dGhpbmcgYmVmb3JlIGJpbmRpbmcgd2hlZWwgc2Nyb2xsXG5cbiAgICBlbC5hZGRDbGFzcyhcIm9uZXBhZ2Utd3JhcHBlclwiKS5jc3MoXCJwb3NpdGlvblwiLFwicmVsYXRpdmVcIik7XG4gICAgJC5lYWNoKCBzZWN0aW9ucywgZnVuY3Rpb24oaSkge1xuICAgICAgJCh0aGlzKS5jc3Moe1xuICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICB0b3A6IHRvcFBvcyArIFwiJVwiXG4gICAgICB9KS5hZGRDbGFzcyhcInNlY3Rpb25cIikuYXR0cihcImRhdGEtaW5kZXhcIiwgaSsxKTtcblxuXG4gICAgICAkKHRoaXMpLmNzcyh7XG4gICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgIGxlZnQ6ICggc2V0dGluZ3MuZGlyZWN0aW9uID09ICdob3Jpem9udGFsJyApXG4gICAgICAgICAgPyBsZWZ0UG9zICsgXCIlXCJcbiAgICAgICAgICA6IDAsXG4gICAgICAgIHRvcDogKCBzZXR0aW5ncy5kaXJlY3Rpb24gPT0gJ3ZlcnRpY2FsJyB8fCBzZXR0aW5ncy5kaXJlY3Rpb24gIT0gJ2hvcml6b250YWwnIClcbiAgICAgICAgICA/IHRvcFBvcyArIFwiJVwiXG4gICAgICAgICAgOiAwXG4gICAgICB9KTtcblxuICAgICAgaWYgKHNldHRpbmdzLmRpcmVjdGlvbiA9PSAnaG9yaXpvbnRhbCcpXG4gICAgICAgIGxlZnRQb3MgPSBsZWZ0UG9zICsgMTAwO1xuICAgICAgZWxzZVxuICAgICAgICB0b3BQb3MgPSB0b3BQb3MgKyAxMDA7XG5cblxuICAgICAgaWYoc2V0dGluZ3MucGFnaW5hdGlvbiA9PSB0cnVlKSB7XG4gICAgICAgIHBhZ2luYXRpb25MaXN0ICs9IFwiPGxpPjxhIGRhdGEtaW5kZXg9J1wiKyhpKzEpK1wiJyBocmVmPScjXCIgKyAoaSsxKSArIFwiJz48L2E+PC9saT5cIlxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZWwuc3dpcGVFdmVudHMoKS5iaW5kKFwic3dpcGVEb3duXCIsICBmdW5jdGlvbihldmVudCl7XG4gICAgICBpZiAoISQoXCJib2R5XCIpLmhhc0NsYXNzKFwiZGlzYWJsZWQtb25lcGFnZS1zY3JvbGxcIikpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlbC5tb3ZlVXAoKTtcbiAgICB9KS5iaW5kKFwic3dpcGVVcFwiLCBmdW5jdGlvbihldmVudCl7XG4gICAgICBpZiAoISQoXCJib2R5XCIpLmhhc0NsYXNzKFwiZGlzYWJsZWQtb25lcGFnZS1zY3JvbGxcIikpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlbC5tb3ZlRG93bigpO1xuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIFBhZ2luYXRpb24gYW5kIERpc3BsYXkgVGhlbVxuICAgIGlmIChzZXR0aW5ncy5wYWdpbmF0aW9uID09IHRydWUpIHtcbiAgICAgIGlmICgkKCd1bC5vbmVwYWdlLXBhZ2luYXRpb24nKS5sZW5ndGggPCAxKSAkKFwiPHVsIGNsYXNzPSdvbmVwYWdlLXBhZ2luYXRpb24nPjwvdWw+XCIpLnByZXBlbmRUbyhcImJvZHlcIik7XG5cbiAgICAgIGlmKCBzZXR0aW5ncy5kaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnICkge1xuICAgICAgICBwb3NMZWZ0ID0gKGVsLmZpbmQoXCIub25lcGFnZS1wYWdpbmF0aW9uXCIpLndpZHRoKCkgLyAyKSAqIC0xO1xuICAgICAgICBlbC5maW5kKFwiLm9uZXBhZ2UtcGFnaW5hdGlvblwiKS5jc3MoXCJtYXJnaW4tbGVmdFwiLCBwb3NMZWZ0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvc1RvcCA9IChlbC5maW5kKFwiLm9uZXBhZ2UtcGFnaW5hdGlvblwiKS5oZWlnaHQoKSAvIDIpICogLTE7XG4gICAgICAgIGVsLmZpbmQoXCIub25lcGFnZS1wYWdpbmF0aW9uXCIpLmNzcyhcIm1hcmdpbi10b3BcIiwgcG9zVG9wKTtcbiAgICAgIH1cbiAgICAgICQoJ3VsLm9uZXBhZ2UtcGFnaW5hdGlvbicpLmh0bWwocGFnaW5hdGlvbkxpc3QpO1xuICAgIH1cblxuICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5oYXNoICE9IFwiXCIgJiYgd2luZG93LmxvY2F0aW9uLmhhc2ggIT0gXCIjMVwiKSB7XG4gICAgICBpbml0X2luZGV4ID0gIHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoXCIjXCIsIFwiXCIpXG5cbiAgICAgIGlmIChwYXJzZUludChpbml0X2luZGV4KSA8PSB0b3RhbCAmJiBwYXJzZUludChpbml0X2luZGV4KSA+IDApIHtcbiAgICAgICAgJChzZXR0aW5ncy5zZWN0aW9uQ29udGFpbmVyICsgXCJbZGF0YS1pbmRleD0nXCIgKyBpbml0X2luZGV4ICsgXCInXVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKVxuICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcInZpZXdpbmctcGFnZS1cIisgaW5pdF9pbmRleClcbiAgICAgICAgaWYoc2V0dGluZ3MucGFnaW5hdGlvbiA9PSB0cnVlKSAkKFwiLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhXCIgKyBcIltkYXRhLWluZGV4PSdcIiArIGluaXRfaW5kZXggKyBcIiddXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgICAgIG5leHQgPSAkKHNldHRpbmdzLnNlY3Rpb25Db250YWluZXIgKyBcIltkYXRhLWluZGV4PSdcIiArIChpbml0X2luZGV4KSArIFwiJ11cIik7XG4gICAgICAgIGlmKG5leHQpIHtcbiAgICAgICAgICBuZXh0LmFkZENsYXNzKFwiYWN0aXZlXCIpXG4gICAgICAgICAgaWYoc2V0dGluZ3MucGFnaW5hdGlvbiA9PSB0cnVlKSAkKFwiLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhXCIgKyBcIltkYXRhLWluZGV4PSdcIiArIChpbml0X2luZGV4KSArIFwiJ11cIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgJChcImJvZHlcIilbMF0uY2xhc3NOYW1lID0gJChcImJvZHlcIilbMF0uY2xhc3NOYW1lLnJlcGxhY2UoL1xcYnZpZXdpbmctcGFnZS1cXGQuKj9cXGIvZywgJycpO1xuICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwidmlld2luZy1wYWdlLVwiK25leHQuZGF0YShcImluZGV4XCIpKVxuICAgICAgICAgIGlmIChoaXN0b3J5LnJlcGxhY2VTdGF0ZSAmJiBzZXR0aW5ncy51cGRhdGVVUkwgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zdWJzdHIoMCx3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjJykpICsgXCIjXCIgKyAoaW5pdF9pbmRleCk7XG4gICAgICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSgge30sIGRvY3VtZW50LnRpdGxlLCBocmVmICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBvcyA9ICgoaW5pdF9pbmRleCAtIDEpICogMTAwKSAqIC0xO1xuICAgICAgICBlbC50cmFuc2Zvcm1QYWdlKHNldHRpbmdzLCBwb3MsIGluaXRfaW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChzZXR0aW5ncy5zZWN0aW9uQ29udGFpbmVyICsgXCJbZGF0YS1pbmRleD0nMSddXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpXG4gICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwidmlld2luZy1wYWdlLTFcIilcbiAgICAgICAgaWYoc2V0dGluZ3MucGFnaW5hdGlvbiA9PSB0cnVlKSAkKFwiLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhXCIgKyBcIltkYXRhLWluZGV4PScxJ11cIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICAkKHNldHRpbmdzLnNlY3Rpb25Db250YWluZXIgKyBcIltkYXRhLWluZGV4PScxJ11cIikuYWRkQ2xhc3MoXCJhY3RpdmVcIilcbiAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwidmlld2luZy1wYWdlLTFcIilcbiAgICAgIGlmKHNldHRpbmdzLnBhZ2luYXRpb24gPT0gdHJ1ZSkgJChcIi5vbmVwYWdlLXBhZ2luYXRpb24gbGkgYVwiICsgXCJbZGF0YS1pbmRleD0nMSddXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgIH1cblxuICAgIGlmKHNldHRpbmdzLnBhZ2luYXRpb24gPT0gdHJ1ZSkgIHtcbiAgICAgICQoXCIub25lcGFnZS1wYWdpbmF0aW9uIGxpIGFcIikuY2xpY2soZnVuY3Rpb24gKCl7XG4gICAgICAgIHZhciBwYWdlX2luZGV4ID0gJCh0aGlzKS5kYXRhKFwiaW5kZXhcIik7XG4gICAgICAgIGVsLm1vdmVUbyhwYWdlX2luZGV4KTtcbiAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgJChkb2N1bWVudCkuYmluZCgnbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCBNb3pNb3VzZVBpeGVsU2Nyb2xsJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIC8vIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgZGVsdGEgPSBldmVudC5vcmlnaW5hbEV2ZW50LndoZWVsRGVsdGEgfHwgLWV2ZW50Lm9yaWdpbmFsRXZlbnQuZGV0YWlsO1xuICAgICAgaWYoISQoXCJib2R5XCIpLmhhc0NsYXNzKFwiZGlzYWJsZWQtb25lcGFnZS1zY3JvbGxcIikpIGluaXRfc2Nyb2xsKGV2ZW50LCBkZWx0YSk7XG4gICAgfSk7XG5cblxuICAgIGlmKHNldHRpbmdzLnJlc3BvbnNpdmVGYWxsYmFjayAhPSBmYWxzZSkge1xuICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzcG9uc2l2ZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHJlc3BvbnNpdmUoKTtcbiAgICB9XG5cbiAgICBpZihzZXR0aW5ncy5rZXlib2FyZCA9PSB0cnVlKSB7XG4gICAgICAkKGRvY3VtZW50KS5rZXlkb3duKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIHRhZyA9IGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAoISQoXCJib2R5XCIpLmhhc0NsYXNzKFwiZGlzYWJsZWQtb25lcGFnZS1zY3JvbGxcIikpIHtcbiAgICAgICAgICBzd2l0Y2goZS53aGljaCkge1xuICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgaWYgKHRhZyAhPSAnaW5wdXQnICYmIHRhZyAhPSAndGV4dGFyZWEnKSBlbC5tb3ZlVXAoKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICBpZiAodGFnICE9ICdpbnB1dCcgJiYgdGFnICE9ICd0ZXh0YXJlYScpIGVsLm1vdmVEb3duKClcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzMjogLy9zcGFjZWJhclxuICAgICAgICAgICAgICBpZiAodGFnICE9ICdpbnB1dCcgJiYgdGFnICE9ICd0ZXh0YXJlYScpIGVsLm1vdmVEb3duKClcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzMzogLy9wYWdlZyB1cFxuICAgICAgICAgICAgICBpZiAodGFnICE9ICdpbnB1dCcgJiYgdGFnICE9ICd0ZXh0YXJlYScpIGVsLm1vdmVVcCgpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzQ6IC8vcGFnZSBkd25cbiAgICAgICAgICAgICAgaWYgKHRhZyAhPSAnaW5wdXQnICYmIHRhZyAhPSAndGV4dGFyZWEnKSBlbC5tb3ZlRG93bigpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzY6IC8vaG9tZVxuICAgICAgICAgICAgICBlbC5tb3ZlVG8oMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzU6IC8vZW5kXG4gICAgICAgICAgICAgIGVsLm1vdmVUbyh0b3RhbCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG5cbn0od2luZG93LmpRdWVyeSk7XG4iLCI7Y29uc3QgZWxlbTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnZlcnRpY2FsLWFjY29yZF9fbGlzdFwiKTtcclxuLy8gY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmVydGljYWwtYWNjb3JkX190cmlnZ2VyXCIpO1xyXG5sZXQgbGFzdEFjdGl2ZTI7IFxyXG5jb25zdCBpdGVtMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcudmVydGljYWwtYWNjb3JkX19pdGVtJyk7XHJcblxyXG5lbGVtMi5hZGRFdmVudExpc3RlbmVyICgnY2xpY2snLCBmdW5jdGlvbihldnQpIHtcclxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgXHJcbiAgICBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2ZXJ0aWNhbC1hY2NvcmRfX3RyaWdnZXJcIikpIHtcclxuICAgICAgICBpZiAobGFzdEFjdGl2ZTIpIHtcclxuICAgICAgICAgICAgbGFzdEFjdGl2ZTIuY2xhc3NMaXN0LnJlbW92ZShcInZlcnRpY2FsLWFjY29yZF9faXRlbS0tYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYXN0QWN0aXZlMiA9IGV2dC50YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICBsYXN0QWN0aXZlMi5jbGFzc0xpc3QuYWRkKFwidmVydGljYWwtYWNjb3JkX19pdGVtLS1hY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjbG9zZVwiKSkge1xyXG4gICAgICAgIGxhc3RBY3RpdmUyLmNsYXNzTGlzdC5yZW1vdmUoXCJ2ZXJ0aWNhbC1hY2NvcmRfX2l0ZW0tLWFjdGl2ZVwiKTtcclxuICAgIH1cclxufSlcclxuIiwiO2NvbnN0IGZvcm1PcmRlcjIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnI2Zvcm0tb3JkZXInKTtcclxuY29uc3Qgc2VuZEJ0bjIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnI3NlbmQtYnRuJyk7XHJcbnZhciBvdmVybGF5Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXktYm94Jyk7XHJcbnZhciBvdmVybGF5VGV4dFRydWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheV9fdGV4dC0tdHJ1ZScpO1xyXG52YXIgb3ZlcmxheVRleHRGYWxzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5X190ZXh0LS1mYWxzZScpO1xyXG5cclxuXHJcbnNlbmRCdG4yLmFkZEV2ZW50TGlzdGVuZXIgKCdjbGljaycsIGZ1bmN0aW9uKGV2dCl7XHJcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBzZW5kQnRuMi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2dCA9PiB7XHJcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gaWYgKHZhbGlkYXRlRm9ybShmb3JtT3JkZXIpKSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nICgn0LLRgdC1INC+0LonKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBmb3JtZGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtT3JkZXIpO1xyXG4gICAgICAgIGZvcm1kYXRhLmFwcGVuZCgndG8nLCAnbWFpbEBtYWlsLnJ1Jyk7XHJcblxyXG4gICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICBuYW1lOiBmb3JtT3JkZXIyLmVsZW1lbnRzLm5hbWUudmFsdWUsXHJcbiAgICAgICAgICAgIHBob25lOiBmb3JtT3JkZXIyLmVsZW1lbnRzLnBob25lLnZhbHVlLFxyXG4gICAgICAgICAgICBjb21tZW50OiBmb3JtT3JkZXIyLmVsZW1lbnRzLmNvbW1lbnQudmFsdWUsXHJcbiAgICAgICAgICAgIHRvOiBmb3JtZGF0YS5nZXQoJ3RvJylcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xyXG4gICAgICAgIHhoci5vcGVuKCdQT1NUJywgJ2h0dHBzOi8vd2ViZGV2LWFwaS5sb2Z0c2Nob29sLmNvbS9zZW5kbWFpbCcpO1xyXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiWC1SZXF1ZXN0ZWQtV2l0aFwiLCBcIlhNTEh0dHBSZXF1ZXN0XCIpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nICh4aHIub3Blbik7XHJcbiAgICAgICAgeGhyLnNlbmQgKGZvcm1kYXRhKTtcclxuICAgICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ9C+0YjQuNCx0LrQsCcpO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheUJveC5zdHlsZS5kaXNwbGF5PSdmbGV4JztcclxuICAgICAgICAgICAgICAgIG92ZXJsYXlUZXh0VHJ1ZS5zdHlsZS5kaXNwbGF5PSdub25lJztcclxuICAgICAgICAgICAgICAgIG92ZXJsYXlUZXh0RmFsc2Uuc3R5bGUuZGlzcGxheT0nZmxleCc7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb2snKTtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXlCb3guc3R5bGUuZGlzcGxheT0nZmxleCc7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5VGV4dEZhbHNlLnN0eWxlLmRpc3BsYXk9J25vbmUnO1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheVRleHRUcnVlLnN0eWxlLmRpc3BsYXk9J2ZsZXgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbn0pIiwiO3ZhciBmc01lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnMtbWVudScpO1xyXG52YXIgaGFtYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbWJ1cmdlci1tZW51LWxpbmsnKTtcclxudmFyIGNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlLS1mcy1tZW51Jyk7XHJcblxyXG5cclxuY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldnQpe1xyXG4gICAgIGlmIChmc01lbnUuc3R5bGUuZGlzcGxheT0nZmxleCcpXHJcbiAgICAgZnNNZW51LnN0eWxlLmRpc3BsYXk9J25vbmUnXHJcbn0pXHJcblxyXG5oYW1idXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldnQpe1xyXG4gICAgIGlmIChmc01lbnUuc3R5bGUuZGlzcGxheT0nbm9uZScpXHJcbiAgICAgZnNNZW51LnN0eWxlLmRpc3BsYXk9J2ZsZXgnXHJcbiAgICAgZnNNZW51LnN0eWxlLmRpc3BsYXk9J2ZsZXgnXHJcbn0pIiwiO3ltYXBzLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBteU1hcCA9IG5ldyB5bWFwcy5NYXAoJ21hcCcsIHtcclxuICAgICAgICAgICAgY2VudGVyOiBbNTUuNzUsIDM3LjYwXSxcclxuICAgICAgICAgICAgem9vbTogMTNcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHNlYXJjaENvbnRyb2xQcm92aWRlcjogJ3lhbmRleCNzZWFyY2gnXHJcbiAgICAgICAgfSksXHJcblxyXG4gICAgICAgIC8vINCh0L7Qt9C00LDRkdC8INC80LDQutC10YIg0YHQvtC00LXRgNC20LjQvNC+0LPQvi5cclxuICAgICAgICBNeUljb25Db250ZW50TGF5b3V0ID0geW1hcHMudGVtcGxhdGVMYXlvdXRGYWN0b3J5LmNyZWF0ZUNsYXNzKFxyXG4gICAgICAgICAgICAnPGRpdiBzdHlsZT1cImNvbG9yOiAjRkZGRkZGOyBmb250LXdlaWdodDogYm9sZDtcIj4kW3Byb3BlcnRpZXMuaWNvbkNvbnRlbnRdPC9kaXY+J1xyXG4gICAgICAgICksXHJcblxyXG4gICAgICAgIG15UGxhY2VtYXJrMSA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoWzU1Ljc1ODkzMDkwMjA3ODU1LDM3LjU4MzA4Mjk1MjA4NzQxNl0sIHtcclxuICAgICAgICAgICAgaGludENvbnRlbnQ6ICfQodC+0LHRgdGC0LLQtdC90L3Ri9C5INC30L3QsNGH0L7QuiDQvNC10YLQutC4JyxcclxuICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnQ6ICfQn9C10YDQstCw0Y8nXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAvLyDQntC/0YbQuNC4LlxyXG4gICAgICAgICAgICAvLyDQndC10L7QsdGF0L7QtNC40LzQviDRg9C60LDQt9Cw0YLRjCDQtNCw0L3QvdGL0Lkg0YLQuNC/INC80LDQutC10YLQsC5cclxuICAgICAgICAgICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxyXG4gICAgICAgICAgICAvLyDQodCy0L7RkSDQuNC30L7QsdGA0LDQttC10L3QuNC1INC40LrQvtC90LrQuCDQvNC10YLQutC4LlxyXG4gICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaWNvbnMvbWFwLWlrb24uZ2lmJyxcclxuICAgICAgICAgICAgLy8g0KDQsNC30LzQtdGA0Ysg0LzQtdGC0LrQuC5cclxuICAgICAgICAgICAgaWNvbkltYWdlU2l6ZTogWzQ2LCA1N10sXHJcbiAgICAgICAgICAgIC8vINCh0LzQtdGJ0LXQvdC40LUg0LvQtdCy0L7Qs9C+INCy0LXRgNGF0L3QtdCz0L4g0YPQs9C70LAg0LjQutC+0L3QutC4INC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QvlxyXG4gICAgICAgICAgICAvLyDQtdGRIFwi0L3QvtC20LrQuFwiICjRgtC+0YfQutC4INC/0YDQuNCy0Y/Qt9C60LgpLlxyXG4gICAgICAgICAgICBpY29uSW1hZ2VPZmZzZXQ6ICBbLTUsIC0zOF1cclxuICAgICAgICB9KSxcclxuICAgICAgICBteVBsYWNlbWFyazIgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFs1NS43NDk4MDY4MjE2MzEwNiwzNy42MDQxMTE0NzA3NjQxNzRdLCB7XHJcbiAgICAgICAgICAgIGhpbnRDb250ZW50OiAn0KHQvtCx0YHRgtCy0LXQvdC90YvQuSDQt9C90LDRh9C+0Log0LzQtdGC0LrQuCcsXHJcbiAgICAgICAgICAgIGJhbGxvb25Db250ZW50OiAn0JLRgtC+0YDQsNGPJ1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxyXG4gICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaWNvbnMvbWFwLWlrb24uZ2lmJyxcclxuICAgICAgICAgICAgaWNvbkltYWdlU2l6ZTogWzQ2LCA1N10sXHJcbiAgICAgICAgICAgIGljb25JbWFnZU9mZnNldDogIFstNSwgLTM4XVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIG15UGxhY2VtYXJrMyA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoWzU1Ljc1ODE4MDcyNzAwMzEsMzcuNjI0MDI0MTkwNDkwNzNdLCB7XHJcbiAgICAgICAgICAgIGhpbnRDb250ZW50OiAn0KHQvtCx0YHRgtCy0LXQvdC90YvQuSDQt9C90LDRh9C+0Log0LzQtdGC0LrQuCcsXHJcbiAgICAgICAgICAgIGJhbGxvb25Db250ZW50OiAn0KLRgNC10YLRjNGPJ1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxyXG4gICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaWNvbnMvbWFwLWlrb24uZ2lmJyxcclxuICAgICAgICAgICAgaWNvbkltYWdlU2l6ZTogWzQ2LCA1N10sXHJcbiAgICAgICAgICAgIGljb25JbWFnZU9mZnNldDogIFstNSwgLTM4XVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIG15UGxhY2VtYXJrNCA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoWzU1Ljc0MzMxNzM3NTgyMzc2LDM3LjU4MDgyMzAxNTE2Nzg0XSwge1xyXG4gICAgICAgICAgICBoaW50Q29udGVudDogJ9Ch0L7QsdGB0YLQstC10L3QvdGL0Lkg0LfQvdCw0YfQvtC6INC80LXRgtC60LgnLFxyXG4gICAgICAgICAgICBiYWxsb29uQ29udGVudDogJ9Cn0LXRgtCy0LXRgNGC0LDRjydcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcclxuICAgICAgICAgICAgaWNvbkltYWdlSHJlZjogJ2ljb25zL21hcC1pa29uLmdpZicsXHJcbiAgICAgICAgICAgIGljb25JbWFnZVNpemU6IFs0NiwgNTddLFxyXG4gICAgICAgICAgICBpY29uSW1hZ2VPZmZzZXQ6ICBbLTUsIC0zOF1cclxuICAgICAgICB9KTtcclxuICAgIG15TWFwLmdlb09iamVjdHNcclxuICAgIC5hZGQobXlQbGFjZW1hcmsxKVxyXG4gICAgLmFkZChteVBsYWNlbWFyazIpXHJcbiAgICAuYWRkKG15UGxhY2VtYXJrMylcclxuICAgIC5hZGQobXlQbGFjZW1hcms0KTtcclxuICAgIG15TWFwLmJlaGF2aW9ycy5kaXNhYmxlKCdzY3JvbGxab29tJyk7XHJcbn0pOyIsIjskKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgICAgICQoXCIubmF2XCIpLm9uKFwiY2xpY2tcIixcImFcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIC8v0L7RgtC80LXQvdGP0LXQvCDRgdGC0LDQvdC00LDRgNGC0L3Rg9GOINC+0LHRgNCw0LHQvtGC0LrRgyDQvdCw0LbQsNGC0LjRjyDQv9C+INGB0YHRi9C70LrQtVxyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAvL9C30LDQsdC40YDQsNC10Lwg0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YAg0LHQvtC60LAg0YEg0LDRgtGA0LjQsdGD0YLQsCBocmVmXHJcbiAgICAgICAgICAgIHZhciBpZCAgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKSxcclxuICAgICAgICAgICAgLy/Rg9C30L3QsNC10Lwg0LLRi9GB0L7RgtGDINC+0YIg0L3QsNGH0LDQu9CwINGB0YLRgNCw0L3QuNGG0Ysg0LTQviDQsdC70L7QutCwINC90LAg0LrQvtGC0L7RgNGL0Lkg0YHRgdGL0LvQsNC10YLRgdGPINGP0LrQvtGA0YxcclxuICAgICAgICAgICAgICAgIHRvcCA9ICQoaWQpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgLy/QsNC90LjQvNC40YDRg9C10Lwg0L/QtdGA0LXRhdC+0LQg0L3QsCDRgNCw0YHRgdGC0L7Rj9C90LjQtSAtIHRvcCDQt9CwIDE1MDAg0LzRgVxyXG4gICAgICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHRvcH0sIDUwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJChcIi5kZXNjXCIpLm9uKFwiY2xpY2tcIixcImFcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIC8v0L7RgtC80LXQvdGP0LXQvCDRgdGC0LDQvdC00LDRgNGC0L3Rg9GOINC+0LHRgNCw0LHQvtGC0LrRgyDQvdCw0LbQsNGC0LjRjyDQv9C+INGB0YHRi9C70LrQtVxyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAvL9C30LDQsdC40YDQsNC10Lwg0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YAg0LHQvtC60LAg0YEg0LDRgtGA0LjQsdGD0YLQsCBocmVmXHJcbiAgICAgICAgICAgIHZhciBpZCAgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKSxcclxuICAgICAgICAgICAgLy/Rg9C30L3QsNC10Lwg0LLRi9GB0L7RgtGDINC+0YIg0L3QsNGH0LDQu9CwINGB0YLRgNCw0L3QuNGG0Ysg0LTQviDQsdC70L7QutCwINC90LAg0LrQvtGC0L7RgNGL0Lkg0YHRgdGL0LvQsNC10YLRgdGPINGP0LrQvtGA0YxcclxuICAgICAgICAgICAgICAgIHRvcCA9ICQoaWQpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgLy/QsNC90LjQvNC40YDRg9C10Lwg0L/QtdGA0LXRhdC+0LQg0L3QsCDRgNCw0YHRgdGC0L7Rj9C90LjQtSAtIHRvcCDQt9CwIDE1MDAg0LzRgVxyXG4gICAgICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHRvcH0sIDUwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsiLCI7dmFyIGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi0tY2xvc2UnKTtcclxudmFyIG92ZXJsYXlCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheS1ib3gnKTtcclxuXHJcblxyXG5cclxuYnRuQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldnQpe1xyXG4gICAgIGlmIChvdmVybGF5Qm94LnN0eWxlLmRpc3BsYXk9J2ZsZXgnKVxyXG4gICAgIG92ZXJsYXlCb3guc3R5bGUuZGlzcGxheT0nbm9uZSdcclxufSlcclxuIiwiLy8gMi4gVGhpcyBjb2RlIGxvYWRzIHRoZSBJRnJhbWUgUGxheWVyIEFQSSBjb2RlIGFzeW5jaHJvbm91c2x5LlxyXG47dmFyIHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG5cclxudGFnLnNyYyA9IFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaVwiO1xyXG52YXIgZmlyc3RTY3JpcHRUYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XHJcbmZpcnN0U2NyaXB0VGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhZywgZmlyc3RTY3JpcHRUYWcpO1xyXG5cclxubGV0IHBsYXllcjI7XHJcblxyXG5jb25zdCBmb3JtYXRUaW1lMiA9IHRpbWVTZWMgPT4ge1xyXG4gIGNvbnN0IHJvdW5kVGltZSA9IE1hdGgucm91bmQodGltZVNlYyk7XHJcblxyXG4gIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHJvdW5kVGltZSAvIDYwKTtcclxuICBjb25zdCBzZWNvbmRzID0gcm91bmRUaW1lIC0gbWludXRlcyAqIDYwO1xyXG5cclxuICBjb25zdCBmb3JtYXR0ZWRTZWNvbmRzID0gc2Vjb25kcyA8IDEwID8gYDAke3NlY29uZHN9YCA6IHNlY29uZHM7XHJcblxyXG4gIHJldHVybiBgJHttaW51dGVzfToke2Zvcm1hdHRlZFNlY29uZHN9YDtcclxufTtcclxuXHJcbmNvbnN0IG9uUGxheWVyUmVhZHkyID0gKCkgPT4ge1xyXG4gIGxldCBpbnRlcnZhbDtcclxuICBsZXQgZHVyYXRpb25TZWMgPSBwbGF5ZXIyLmdldER1cmF0aW9uKCk7XHJcblxyXG4gICQoXCIucGxheWVyX19kdXJhdGlvbi1lc3RpbWF0ZVwiKS50ZXh0KGZvcm1hdFRpbWUyKGR1cmF0aW9uU2VjKSk7XHJcblxyXG4gIGlmICh0eXBlb2YgaW50ZXJ2YWwgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICBjb25zdCBjb21wbGV0ZWRTZWMgPSBwbGF5ZXIyLmdldEN1cnJlbnRUaW1lKCk7XHJcbiAgICBjb25zdCBjb21wbGV0ZWRQZXJjZW50ID0gKGNvbXBsZXRlZFNlYyAvIGR1cmF0aW9uU2VjKSAqIDEwMDtcclxuXHJcbiAgICAkKFwiLnBsYXllcl9fcGxheWJhY2stYnV0dG9uXCIpLmNzcyh7XHJcbiAgICAgIGxlZnQ6IGAke2NvbXBsZXRlZFBlcmNlbnR9JWBcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIucGxheWVyX19kdXJhdGlvbi1jb21wbGV0ZWRcIikudGV4dChmb3JtYXRUaW1lMihjb21wbGV0ZWRTZWMpKTtcclxuICB9LCAxMDAwKTtcclxufTtcclxuXHJcbmNvbnN0IGV2ZW50c0luaXQyID0gKCkgPT4ge1xyXG4gICQoXCIucGxheWVyX19zdGFydFwiKS5vbihcImNsaWNrXCIsIGUgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgYnRuID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgIGlmIChidG4uaGFzQ2xhc3MoXCJwYXVzZWRcIikpIHtcclxuICAgICAgcGxheWVyMi5wYXVzZVZpZGVvKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwbGF5ZXIyLnBsYXlWaWRlbygpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAkKFwiLnBsYXllcl9fcGxheWJhY2tcIikub24oXCJjbGlja1wiLCBlID0+IHtcclxuICAgIGNvbnN0IGJhciA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICAgIGNvbnN0IG5ld0J1dHRvblBvc2l0aW9uID0gZS5wYWdlWCAtIGJhci5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgY29uc3QgYnV0dG9uUG9zUGVyY2VudCA9IChuZXdCdXR0b25Qb3NpdGlvbiAvIGJhci53aWR0aCgpKSAqIDEwMDtcclxuICAgIGNvbnN0IG5ld1BsYXllclRpbWVTZWMgPSAocGxheWVyMi5nZXREdXJhdGlvbigpIC8gMTAwKSAqIGJ1dHRvblBvc1BlcmNlbnQ7XHJcblxyXG4gICAgJChcIi5wbGF5ZXJfX3BsYXliYWNrLWJ1dHRvblwiKS5jc3Moe1xyXG4gICAgICBsZWZ0OiBgJHtidXR0b25Qb3NQZXJjZW50fSVgXHJcbiAgICB9KTtcclxuXHJcbiAgICBwbGF5ZXIyLnNlZWtUbyhuZXdQbGF5ZXJUaW1lU2VjKTtcclxuICB9KTtcclxuXHJcbiAgJChcIi5wbGF5ZXJfX3NwbGFzaFwiKS5vbihcImNsaWNrXCIsIGUgPT4ge1xyXG4gICAgcGxheWVyMi5wbGF5VmlkZW8oKTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IG9uUGxheWVyU3RhdGVDaGFuZ2UyID0gZXZlbnQgPT4ge1xyXG4gIGNvbnN0IHBsYXllckJ1dHRvbiA9ICQoXCIucGxheWVyX19zdGFydFwiKTtcclxuICAvKlxyXG4gIC0xICjQstC+0YHQv9GA0L7QuNC30LLQtdC00LXQvdC40LUg0LLQuNC00LXQviDQvdC1INC90LDRh9Cw0YLQvilcclxuICAwICjQstC+0YHQv9GA0L7QuNC30LLQtdC00LXQvdC40LUg0LLQuNC00LXQviDQt9Cw0LLQtdGA0YjQtdC90L4pXHJcbiAgMSAo0LLQvtGB0L/RgNC+0LjQt9Cy0LXQtNC10L3QuNC1KVxyXG4gIDIgKNC/0LDRg9C30LApXHJcbiAgMyAo0LHRg9GE0LXRgNC40LfQsNGG0LjRjylcclxuICA1ICjQstC40LTQtdC+INC/0L7QtNCw0Y7RgiDRgNC10L/Qu9C40LrQuCkuXHJcbiAgICovXHJcbiAgc3dpdGNoIChldmVudC5kYXRhKSB7XHJcbiAgICBjYXNlIDE6IFxyXG4gICAgICAkKCcucGxheWVyX193cmFwcGVyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICBwbGF5ZXJCdXR0b24uYWRkQ2xhc3MoXCJwYXVzZWRcIik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAyOiBcclxuICAgICAgcGxheWVyQnV0dG9uLnJlbW92ZUNsYXNzKFwicGF1c2VkXCIpO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBvbllvdVR1YmVJZnJhbWVBUElSZWFkeSgpIHtcclxuICBwbGF5ZXIyID0gbmV3IFlULlBsYXllcihcInl0LXBsYXllclwiLCB7XHJcbiAgICBoZWlnaHQ6IFwiNDA1XCIsXHJcbiAgICB3aWR0aDogXCI2NjBcIixcclxuICAgIHZpZGVvSWQ6IFwiQnpkQTVyT2R3UThcIixcclxuICAgIGV2ZW50czoge1xyXG4gICAgICBvblJlYWR5OiBvblBsYXllclJlYWR5MixcclxuICAgICAgb25TdGF0ZUNoYW5nZTogb25QbGF5ZXJTdGF0ZUNoYW5nZTJcclxuICAgIH0sXHJcbiAgICBwbGF5ZXJWYXJzOiB7XHJcbiAgICAgIGNvbnRyb2xzOiAwLFxyXG4gICAgICBkaXNhYmxla2I6IDAsXHJcbiAgICAgIHNob3dpbmZvOiAwLFxyXG4gICAgICByZWw6IDAsXHJcbiAgICAgIGF1dG9wbGF5OiAwLFxyXG4gICAgICBtb2Rlc3RicmFuZGluZzogMFxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5ldmVudHNJbml0MigpOyIsIjsvKiDQmNC90LTQtdC60YEg0YHQu9Cw0LnQtNCwINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOICovXHJcbnZhciBzbGlkZUluZGV4ID0gMTtcclxuc2hvd1NsaWRlcyhzbGlkZUluZGV4KTtcclxuLyog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10YIg0YLQtdC60YPRidC40Lkg0YHQu9Cw0LnQtCAqL1xyXG5mdW5jdGlvbiBjdXJyZW50U2xpZGUobikge1xyXG4gICAgdmFyIHNsaWRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyZXZpZXdfX2l0ZW1cIik7XHJcbiAgICBzaG93U2xpZGVzKHNsaWRlSW5kZXggPSBuKTsgICAgXHJcbn1cclxuXHJcbi8qINCe0YHQvdC+0LLQvdCw0Y8g0YTRg9C90LrRhtC40Y8g0YHQu9Cw0LnQtNC10YDQsCAqL1xyXG5mdW5jdGlvbiBzaG93U2xpZGVzKG4pIHtcclxuICAgIHZhciBpO1xyXG4gICAgdmFyIHNsaWRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyZXZpZXdfX2l0ZW1cIik7XHJcbiAgICB2YXIgZG90cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyZXZpZXdfX2NhcnJvdXNlbC1pdGVtXCIpO1xyXG5cclxuICAgIGlmIChuID4gc2xpZGVzLmxlbmd0aCkge1xyXG4gICAgICBzbGlkZUluZGV4ID0gMVxyXG4gICAgfVxyXG4gICAgaWYgKG4gPCAxKSB7XHJcbiAgICAgICAgc2xpZGVJbmRleCA9IHNsaWRlcy5sZW5ndGhcclxuICAgIH1cclxuICAgIGZvciAoaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzbGlkZXNbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfVxyXG4gICAgZm9yIChpID0gMDsgaSA8IGRvdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSA9IGRvdHNbaV0uY2xhc3NOYW1lLnJlcGxhY2UoXCJyZXZpZXdfX2NhcnJvdXNlbC1pdGVtLS1jdXJyZW50XCIsIFwiXCIpO1xyXG4gICAgfVxyXG4gICAgc2xpZGVzW3NsaWRlSW5kZXggLSAxXS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICBkb3RzW3NsaWRlSW5kZXggLSAxXS5jbGFzc05hbWUgKz0gXCIgcmV2aWV3X19jYXJyb3VzZWwtaXRlbS0tY3VycmVudFwiO1xyXG59IiwiO2NvbnN0IGxlZnQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsZWZ0XCIpO1xyXG5jb25zdCByaWdodDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJpZ2h0XCIpO1xyXG5jb25zdCBsaXN0MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdFwiKTtcclxuY29uc3QgY29tcHV0ZWQyID0gZ2V0Q29tcHV0ZWRTdHlsZShsaXN0Mik7XHJcblxyXG5jb25zdCBtaW5SaWdodDIgPSAwO1xyXG5jb25zdCBtYXhSaWdodDIgPSBsaXN0Lm9mZnNldFdpZHRoO1xyXG5jb25zdCBzdGVwMiA9IGxpc3Qub2Zmc2V0V2lkdGg7XHJcbmxldCBjdXJyZW50UmlnaHQyID0gMDtcclxuXHJcbmxpc3QyLnN0eWxlLnJpZ2h0ID0gY3VycmVudFJpZ2h0MiArICdweCc7XHJcblxyXG5yaWdodDIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oZXZ0KSB7XHJcbiAgICBldnQucHJldmVudERlZmF1bHQoKTsgICAgXHJcbiAgICBpZiAoY3VycmVudFJpZ2h0MiA8IG1heFJpZ2h0Mikge1xyXG4gICAgICAgIGN1cnJlbnRSaWdodDIgKz0gc3RlcDI7XHJcbiAgICAgICAgbGlzdDIuc3R5bGUucmlnaHQgPSBjdXJyZW50UmlnaHQyICsgJ3B4JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY3VycmVudFJpZ2h0MiA9IG1pblJpZ2h0MjtcclxuICAgICAgICBsaXN0Mi5zdHlsZS5yaWdodCA9IGN1cnJlbnRSaWdodDIgKyAncHgnO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmxlZnQyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKGV2dCkge1xyXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgaWYgKGN1cnJlbnRSaWdodDI+bWluUmlnaHQyKSB7XHJcbiAgICAgICAgY3VycmVudFJpZ2h0MiAtPSBzdGVwMjtcclxuICAgICAgICBsaXN0Mi5zdHlsZS5yaWdodCA9IGN1cnJlbnRSaWdodDIgKyAncHgnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjdXJyZW50UmlnaHQyID0gbWF4UmlnaHQyO1xyXG4gICAgICAgIGxpc3QyLnN0eWxlLnJpZ2h0ID0gY3VycmVudFJpZ2h0MiArICdweCc7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuIl19
