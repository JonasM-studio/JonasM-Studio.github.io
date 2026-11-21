// App videos: play muted while on screen and pause when scrolled away.
// With "reduce motion" on, nothing starts until the viewer presses play.
// Controls: play/pause, time, a seek bar, sound and full screen.
// No network requests beyond the video file itself.
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  var icons = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>',
    muted: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9.5l5 5m0-5l-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    sound: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>',
    full: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 9V4.5H9M15 4.5h4.5V9M19.5 15v4.5H15M9 19.5H4.5V15" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    exit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4.5V9H4.5M19.5 9H15V4.5M15 19.5V15h4.5M4.5 15H9v4.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  function fmt(s) {
    s = Math.max(0, Math.floor(s || 0));
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }
  function el(tag, cls) { var e = document.createElement(tag); if (cls) e.className = cls; return e; }
  function button(cls) { var b = el('button', cls); b.type = 'button'; return b; }

  Array.prototype.forEach.call(document.querySelectorAll('.film'), function (film) {
    var video = film.querySelector('video');
    var frame = film.querySelector('.film-frame');
    if (!video || !frame) return;
    video.removeAttribute('controls');
    video.muted = true;
    film.classList.add('is-enhanced');

    var start = button('film-start');
    start.innerHTML = icons.play;
    start.setAttribute('aria-label', 'Play video');

    var bar = el('div', 'film-controls');
    var playBtn = button('film-btn');
    var time = el('span', 'film-time');
    var seek = el('input', 'film-seek');
    seek.type = 'range'; seek.min = 0; seek.max = 1000; seek.step = 1; seek.value = 0;
    seek.setAttribute('aria-label', 'Seek');
    var soundBtn = button('film-btn');
    var fullBtn = button('film-btn');
    bar.appendChild(playBtn); bar.appendChild(time); bar.appendChild(seek);
    bar.appendChild(soundBtn); bar.appendChild(fullBtn);
    frame.appendChild(start);
    frame.appendChild(bar);

    var pausedByViewer = false, started = false, seeking = false, idleTimer = 0;
    var canFull = !!(frame.requestFullscreen || frame.webkitRequestFullscreen || video.webkitEnterFullscreen);
    if (!canFull) fullBtn.hidden = true;

    function play() { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
    function isFull() { return (document.fullscreenElement || document.webkitFullscreenElement) === frame; }
    function progress() {
      var d = video.duration || 0, c = video.currentTime || 0;
      if (!seeking && d) seek.value = Math.round(c / d * 1000);
      seek.style.setProperty('--p', (seek.value / 10) + '%');
      time.textContent = fmt(c) + ' / ' + fmt(d);
      seek.setAttribute('aria-valuetext', fmt(c) + ' of ' + fmt(d));
    }
    function sync() {
      if (!video.paused) started = true;
      film.classList.toggle('is-playing', !video.paused);
      film.classList.toggle('is-started', started);
      playBtn.innerHTML = video.paused ? icons.play : icons.pause;
      playBtn.setAttribute('aria-label', video.paused ? 'Play video' : 'Pause video');
      soundBtn.innerHTML = video.muted ? icons.muted : icons.sound;
      soundBtn.setAttribute('aria-label', video.muted ? 'Turn sound on' : 'Turn sound off');
      fullBtn.innerHTML = isFull() ? icons.exit : icons.full;
      fullBtn.setAttribute('aria-label', isFull() ? 'Exit full screen' : 'Full screen');
      film.classList.toggle('is-full', isFull());
      progress();
      wake();
    }
    // the bar fades away after a few still seconds while playing, and comes back on any movement
    function wake() {
      film.classList.remove('is-idle');
      clearTimeout(idleTimer);
      if (!video.paused) idleTimer = setTimeout(function () {
        if (!frame.contains(document.activeElement) || document.activeElement === video) film.classList.add('is-idle');
      }, 2600);
    }

    playBtn.addEventListener('click', function () {
      if (video.paused) { pausedByViewer = false; play(); } else { pausedByViewer = true; video.pause(); }
    });
    start.addEventListener('click', function () { pausedByViewer = false; play(); });
    video.addEventListener('click', function () {
      if (video.paused) { pausedByViewer = false; play(); } else { pausedByViewer = true; video.pause(); }
    });
    soundBtn.addEventListener('click', function () {
      video.muted = !video.muted;
      if (!video.muted && video.paused) { pausedByViewer = false; play(); }
    });
    fullBtn.addEventListener('click', function () {
      if (isFull()) {
        (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      } else if (frame.requestFullscreen) {
        frame.requestFullscreen();
      } else if (frame.webkitRequestFullscreen) {
        frame.webkitRequestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();      // iPhone: the system player
      }
    });
    seek.addEventListener('input', function () {
      seeking = true;
      if (video.duration) video.currentTime = seek.value / 1000 * video.duration;
      progress();
    });
    seek.addEventListener('change', function () { seeking = false; progress(); });

    ['play', 'pause', 'volumechange', 'loadedmetadata'].forEach(function (e) { video.addEventListener(e, sync); });
    video.addEventListener('timeupdate', progress);
    document.addEventListener('fullscreenchange', sync);
    document.addEventListener('webkitfullscreenchange', sync);
    ['pointermove', 'pointerdown', 'focusin', 'keydown'].forEach(function (e) { frame.addEventListener(e, wake); });
    // smooth bar while playing
    (function tick() { if (!video.paused) progress(); requestAnimationFrame(tick); })();

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (isFull()) return;
          if (e.isIntersecting && e.intersectionRatio >= 0.4) {
            if (!pausedByViewer && !(reduce && reduce.matches && !started)) play();
          } else if (!video.paused) {
            video.pause();
          }
        });
      }, { threshold: [0, 0.4] }).observe(video);
    }
    sync();
  });
})();
