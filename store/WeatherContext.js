// import { createContext, useContext } from "react";

// const WeatherContext = createContext();

// function WeatherProvider({ children }) {
//   const [locations, setLocations] = useState([]);
//   const [weatherData, setWeatherData] = useState({});
//   const [loading, setLoading] = useState(true);

//   // weather data api
//   async function getWeatherData(city) {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `https://api.weatherapi.com/v1/forecast.json?key=f7b444cfa99e4757bdb205128242011&q=${city}&days=7&aqi=no&alerts=no`
//       );
//       const data = await response.json();
//       setWeatherData({
//         humidity: data.current.humidity,
//         windSpeed: data.current.wind_kph,
//         temperature: Math.floor(data.current.temp_c),
//         locationName: data.location.name,
//         locationCountry: data.location.country,
//         icon: data.current.condition.icon,
//         time: data.location.localtime.split(" ")[1],
//         condition: data.current.condition.text,
//         forecastDays: data.forecast.forecastday,
//       });
//       // console.log(weatherData);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }
//   // search data api
//   async function getSearchData(city) {
//     try {
//       const response = await fetch(
//         `https://api.weatherapi.com/v1/search.json?key=f7b444cfa99e4757bdb205128242011&q=${city}`
//       );
//       const locationData = await response.json();
//       setLocations(locationData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }

//   function handleGetWeather(cityName) {
//     getWeatherData(cityName);
//     setOpenSearch(false);
//   }

//   useEffect(function () {
//     getWeatherData("London");
//   }, []);

//   return (
//     <WeatherContext.Provider
//       value={{
//         handleGetWeather,
//         locations,
//         weatherData,
//         loading,
//         getSearchData,
//       }}
//     >
//       {children}
//     </WeatherContext.Provider>
//   );
// }

// function useWeather() {
//   //create our custom hook to use the context in every place
//   const context = useContext(WeatherContext);
//   if (context === undefined)
//     throw new Error("Cities context was used outside the CitiesProvider ");
//   return context;
// }

// export { WeatherProvider, useWeather };
