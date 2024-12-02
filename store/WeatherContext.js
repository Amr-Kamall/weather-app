import { createContext, useContext, useEffect, useState } from "react";

const WeatherContext = createContext();
const API_KEY = "de26a555a0514f57997152428240212";

function WeatherProvider({ children, updateLoading }) {
  const [locations, setLocations] = useState([]); //list search
  const [currentWeather, setCurrentWeather] = useState({}); //current weather

  // search data api
  async function getSearchData(city) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${city}`
      );
      const locationData = await response.json();
      // console.log(locationData);
      setLocations(locationData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // weather data api
  async function getWeatherData(city) {
    try {
      updateLoading(true);
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=8&aqi=no&alerts=no`
      );
      const data = await response.json();
      setCurrentWeather({
        humidity: data.current.humidity, //الرطوبه
        windSpeed: data.current.wind_kph,
        temperature: Math.floor(data.current.temp_c),
        locationName: data.location.name,
        locationCountry: data.location.country,
        icon: data.current.condition.icon,
        time: data.location.localtime,
        condition: data.current.condition.text, // حاله الطقس
        forecastDays: data.forecast.forecastday.slice(1),
      });
      updateLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(function () {
    getWeatherData("London");
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        locations,
        setLocations,
        currentWeather,
        setCurrentWeather,
        getSearchData,
        getWeatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

function useWeather() {
  //create our custom hook to use the context in every place
  const context = useContext(WeatherContext);
  if (context === undefined)
    throw new Error("Weather context was used outside the WeatherProvider");
  return context;
}

export { WeatherProvider, useWeather };
