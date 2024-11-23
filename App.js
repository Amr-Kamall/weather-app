import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import Loading from "./components/Loading";
import Forecast from "./components/Forecast";
import NextForecast from "./components/NextForecast";

//make fog image to weather
export default function App() {
  const [locations, setLocations] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  // icon ~~ weather state text ~~ forecast

  // weather data api
  async function getWeatherData(city) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=f7b444cfa99e4757bdb205128242011&q=${city}&days=7&aqi=no&alerts=no`
      );
      const data = await response.json();
      setWeatherData({
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        temperature: Math.floor(data.current.temp_c),
        locationName: data.location.name,
        locationCountry: data.location.country,
        icon: data.current.condition.icon,
        time: data.location.localtime.split(" ")[1],
        condition: data.current.condition.text,
        forecastDays: data.forecast.forecastday,
      });
      // console.log(weatherData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // search data api
  async function getSearchData(city) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=f7b444cfa99e4757bdb205128242011&q=${city}`
      );
      const locationData = await response.json();
      setLocations(locationData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(function () {
    getWeatherData("London");
  }, []);
  return (
    <View style={styles.appContainer}>
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        style={styles.backgroundImage}
        source={require("./assets/images/bg.png")}
      />
      {loading ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.safeAreaView}>
          {/* search section */}
          <Search
            locations={locations}
            setLocations={setLocations}
            getSearchData={getSearchData}
            getWeatherData={getWeatherData}
          />
          {/* forecast section */}
          <Forecast weatherData={weatherData} />
          {/* forecast for next days */}
          <NextForecast weatherData={weatherData} />
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    marginHorizontal: 10,
  },
  appContainer: {
    flex: 1,
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 0, // Keep background layer lowest
  },
});
