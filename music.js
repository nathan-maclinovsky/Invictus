
document.addEventListener('DOMContentLoaded', (event) => {
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
  let isMusicPlaying = true;
  const volumeSlider = document.getElementById('volumeSlider');

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

  function startMusic() {
    // Stops the previously playing song, if any.
    if (myMusic) {
      myMusic.stop();
    }

    const randomIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[randomIndex];
    const onEndedCallback = function() {
      startMusic();
    };
    myMusic = new sound(randomSong, onEndedCallback);
    myMusic.play();
    isMusicPlaying = true;
    updateToggleIcon();
  }
  volumeSlider.addEventListener('input', function() {
    const volume = this.value;
    songs.forEach(function(song) {
      song.volume = volume;
    });
  });

  function toggleMusic() {
    // Use the 'isMusicPlaying' state to toggle music on and off.
    if (isMusicPlaying) {
      if (myMusic) myMusic.stop();
      isMusicPlaying = false;
    } else {
      startMusic();
    }
    updateToggleIcon();
  }

  const toggleButton = document.getElementById("toggleButton");
  toggleButton.addEventListener('click', toggleMusic);

  // Set the initial state of the music and toggle icon.
  updateToggleIcon();
  window.startMusic = startMusic; // Make startMusic available globally if needed.
});



