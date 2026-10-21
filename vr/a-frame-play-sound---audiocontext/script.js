document.addEventListener("DOMContentLoaded", function () {
  const startscreen = document.getElementById("start-screen");
  const playButton = document.getElementById("play-btn");
  var scene = document.getElementById("myScene");
  // Create the AudioContext
  const audioContext = THREE.AudioContext.getContext();

  // Function to resume the AudioContext
  function resumeAudioContext() {
    if (audioContext.state === "suspended") {
      audioContext.resume().then(() => {
        console.log("AudioContext resumed");
        // Play the sound after the AudioContext is resumed
        document.querySelector("a-sound").components.sound.playSound();
      });
    } else {
      // Play the sound if the AudioContext is already running
      document.querySelector("a-sound").components.sound.playSound();
    }
  }

  // Add event listener to the play button
  playButton.addEventListener("click", function () {
    startscreen.style.display = "none";
    scene.style.display = "block";

    resumeAudioContext();
    console.log("press");
  });
});
