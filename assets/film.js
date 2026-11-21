// App films: play muted while on screen, pause when scrolled away.
// With "reduce motion" on, nothing starts until the viewer presses play.
// No network requests beyond the video file itself.
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  var icons = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>',
    muted: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9.5l5 5m0-5l-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    sound: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>'
  };

  Array.prototype.forEach.call(document.querySelectorAll('.film'), function (film) {
    var video = film.querySelector('video');
    if (!video) return;
    video.removeAttribute('controls');
    video.muted = true;
    film.classList.add('is-enhanced');

    var bar = document.createElement('div');
    bar.className = 'film-controls';
    var playBtn = button('film-btn');
    var soundBtn = button('film-btn');
    bar.appendChild(playBtn);
    bar.appendChild(soundBtn);
    var start = button('film-start');
    start.innerHTML = icons.play;
    start.setAttribute('aria-label', 'Play film');
    film.querySelector('.film-frame').appendChild(start);
    film.querySelector('.film-frame').appendChild(bar);

    var pausedByViewer = false;
    var started = false;

    function button(cls) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = cls;
      return b;
    }
    function play() { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
    function sync() {
      if (!video.paused) started = true;
      film.classList.toggle('is-playing', !video.paused);
      film.classList.toggle('is-started', started);
      playBtn.innerHTML = video.paused ? icons.play : icons.pause;
      playBtn.setAttribute('aria-label', video.paused ? 'Play film' : 'Pause film');
      soundBtn.innerHTML = video.muted ? icons.muted : icons.sound;
      soundBtn.setAttribute('aria-label', video.muted ? 'Turn sound on' : 'Turn sound off');
    }

    playBtn.addEventListener('click', function () {
      if (video.paused) { pausedByViewer = false; play(); } else { pausedByViewer = true; video.pause(); }
    });
    soundBtn.addEventListener('click', function () {
      video.muted = !video.muted;
      if (!video.muted && video.paused) { pausedByViewer = false; play(); }
    });
    start.addEventListener('click', function () { pausedByViewer = false; play(); });
    ['play', 'pause', 'volumechange'].forEach(function (e) { video.addEventListener(e, sync); });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
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
