// Timer variables
let time = 25 * 60;
let totalTime = 25 * 60;
let interval = null;
let running = false;
let isBreak = false;

// Stats from localStorage
let sessions = parseInt(localStorage.getItem("sessions")) || 0;
let studyMinutes = parseInt(localStorage.getItem("studyMinutes")) || 0;

// DOM elements
const timerEl = document.getElementById("timer");
const sessionsEl = document.getElementById("sessions");
const studyTimeEl = document.getElementById("studyTime");
const modeEl = document.getElementById("mode");
const progressBar = document.getElementById("progress-bar");
const minutesInput = document.getElementById("minutes");
const breakInput = document.getElementById("breakMinutes");
const bellSound = document.getElementById("bellSound");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Tasks array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ---------- Dark mode init ----------
if (localStorage.getItem("darkMode") === "on") {
  document.body.classList.add("dark");
}

// Update UI with saved stats
sessionsEl.innerText = "Completed Sessions: " + sessions;
studyTimeEl.innerText = "Total Study Today: " + studyMinutes + " min";
updateTimerDisplay();
updateProgressBar();

// ---------- Timer functions ----------
function updateTimerDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");
  timerEl.innerText = minutes + ":" + seconds;
}

function updateProgressBar() {
  if (totalTime <= 0) return;
  let percent = (time / totalTime) * 100;
  progressBar.style.width = Math.max(0, percent) + "%";
}

function playBell() {
  if (!bellSound) return;
  bellSound.currentTime = 0;
  bellSound.play().catch(e => console.log("Bell error:", e));
}

function startCountdown() {
  clearInterval(interval);
  interval = setInterval(() => {
    if (!running) return;
    if (time <= 0) {
      clearInterval(interval);
      running = false;
      playBell();

      if (!isBreak) {
        // Study session completed
        sessions++;
        let studyMins = parseInt(minutesInput.value) || 25;
        studyMinutes += studyMins;
        localStorage.setItem("sessions", sessions);
        localStorage.setItem("studyMinutes", studyMinutes);
        sessionsEl.innerText = "Completed Sessions: " + sessions;
        studyTimeEl.innerText = "Total Study Today: " + studyMinutes + " min";
        startBreak();
      } else {
        startStudy();
      }
      return;
    }
    time--;
    updateTimerDisplay();
    updateProgressBar();
  }, 1000);
}

function startTimer() {
  if (running) return;
  running = true;
  isBreak = false;
  modeEl.innerText = "Study Mode";
  let mins = parseInt(minutesInput.value) || 25;
  if (mins < 1) mins = 1;
  time = mins * 60;
  totalTime = time;
  updateTimerDisplay();
  updateProgressBar();
  startCountdown();
}

function startBreak() {
  isBreak = true;
  modeEl.innerText = "Break Mode";
  let mins = parseInt(breakInput.value) || 5;
  if (mins < 1) mins = 1;
  time = mins * 60;
  totalTime = time;
  running = true;
  updateTimerDisplay();
  updateProgressBar();
  startCountdown();
}

function startStudy() {
  isBreak = false;
  modeEl.innerText = "Study Mode";
  let mins = parseInt(minutesInput.value) || 25;
  if (mins < 1) mins = 1;
  time = mins * 60;
  totalTime = time;
  running = true;
  updateTimerDisplay();
  updateProgressBar();
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
  modeEl.innerText = "Study Mode";
  let mins = parseInt(minutesInput.value) || 25;
  if (mins < 1) mins = 1;
  time = mins * 60;
  totalTime = time;
  updateTimerDisplay();
  updateProgressBar();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "on");
  } else {
    localStorage.setItem("darkMode", "off");
  }
}

// ---------- Tasks (fully fixed) ----------
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.margin = "8px 0";
    li.style.padding = "8px 12px";
    li.style.background = document.body.classList.contains("dark") ? "#1e293b" : "#f1f5f9";
    li.style.borderRadius = "40px";

    const textSpan = document.createElement("span");
    textSpan.innerText = task;
    textSpan.style.flex = "1";
    textSpan.style.textAlign = "left";

    const button = document.createElement("button");
    button.innerText = "X";
    button.style.background = "none";
    button.style.border = "none";
    button.style.fontSize = "1.2rem";
    button.style.fontWeight = "bold";
    button.style.color = "#ef4444";
    button.style.cursor = "pointer";
    button.onclick = () => deleteTask(index);

    li.appendChild(textSpan);
    li.appendChild(button);
    taskList.appendChild(li);
  });
}

function addTask() {
  const task = taskInput.value.trim();
  if (task === "") return;
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Initial render
renderTasks();
