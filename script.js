let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let humid = document.getElementById("humidity");
let iconfile;
const time = new Date();
var dd = String(time.getDate());
var mm = String(time.getMonth() + 1).padStart(2, '0');
var yyyy = time.getFullYear();
const array = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const format = document.querySelector(".time");
format.innerHTML = time.getHours() + ' : ' + time.getHours() + '-' +
array[time.getDay()] + ' ' + dd + ',' + mm + ' ' + yyyy;
const searchInput = document.querySelector(".search-input");
const searchButton = document.getElementById("search-button");
searchButton.addEventListener('click', (e) => {
 e.preventDefault();
getWeather(searchInput.value);
 searchInput.value = '';
});
const getWeather = async(city) => {
 try {
 const response = await
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bde9560
95243873d7a1f245bc19d22e4`,
 { mode: 'cors' }
 );
 const weatherData = await response.json();
 console.log(weatherData);
 const { name } = weatherData;
 const { feels_like } = weatherData.main;
 const { icon, description } = weatherData.weather[0];
 const { humidity } = weatherData.main
 document.querySelector(".icon").src =
 "https://openweathermap.org/img/wn/" + icon + ".png";
 loc.textContent = name;
 climate.textContent = description;
 tempvalue.textContent = Math.round(feels_like - 273) + "°C";
 humid.textContent = "humidity : " +
 humidity;
 dayData(name, feels_like);
 } catch (error) {
 alert('city not found');
 }
};
window.addEventListener("load", () => {
 let long;
let lat;
if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition((position) => {
 long = position.coords.longitude;
 lat = position.coords.latitude;
 const proxy = "https://cors-anywhere.herokuapp.com/";
 const api = "https://api.openweathermap.org/data/2.5/weather?lat="
+ lat.toFixed(2) + "&lon=" + long.toFixed(2) +
"&appid=bde956095243873d7a1f245bc19d22e4";
 fetch(api).then((response) => {
 return response.json();
 })
 .then(data => {
 const { name } = data;
 const { feels_like } = data.main;
 const { icon, description } = data.weather[0];
 const { humidity } = data.main
 loc.textContent = name;
 climate.textContent = description;
 tempvalue.textContent = Math.round(feels_like - 273) +
"°C";
 humid.textContent = "humidity : " +
 humidity;
 document.querySelector(".icon").src =
 "https://openweathermap.org/img/wn/" + icon + ".png";
 dayData(name, feels_like);
 })
 })
 }
})
function dayData(city, current_temp) {
 fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city +
"&appid=bde956095243873d7a1f245bc19d22e4")
 .then(response => response.json())
 .then(data => {
 for (i = 0; i < 7; i++) {
 const icon = data.list[i].weather[0].icon;
 document.getElementById("temp-day" + (i + 1)).textContent =
Math.round(data.list[i].main.feels_like - 273) + "°C"
 document.getElementById("humid-day" + (i + 1)).innerHTML =
"Humidity:" + data.list[i].main.humidity
 document.getElementById("weather-day" + (i + 1)).innerHTML =
data.list[i].weather[0].description
 document.querySelector(".icon" + (i + 1)).src =
"https://openweathermap.org/img/wn/" + icon + ".png";
 }
 })
}
