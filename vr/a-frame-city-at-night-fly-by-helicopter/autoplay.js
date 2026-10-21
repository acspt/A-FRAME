document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.getElementById("play-btn");
  // Create the AudioContext
  const audioContext = THREE.AudioContext.getContext();

  // Function to resume the AudioContext
  function resumeAudioContext() {
    if (audioContext.state === "suspended") {
      audioContext.resume().then(() => {
        console.log("AudioContext resumed");
        // Play the sound after the AudioContext is resumed
        playAllSounds();
      });
    } else {
      // Play the sound if the AudioContext is already running
      playAllSounds();
    }
  }

  // Add event listener to the play button
  playButton.addEventListener("click", function () {
    resumeAudioContext();
    console.log("press");
  });
});
function playAllSounds() {
  var entities = document.querySelectorAll(".autoplay");
  console.log("play all");
  entities.forEach(function (entity) {
    entity.components.sound.playSound();
  });
}
