const answerForm = document.querySelector(".answer-form");
const input = document.getElementById("task-input");
const submitBtn = document.querySelector(".submit-task");
const taskImage = document.getElementById("task-image");
const taskWord = document.getElementById("task-word");
const pageBtns = document.querySelectorAll(".btn-page");
const restartBtn = document.querySelector(".restart-btn");

const originalData = [
  { img: "./images/1.png", taskWord: "Зелень", userWord: "" },
  { img: "./images/2.png", taskWord: "Ашан", userWord: "" },
  { img: "./images/3.png", taskWord: "Тюмень", userWord: "" },
  { img: "./images/4.png", taskWord: "Каток", userWord: "" },
  { img: "./images/5.png", taskWord: "Каток", userWord: "" },
];

function shuffle(array) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

let data = shuffle(originalData);

let currentIndex = 0;
const countQuestion = data.length;
renderQuestion();

function updateButtonState() {
  const isEmpty = input.value.trim() === "";
  submitBtn.disabled = isEmpty;
}

input.addEventListener("input", updateButtonState);
input.addEventListener("change", updateButtonState);

function saveAnswer() {
  data[currentIndex].userWord = input.value.trim();
}

function renderQuestion() {
  if (currentIndex >= countQuestion) {
    console.table(data);
    return;
  }

  const currentTask = data[currentIndex];

  taskImage.src = currentTask.img;
  taskImage.alt = currentTask.taskWord;

  taskWord.textContent = currentTask.taskWord;

  pageBtns[currentIndex].classList.add("btn-active");

  input.value = "";
  input.focus();

  updateButtonState();
}

function showResults() {
  localStorage.setItem("quizResults", JSON.stringify(data));

  window.location.href = "answers.html";
}

function nextNotAnswered() {
  currentIndex = [...pageBtns].findIndex(
    (btn) => !btn.classList.contains("btn-answered"),
  );
  if (currentIndex >= countQuestion) {
    showResults();
  }
}

answerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (submitBtn.disabled) return;

  saveAnswer();
  pageBtns[currentIndex].classList.remove("btn-active");
  pageBtns[currentIndex].classList.add("btn-answered");

  nextNotAnswered();
  renderQuestion();
});

pageBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    pageBtns[currentIndex].classList.remove("btn-active");
    currentIndex = i;
    if (currentIndex >= countQuestion) {
      showResults();
    }
    renderQuestion();
  });
});

function restartTest() {
  data.forEach((item) => {
    item.user = "";
  });

  currentIndex = 0;

  pageBtns.forEach((btn) => {
    btn.classList.remove("btn-answered");
    btn.classList.remove("btn-active");
  });

  data = shuffle(originalData);
  renderQuestion();
}

restartBtn.addEventListener("click", restartTest);
