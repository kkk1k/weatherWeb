import { useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";
function App() {
  const cities = ["paris", "kyoto", "hawaii", "new york"];
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiError, setAPIError] = useState("");
  const getCurrentLocation = () => {
    return navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      fetchData(lat, lon);
    });
  };

  const fetchData = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ae9c3b9ec9dd73a7ac8bf677efc9071d&units=metric`;
      setLoading(true);
      let res = await fetch(url);
      let data = await res.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ae9c3b9ec9dd73a7ac8bf677efc9071d&units=metric`;
    setLoading(true);
    let res = await fetch(url);
    let data = await res.json();
    setWeather(data);
    setLoading(false);
  };
  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      <div className="container">
        {loading ? (
          <ClipLoader
            color="#f88c6b"
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : !apiError ? (  
          <div>
            <WeatherBox weather={weather} />
            <WeatherButton cities={cities} setCity={setCity} />
          </div>
        ) : (
          apiError
        )}
      </div>
    </div>
  );
}

export default App;
