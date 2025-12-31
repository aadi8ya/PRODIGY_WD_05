const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p:nth-child(1)");
const dateField = document.querySelector(".time_location p:nth-child(2)");
const weatherField = document.querySelector(".condition p:nth-child(2)");

const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener("submit", searchForLocation);

let target = "Mumbai";

const fetchResults = async (targetLocation) => {
  let url = `https://api.weatherapi.com/v1/current.json?key=4c998b36bb0145ee8aa181228251212&q=${targetLocation}&aqi=no`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);

  let locationName = data.location.name;
  let time = data.location.localtime;
  let temp = data.current.temp_c;
  let condition = data.current.condition.text;

  updateDetails(temp, locationName, time, condition);

  changeBackground(condition.toLowerCase());
};

function updateDetails(temp, locationName, time, condition) {
  let splitDate = time.split(" ")[0];
  let splitTime = time.split(" ")[1];

  let currentDay = getDayName(new Date(splitDate).getDay());

  temperatureField.innerText = temp + "°C";
  locationField.innerText = locationName;
  dateField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
  weatherField.innerText = condition;
}

function searchForLocation(e) {
  e.preventDefault();
  target = searchField.value;
  fetchResults(target);
}

fetchResults(target);

function getDayName(number) {
  switch (number) {
    case 0: return "Sunday";
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
  }
}



function changeBackground(condition) {
  const container = document.querySelector(".container");

  container.className = "container";

  if (condition.includes("wind")) {
    container.classList.add("wind");
  }
  else if (condition.includes("sunny") || condition.includes("clear")) {
    container.classList.add("sunny");
  }
  else if (condition.includes("cloud") || condition.includes("overcast") ) {
    container.classList.add("cloudy");
  }
  else if (condition.includes("mist") || condition.includes("fog") || condition.includes("haze")) {
    container.classList.add("mist");
  }
  else if (condition.includes("rain") ) {
    container.classList.add("rain");
  }
  else if (condition.includes("snow")) {
    container.classList.add("snow");
  }
  else {
    container.classList.add("clear");
  }
}

