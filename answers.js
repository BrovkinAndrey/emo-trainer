const container = document.querySelector(".container");
const restartBtn = document.querySelector(".restart-btn");

const data = JSON.parse(localStorage.getItem("quizResults"));

const resultIcons = {
  right: `<svg class="result-icon" width="73" height="68" viewBox="0 0 73 68" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.3871 65.515L1.6931 26.2998C1.39794 25.8964 1.44596 25.337 1.80553 24.9898L14.8533 12.392C15.2894 11.9709 15.9969 12.0317 16.3549 12.5209L29.8851 31.0122C30.2805 31.5525 31.0847 31.5593 31.4891 31.0258L53.5713 1.89603C53.906 1.4546 54.5357 1.36929 54.9757 1.70577L70.385 13.4894C70.8232 13.8245 70.9073 14.451 70.573 14.8898L31.9896 65.5305C31.5845 66.0622 30.7819 66.0544 30.3871 65.515Z" fill="#31A41C" stroke="black" stroke-width="3"/>
</svg>`,
  wrong: `<svg class="result-icon" width="71" height="72" viewBox="0 0 71 72" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.9595 36.7533L1.77463 54.8671C1.40157 55.2603 1.40971 55.8792 1.79299 56.2625L14.8788 69.3483C15.2764 69.7459 15.9236 69.7376 16.3109 69.3299L33.9063 50.8084C34.2902 50.4043 34.9306 50.3921 35.3296 50.7814L54.3972 69.384C54.7891 69.7663 55.4156 69.7624 55.8027 69.3753L68.8971 56.2808C69.2877 55.8903 69.2877 55.2571 68.8971 54.8666L50.8025 36.7719C50.4154 36.3849 50.4115 35.7586 50.7936 35.3667L68.9265 16.7688C69.304 16.3817 69.3053 15.7645 68.9295 15.3757L55.8111 1.80501C55.4227 1.40316 54.7803 1.39771 54.3851 1.79292L35.3114 20.8666C34.9208 21.2571 34.2877 21.2571 33.8971 20.8666L16.2866 3.25603C15.9058 2.87533 15.2921 2.86438 14.898 3.23125L1.83377 15.3945C1.43049 15.77 1.40693 16.401 1.78109 16.8055L18.9681 35.386C19.326 35.7729 19.3222 36.371 18.9595 36.7533Z" fill="#C30000" stroke="black" stroke-width="3"/>
</svg>`,
};

const colorizeVowels = (text) =>
  text.replace(/[аеёиоуЫэюя]/gi, (v) => `<span class="vowel">${v}</span>`);

const table = document.createElement("table");
table.classList.add("result-table");

const thead = document.createElement("thead");

const tr = document.createElement("tr");
tr.innerHTML = `
  <th>#</th>
  <th>${colorizeVowels("КАРТИНКА")}</th>
  <th>${colorizeVowels("ПРАВИЛЬНЫЙ ОТВЕТ")}</th>
  <th>${colorizeVowels("ТВОЙ ОТВЕТ")}</th>
  <th>${colorizeVowels("РЕЗУЛЬТАТ")}</th>
`;

const tbody = document.createElement("tbody");

data.forEach((row, i) => {
  const tr = document.createElement("tr");
  const taskWord = colorizeVowels(row.taskWord.toUpperCase());
  const userWord = colorizeVowels(row.userWord.toUpperCase());
  const result =
    row.taskWord.toUpperCase() === row.userWord.toUpperCase()
      ? "right"
      : "wrong";

  tr.innerHTML = `
    <td>${i + 1}</td>
    <td><img src="${row.img}" alt="" class="table-img"></td>
    <td>${taskWord}</td>
    <td>${userWord}</td>
    <td>${resultIcons[result]}</td>
  `;
  tbody.appendChild(tr);
});

thead.appendChild(tr);
table.appendChild(thead);
table.appendChild(tbody);
container.appendChild(table);

restartBtn.addEventListener("click", () => {
  localStorage.removeItem("quizResults");

  window.location.href = "index.html";
});
