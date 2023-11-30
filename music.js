var song1 = document.getElementById("song1");
var song2 = document.getElementById("song2");
var song3 = document.getElementById("song3");
var song4 = document.getElementById("song4");
var song5 = document.getElementById("song5");
var song6 = document.getElementById("song6");
var song7 = document.getElementById("song7");
var song8 = document.getElementById("song8");
var song9 = document.getElementById("song9");
var song10 = document.getElementById("song10");

var songs = [song1, song2, song3, song4, song5, song6, song7, song8, song9, song10];
var myMusic;

function sound(audioElement, onEndedCallback) {
  this.audioElement = audioElement;

  // Set the callback function
  this.audioElement.onended = onEndedCallback;

  this.play = function(){
    this.audioElement.play();
  }
  this.stop = function(){
    this.audioElement.pause();
  }
}

function startMusic() {
  // Randomly pick a song from the array
  var randomIndex = Math.floor(Math.random() * songs.length);
  var randomSong = songs[randomIndex];
  
  // Set the onEndedCallback to play the next random song
  var onEndedCallback = function() {
    startMusic();
  };
  
  // Create the sound object for the picked song with the onEndedCallback
  myMusic = new sound(randomSong, onEndedCallback);
  myMusic.play();
}