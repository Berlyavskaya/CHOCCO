// 2. This code loads the IFrame Player API code asynchronously.
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

eventsInit2();