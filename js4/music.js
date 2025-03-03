const audio = document.getElementById("myAudio");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const currentTimeDisplay = document.getElementById("currentTime");
    const durationDisplay = document.getElementById("duration");
    const volumeSlider = document.getElementById("volumeSlider");
    const progressBar = document.getElementById("progressBar");

    playPauseBtn.addEventListener("click", function() {
      if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "Pause";
      } else {
        audio.pause();
        playPauseBtn.textContent = "Play";
      }
    });

    audio.addEventListener("loadedmetadata", function() {
      durationDisplay.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("timeupdate", function() {
      currentTimeDisplay.textContent = formatTime(audio.currentTime);
      updateProgressBar();
    });

    volumeSlider.addEventListener("input", function() {
      audio.volume = volumeSlider.value;
    });

    progressBar.addEventListener("input", function() {
      audio.currentTime = progressBar.value * audio.duration / 100;
    });

    function formatTime(time) {
      let minutes = Math.floor(time / 60);
      let seconds = Math.floor(time % 60);
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return minutes + ":" + seconds;
    }

    function updateProgressBar() {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.value = progress;
      progressBar.style.setProperty('--progress-value', `${progress}%`);
    }




    