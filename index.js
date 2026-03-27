// to get the actual country name
let cityName = document.querySelector(".weather_city");
let datetime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_temperature = document.querySelector(".weather_temperature");
let w_icon = document.querySelector(".weather_icon");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let w_humdity = document.querySelector(".weather_humidity");
let w_wind= document.querySelector(".weather_wind");
let w_feelsLike= document.querySelector(".weather_feelsLike");
let w_pressure= document.querySelector(".weather_pressure");
let city_search = document.querySelector(".weather_search");
// to get the date and time

//to get the country name 
const getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

//to get the date and time
const gettime  = (dt) => 
{
  const curdate = new Date(dt * 1000);
  console.log(curdate);

  const option = {
    weekly : "long",
    year: "numeric",
    month:"long",
    day:"numeric",
    hour:"numeric",
    minutes:"numeric"
  };

  const formatter  = new Intl.DateTimeFormat("en-US" , option);

  return formatter.format(curdate);
}



// search functionality
  let city = "london";
  city_search.addEventListener('submit' , (e) =>
  {
    e.preventDefault();

    let cityName = document.querySelector(".city_name");
    console.log(cityName.value); 
    city = cityName.value;
    getWeatherData();
    cityName.value = "";
  });

//define the getWeather function here
const getWeatherData = async () => {
  
  try{


    const weatherApi = "d779d68ab4d0ac851893cb60b0c6c2d7"; 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApi}`;
    const res =  await fetch(weatherUrl);
    const data = await res.json();
    console.log(data);

    const {main , name , weather , wind , sys , dt} = data;

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" />`;

    cityName.innerHTML = `${name} , ${getCountryName(sys.country)}`;
    datetime.innerHTML = gettime(dt);
    w_temperature.innerHTML =`${main.temp}&#176`;
    w_minTem.innerHTML = `min: ${main.temp_min.toFixed()}&#176`;
    w_maxTem.innerHTML = `max: ${main.temp_max.toFixed()}&#176`;
    w_humdity.innerHTML = `${main.humidity}&#176`;
    w_wind.innerHTML = `${wind.deg}/${wind.speed}ms `;
    w_feelsLike.innerHTML = `${main.feels_like}&#176`;
    w_pressure.innerHTML = `${main.pressure}`
  }

  catch (error) {
    console.log(error);
  }
};

getWeatherData();

document.body.addEventListener("load", getWeatherData());
