let time = 25;
let running = false;

function startTimer() {
  if (running) return;

  running = true;

  const interval = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = time;

    if (time <= 0) {
      clearInterval(interval);
      alert("Time's up!");
      running = false;
      time = 25;
    }
  }, 1000);
}



