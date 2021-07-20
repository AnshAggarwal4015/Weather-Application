const api = {
  key: "a3808026cac0331156fed5f1d9bb8a15",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

let now = new Date();
  let date = document.querySelector('.date');
  const data=dateBuilder(now);
  date.innerText = data;

function setQuery(evt) {
  console.log(1);
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  console.log(weather)
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  const body= document.querySelector('body');
  if(weather.weather[0].main==="Haze"){
    body.style.backgroundImage="url('bg.jpg')";
  }else if(weather.weather[0].main==="Clear"){
    body.style.backgroundImage="url('clear.jpg')";
  }else if(weather.weather[0].main==="Clouds"){
    body.style.backgroundImage="url('cloud.jpg')";
  }else if(weather.weather[0].main==="Sunny"){
    body.style.backgroundImage="url('sunny.jpg')";
  }

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${weather.main.temp_min}°c / ${weather.main.temp_max}°c`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}