
document.addEventListener('DOMContentLoaded', (event) => {
  console.log("yo");
  // Fetch song elements now that the DOM is fully loaded
  const songs = [
    document.getElementById("song1"),
    document.getElementById("song2"),
    document.getElementById("song3"),
    document.getElementById("song4"),
    document.getElementById("song5"),
    document.getElementById("song6"),
    document.getElementById("song7"),
    document.getElementById("song8"),
    document.getElementById("song9"),
    document.getElementById("song10")
  ];
  
  let myMusic;
  let isMusicPlaying = false;
  const volumeSlider = document.getElementById('volumeSlider');
  const audioElements = document.querySelectorAll('audio');

  function updateToggleIcon() {
    const toggleIcon = document.getElementById("toggleIcon");
    toggleIcon.textContent = isMusicPlaying ? '✓' : '✗'; 
  }

  function sound(audioElement, onEndedCallback) {
    this.audioElement = audioElement;
    this.audioElement.onended = onEndedCallback;
    this.play = function(){
      this.audioElement.play();
    };
    this.stop = function(){
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    };
  }
  function setVolume() {
    const volume = volumeSlider.value;
    audioElements.forEach(audio => {
        audio.volume = volume;
    });
  }
  volumeSlider.addEventListener('input', setVolume);
  window.addEventListener('DOMContentLoaded', (event) => {
    setVolume();
});




  function startMusic() {
    if (myMusic) {
      myMusic.stop();
    }

    const randomIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[randomIndex];
    const onEndedCallback = function() {
      startMusic(); // Calls startMusic again to create a continuous loop of music
    };
    myMusic = new sound(randomSong, onEndedCallback);
    myMusic.play();
    isMusicPlaying = true; // Update the isMusicPlaying to true now that music is playing
    updateToggleIcon(); // Update the toggle icon to match the current state
  }

  function toggleMusic() {
    if (isMusicPlaying) {
      if (myMusic) myMusic.stop();
      isMusicPlaying = false;
    } else {
      startMusic(); // startMusic will be called only when toggleMusic is invoked
    }
    updateToggleIcon();
  }

  const toggleButton = document.getElementById("toggleButton");
  toggleButton.addEventListener('click', toggleMusic);

  updateToggleIcon();
  window.startMusic = startMusic; // Make startMusic available globally if needed.
});



