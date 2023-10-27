import { useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
function App() {
  const cities = ["paris", "kyoto", "hawaii", "new york"];
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const getCurrentLocation = () => {
    return navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      fetchData(lat, lon);
    });
  };

  const fetchData = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ae9c3b9ec9dd73a7ac8bf677efc9071d&units=metric`;
    let res = await fetch(url);
    let data = await res.json();
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ae9c3b9ec9dd73a7ac8bf677efc9071d&units=metric`;
    let res = await fetch(url);
    let data = await res.json();
    setWeather(data);
  };
  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);
  // useEffect(()=>{
  //   getWeatherByCity();
  // },[city] )
  // useEffect(()=>{
  //   getCurrentLocation();
  // },[] )
  return (
    <div>
      <div className="container">
        {loading ? (
          <div>
            <h1>loading...</h1>
            <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
              <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
            </div>
          </div>
        ) : (
          <div>
            <WeatherBox weather={weather} />
            <WeatherButton cities={cities} setCity={setCity} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
