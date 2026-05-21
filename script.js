let time = 25 * 60;
let totalTime = 25 * 60;

let interval = null;

let running = false;

let isBreak = false;

let sessions =
  parseInt(
    localStorage.getItem("sessions")
  ) || 0;

let studyMinutes =
  parseInt(
    localStorage.getItem("studyMinutes")
  ) || 0;

const timerEl =
  document.getElementById("timer");

const sessionsEl =
  document.getElementById("sessions");

const studyTimeEl =
  document.getElementById("studyTime");

const modeEl =
  document.getElementById("mode");

const progressBar =
  document.getElementById("progress-bar");

const minutesInput =
  document.getElementById("minutes");

const breakInput =
  document.getElementById("breakMinutes");

const bellSound =
  document.getElementById("bellSound");

const taskInput =
  document.getElementById("taskInput");

const taskList =
  document.getElementById("taskList");


let tasks = [];
  JSON.parse(
    localStorage.getItem("tasks")
  ) || [];

if (
  localStorage.getItem("darkMode") === "on"
) {

  document.body.classList.add("dark");
}

sessionsEl.innerText =
  "Completed Sessions: " + sessions;

studyTimeEl.innerText =
  "Total Study Today: " +
  studyMinutes +
  " min";

updateTimerDisplay();

updateProgressBar();

function startTimer() {

  if (running) return;

  running = true;

  isBreak = false;

  modeEl.innerText =
    "Study Mode";

  time =
    Math.max(
      1,
      parseInt(minutesInput.value) || 25
    ) * 60;

  totalTime = time;

  updateTimerDisplay();

  startCountdown();
}

function startCountdown() {

  clearInterval(interval);

  interval = setInterval(() => {

    time--;

    updateTimerDisplay();

    updateProgressBar();

    if (time <= 0) {

bellSound.currentTime = 0;

bellSound.play()
  .then(() => {

    console.log("Sound played");

  })
  .catch(error => {

    console.log(error);

  });
      clearInterval(interval);

      running = false;

      if (!isBreak) {

        sessions++;

        studyMinutes +=
          parseInt(minutesInput.value) || 25;

        localStorage.setItem(
          "sessions",
          sessions
        );

        localStorage.setItem(
          "studyMinutes",
          studyMinutes
        );

        sessionsEl.innerText =
          "Completed Sessions: " +
          sessions;

        studyTimeEl.innerText =
          "Total Study Today: " +
          studyMinutes +
          " min";

        startBreak();

      } else {

        startStudy();
      }
    }

  }, 1000);
}

function startBreak() {

  isBreak = true;

  modeEl.innerText =
    "Break Mode";

  time =
    Math.max(
      1,
      parseInt(breakInput.value) || 5
    ) * 60;

  totalTime = time;

  running = true;

  updateTimerDisplay();

  startCountdown();
}

function startStudy() {

  isBreak = false;

  modeEl.innerText =
    "Study Mode";

  time =
    Math.max(
      1,
      parseInt(minutesInput.value) || 25
    ) * 60;

  totalTime = time;

  running = true;

  updateTimerDisplay();

  startCountdown();
}

function pauseTimer() {

  clearInterval(interval);

  running = false;
}

function resetTimer() {

  clearInterval(interval);

  running = false;

  isBreak = false;

  modeEl.innerText =
    "Study Mode";

  time =
    Math.max(
      1,
      parseInt(minutesInput.value) || 25
    ) * 60;

  totalTime = time;

  updateTimerDisplay();

  updateProgressBar();
}

function toggleDarkMode() {

  document.body.classList.toggle("dark");

  if (
    document.body.classList.contains("dark")
  ) {

    localStorage.setItem(
      "darkMode",
      "on"
    );

  } else {

    localStorage.setItem(
      "darkMode",
      "off"
    );
  }
}

function updateTimerDisplay() {

  let minutes =
    Math.floor(time / 60);

  let seconds =
    time % 60;

  minutes =
    String(minutes).padStart(2, "0");

  seconds =
    String(seconds).padStart(2, "0");

  timerEl.innerText =
    minutes + ":" + seconds;
}

function updateProgressBar() {

  let percent =
    Math.max(
      0,
      (time / totalTime) * 100
    );

  progressBar.style.width =
    percent + "%";
}

function renderTasks() {

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {

    const li =
      document.createElement("li");

    li.style.margin = "10px";

const text =
  document.createElement("span");

text.innerText =
  task.text;

if (task.completed) {

  text.style.textDecoration =
    "line-through";

  text.style.opacity = "0.6";
}

    const button =
      document.createElement("button");

    button.innerText = "X";

    button.onclick = function () {

      deleteTask(index);
    };

const completeButton =
  document.createElement("button");

completeButton.innerText = "✓";

completeButton.onclick = function () {

  toggleTask(index);
};

li.appendChild(completeButton);

    li.appendChild(text);

const button =
  document.createElement("button");
    li.appendChild(button);

    taskList.appendChild(li);
  });
}

function addTask() {

  const task =
    taskInput.value.trim();

  if (task === "") return;

tasks.push({

  text: task,

  completed: false
});

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  taskInput.value = "";

function toggleTask(index) {

  tasks[index].completed =
    !tasks[index].completed;

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  renderTasks();
}


  renderTasks();
}

function deleteTask(index) {

  tasks.splice(index, 1);

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  renderTasks();
}

renderTasks();

}

function deleteTask(index) {

  tasks.splice(index, 1);

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  renderTasks();
}

renderTasks();
