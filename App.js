import { StatusBar } from "expo-status-bar";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, theme } from "./theme";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { weatherImages } from "./constants";
// import getWeatherData from "./api/weather";

export default function App() {
  const [openSearch, setOpenSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weatherData, setWeatherData] = useState({});

  // icon ~~ weather state text ~~ forecast

  // weather data api
  async function getWeatherData(city) {
    try {
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

  function handleSearch(value) {
    if (value.trim() === "") {
      setLocations([]); // Clear locations if the input is empty
      setWeatherData({}); // Optionally clear weather data
      return;
    }
    if (value.length > 2) {
      getSearchData(value);
    }
  }

  function handleGetWeather(cityName) {
    getWeatherData(cityName);
    setOpenSearch(false);
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);
  return (
    <View style={styles.appContainer}>
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        style={styles.backgroundImage}
        source={require("./assets/images/bg.png")}
      />
      <SafeAreaView style={styles.safeAreaView}>
        {/* search section */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            {openSearch && (
              <TextInput
                onChangeText={handleTextDebounce}
                placeholder="Search City"
                style={styles.searchInput}
                placeholderTextColor="white"
              />
            )}
            <TouchableOpacity
              onPress={() => setOpenSearch((open) => !open)}
              style={styles.searchIconContainer}
            >
              <Ionicons name="search" size={25} color="white" />
            </TouchableOpacity>
          </View>
          {locations?.length > 0 && openSearch && (
            <View style={styles.locationsContainer}>
              {locations?.map((loc, index) => (
                <TouchableOpacity
                  onPress={() => handleGetWeather(loc.name)}
                  key={index}
                  style={
                    index === locations?.length - 1
                      ? styles.location
                      : [styles.location, styles.locationBorder]
                  }
                >
                  <Ionicons name="location" size={24} color="gray" />
                  <Text style={styles.locationText}>
                    {loc.name},{loc.country}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {/* forecast section */}
        <View style={styles.forecast}>
          {/* location */}
          <Text style={styles.cityLocation}>
            {weatherData.locationCountry},
            <Text style={styles.capitalLocation}>
              {weatherData.locationName}
            </Text>
          </Text>
          {/* weather image */}
          <View style={styles.weatherImageContainer}>
            <Image
              style={styles.weatherImage}
              // icon of api is very bad so we will use our own icons
              source={weatherImages[weatherData.condition]}
            />
          </View>
          {/* degree celcius */}
          <View>
            <Text style={styles.weatherDegree}>
              {weatherData.temperature}&deg;
            </Text>
            <Text style={styles.weatherStatus}>{weatherData.condition}</Text>
          </View>
          {/* other stats */}
          <View style={styles.otherStats}>
            <View style={styles.otherState}>
              <Image
                style={styles.imageState}
                source={require("./assets/icons/wind.png")}
              />
              <Text style={styles.textState}>{weatherData.windSpeed}km</Text>
            </View>
            <View style={styles.otherState}>
              <Image
                style={styles.imageState}
                source={require("./assets/icons/drop.png")}
              />
              <Text style={styles.textState}>{weatherData.humidity}%</Text>
            </View>
            <View style={styles.otherState}>
              <Image
                style={styles.imageState}
                source={require("./assets/icons/sun.png")}
              />
              <Text style={styles.textState}>{weatherData.time} Am</Text>
            </View>
          </View>
        </View>
        {/* forecast for next days */}
        <View style={styles.nextForecast}>
          <View style={styles.forecastCalendar}>
            <Ionicons name="calendar-outline" color="white" size={20} />
            <Text style={styles.calendarText}>Daily forecast</Text>
          </View>
          <ScrollView horizontal contentContainerStyle={{ gap: 10 }}>
            {/* view */}
            {weatherData.forecastDays.map((item) => (
              <View style={styles.nextforecastDay}>
                <Image
                  style={styles.nextDayImage}
                  source={weatherImages[item.day.condition.text]}
                />
                <Text style={styles.nextDayDay}>
                  {" "}
                  {new Date(item.date).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </Text>
                <Text style={styles.nextDayDegree}>
                  {item.day.avgtemp_c}&deg;
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
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
  searchContainer: {
    height: "8%",
    marginTop: Platform.OS === "android" ? 40 : 0,
  },

  backgroundImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 0, // Keep background layer lowest
  },

  searchInputContainer: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  searchInput: {
    backgroundColor: theme.bgWhite(0.2),
    borderRadius: 25,
    padding: 12,
    paddingLeft: 25,
    paddingRight: 75,
    fontSize: 18,
    color: "white",
    flex: 1,
  },

  searchIconContainer: {
    backgroundColor: theme.bgWhite(0.2),
    width: 70,
    height: 50,
    borderRadius: 25, // Half of width and height to make circle
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
  },

  locationsContainer: {
    backgroundColor: colors.gray300,
    borderRadius: 20,
    position: "absolute",
    top: "100%", // Place it below the search input
    left: 10,
    right: 10,
    zIndex: 100000, // Ensure it appears above everything else
  },
  location: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    gap: 10,
  },
  locationBorder: {
    borderBottomWidth: 1.2,
    borderBottomColor: "black",
  },
  locationText: {
    fontSize: 18,
  },

  // forecast section
  forecast: {
    alignItems: "center",
    zIndex: 1, // Keep it below locationsContainer but above the background
    justifyContent: "space-around",
    marginVertical: 20,
  },
  cityLocation: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  capitalLocation: {
    color: colors.gray300,
    fontSize: 17,
  },
  weatherImageContainer: {
    height: 200,
    width: 200,
    marginVertical: 10,
  },
  weatherImage: {
    width: "100%",
    height: "100%",
  },
  weatherDegree: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
    fontWeight: "700",
  },
  weatherStatus: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
  otherStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  otherState: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  imageState: {
    width: 30,
    height: 30,
  },
  textState: {
    color: "white",
  },
  nextForecast: {
    marginTop: 15,
    marginHorizontal: 10,
  },
  forecastCalendar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  calendarText: {
    fontSize: 16,
    color: "white",
  },
  nextforecastDay: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.bgWhite(0.15),
    borderRadius: 20,
    width: 100,
    padding: 5,
  },
  nextDayImage: {
    width: 60,
    height: 60,
  },
  nextDayDay: {
    color: "white",
    fontSize: 16,
  },
  nextDayDegree: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
