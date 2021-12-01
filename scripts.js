const music = document.getElementById("music");
const play = document.getElementById("play");
const vol = document.getElementById("volume");
const forward = document.getElementById("forward");
const musicCont = document.querySelector(".musicCont");

var len = document.querySelector("#main").offsetWidth;

var min = 5;
var max = 60;

var graph = new Array(len).fill(min).map((e) => {
  let num = Math.floor(Math.random() * max);
  if (num + e > max) {
    return num + e - 10;
  } else {
    return num + e;
  }
});

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function draw() {
  var width = 2;
  var X = 1;

  for (var i = 0; i < graph.length; i += 10) {
    var bars = graph[i];
    if (bars < 50) {
      ctx.fillStyle = "gray";
      ctx.fillRect(X, 80, width, -bars);
    } else {
      ctx.fillStyle = "gray";
      ctx.fillRect(X, 40, width, bars);
    }
    X += width + 1;
  }
}

let count = 0;
let interval;
function timer() {
  interval = setInterval(() => {
    count++;

    fill(count);
  }, 2000);
}

function fill(count) {
  var width = 2;
  var X = 1;

  for (var i = 0; i < Math.floor((len * count) / 100); i += 10) {
    var bars = graph[i];
    if (bars < 50) {
      ctx.fillStyle = "red";
      ctx.fillRect(X, 80, width, -bars);
    } else {
      ctx.fillStyle = "red";
      ctx.fillRect(X, 40, width, bars);
    }
    X += width + 1;
  }
}

canvas.addEventListener("click", (e) => {
  let st = e.pageX / music.duration;

  let x = e.pageX / (len / music.duration);
  music.currentTime = x;

  var width = 2;
  var X = 1;
  for (var i = 0; i < len; i += 10) {
    var bars = graph[i];
    if (i < e.pageX) {
      if (bars < 50) {
        ctx.fillStyle = "red";
        ctx.fillRect(X, 80, width, -bars);
        console.log(X);
      } else {
        ctx.fillStyle = "red";
        ctx.fillRect(X, 40, width, bars);
      }
    } else {
      if (bars < 50) {
        ctx.fillStyle = "gray";
        ctx.fillRect(X, 80, width, -bars);
      } else {
        ctx.fillStyle = "gray";
        ctx.fillRect(X, 40, width, bars);
      }
    }
    X += width + 1;
  }
});

function playSong() {
  musicCont.classList.add("play");
  play.querySelector("i.fas").classList.remove("fa-play");
  play.querySelector("i.fas").classList.add("fa-pause");
  music.play();
  timer();
}

function pauseSong() {
  musicCont.classList.remove("play");
  play.querySelector("i.fas").classList.remove("fa-pause");
  play.querySelector("i.fas").classList.add("fa-play");
  music.pause();
  clearInterval(interval);
}

function muteOff() {
  musicCont.classList.add("mute");
  vol.querySelector("i.fas").classList.remove("fa-volume-up");
  vol.querySelector("i.fas").classList.add("fa-volume-mute");
  music.muted = true;
}

function muteOn() {
  musicCont.classList.remove("mute");
  vol.querySelector("i.fas").classList.add("fa-volume-up");
  vol.querySelector("i.fas").classList.remove("fa-volume-mute");
  music.muted = false;
}

play.addEventListener("click", () => {
  const isPlay = musicCont.classList.contains("play");

  if (isPlay) {
    pauseSong();
  } else {
    music.play();
    playSong();
  }
});

vol.addEventListener("click", () => {
  const isMute = musicCont.classList.contains("mute");
  if (isMute) {
    muteOn();
  } else {
    muteOff();
  }
});

music.addEventListener("timeupdate", updateProgress);
