
const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];
let entries = JSON.parse(localStorage.getItem("trackerEntries")) || {};
let goals = JSON.parse(localStorage.getItem("macroGoals")) || {};

function createMealSections() {
  const container = document.getElementById("mealSections");
  meals.forEach(meal => {
    const section = document.createElement("div");
    section.innerHTML = `
      <h3>${meal}</h3>
      <input placeholder="Food name" id="${meal}-name" />
      <input placeholder="Calories" type="number" id="${meal}-cal" />
      <input placeholder="Protein" type="number" id="${meal}-pro" />
      <input placeholder="Carbs" type="number" id="${meal}-carb" />
      <input placeholder="Fats" type="number" id="${meal}-fat" />
      <button onclick="addMeal('${meal}')">Add</button>
      <ul id="${meal}-list"></ul>
    `;
    container.appendChild(section);
  });
  loadEntries();
  updateSummary();
}

function addMeal(meal) {
  const name = document.getElementById(`${meal}-name`).value;
  const cal = +document.getElementById(`${meal}-cal`).value;
  const pro = +document.getElementById(`${meal}-pro`).value;
  const carb = +document.getElementById(`${meal}-carb`).value;
  const fat = +document.getElementById(`${meal}-fat`).value;

  if (!entries[meal]) entries[meal] = [];
  entries[meal].push({ name, cal, pro, carb, fat });
  localStorage.setItem("trackerEntries", JSON.stringify(entries));
  loadEntries();
  updateSummary();
}

function loadEntries() {
  meals.forEach(meal => {
    const list = document.getElementById(`${meal}-list`);
    list.innerHTML = "";
    if (entries[meal]) {
      entries[meal].forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name}: ${item.cal} cal, ${item.pro}P / ${item.carb}C / ${item.fat}F`;
        list.appendChild(li);
      });
    }
  });
}

function updateSummary() {
  let totalCal = 0, totalPro = 0, totalCarb = 0, totalFat = 0;
  Object.values(entries).flat().forEach(item => {
    totalCal += item.cal;
    totalPro += item.pro;
    totalCarb += item.carb;
    totalFat += item.fat;
  });
  document.getElementById("totalCalories").textContent = totalCal;
  document.getElementById("totalProtein").textContent = totalPro;
  document.getElementById("totalCarbs").textContent = totalCarb;
  document.getElementById("totalFats").textContent = totalFat;
}

function saveGoals() {
  goals = {
    cal: +document.getElementById("goalCalories").value,
    pro: +document.getElementById("goalProtein").value,
    carb: +document.getElementById("goalCarbs").value,
    fat: +document.getElementById("goalFats").value
  };
  localStorage.setItem("macroGoals", JSON.stringify(goals));
}

function resetDay() {
  entries = {};
  localStorage.removeItem("trackerEntries");
  loadEntries();
  updateSummary();
}

document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

createMealSections();
