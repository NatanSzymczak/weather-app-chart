// Insert your API key:
const APIKey = ``;

const func = cityName => cityName.split(' ').join('+');

export const getCurrentWeather = city => {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${func(city)}&appid=${APIKey}&units=metric`);
}

export const getWeatherForFiveDays = city => {
  return fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${func(city)}&appid=${APIKey}&units=metric`);
}