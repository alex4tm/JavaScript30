/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenButton = player.querySelector('.full__screen');

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
};

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.innerHTML = icon;
}

function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip)
};

function handleRangeUpdate() {
  video[this.name] = this.value;
};

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

function fullScreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
    else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
    else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    }
    else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
    }
    video.play();
};
/* add the event listeners */

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach (button => {
  button.addEventListener('click', skip);
});

ranges.forEach (range => range.addEventListener('change', handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mouseove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
fullScreenButton.addEventListener('click', fullScreen);
