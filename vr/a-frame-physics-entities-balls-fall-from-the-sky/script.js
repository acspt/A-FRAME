let container = document.querySelector("#container");
let colors = ["red", "orange", "yellow", "green", "blue", "purple", "hotpink"];

function addBall() {
  let x = Math.random() * 10 - 5;
  let y = Math.random() * 100 + 50;
  let z = Math.random() * -10;
  container.innerHTML += `<a-sphere dynamic-body position="${x} ${y} ${z}" radius="0.5" color="${
    colors[Math.floor(Math.random() * colors.length)]
  }" mass="0.5"></a-sphere>`;
}
function run() {
  for (let i = 0; i < 100; i++) {
    addBall();
  }
}

// Delay execution of myFunction by 10 seconds (10,000 milliseconds)
setTimeout(run, 10000);
