import { apiKey } from "../components/envirnment";

//async function AsyncCityInput(city) {
//    //let currentWeather = {};
//    //let weatherForecast = {};
//
//    if (!fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey)) { return console.log("Invalid Input"); }
//    else {
//        const promise = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey);
//        const data = await promise.json();
//
//        // let cityLat = data[0].lat;
//        // let cityLon = data[0].lon;
//
//        // currentWeather = await AsyncGetCurrentWeather(cityLat, cityLon);
//        // weatherForecast = await Async5DayForcast(cityLat, cityLon);
//        // return [currentWeather, weatherForecast];
//
//        return [data[0].lat, data[0].lon];
//    }
//}

//async function AsyncGetCurrentWeather(lat, lon) {
//    const promise = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial");
//    const data = await promise.json();
//
//    return data;
//}
//
//async function Async5DayForcast(lat, lon) {
//    const promise = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial");
//    const data = await promise.json();
//
//    return data;
//}

async function AsyncGetCurrentWeather(city) {
    const promise = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial");
    const data = await promise.json();

    return data;
}

async function Async5DayForcast(city) {
    const promise = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial");
    const data = await promise.json();

    return data;
}


export { AsyncGetCurrentWeather, Async5DayForcast }