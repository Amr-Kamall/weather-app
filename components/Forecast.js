import { Image, StyleSheet, Text, View } from "react-native";
import { weatherImages } from "../constants";
import { colors } from "../theme";
import { useWeather } from "../store/WeatherContext";
import { convertTo12Hour } from "../helper";

export default function Forecast() {
  // london => الطقس درجه الحراره
  const { currentWeather } = useWeather();
  console.log(currentWeather);

  return (
    <View style={styles.forecast}>
      {/* location */}
      <Text style={styles.cityLocation}>
        {currentWeather.locationCountry},
        <Text style={styles.capitalLocation}>
          {currentWeather.locationName}
        </Text>
      </Text>
      {/* weather image */}
      <View style={styles.weatherImageContainer}>
        <Image
          style={styles.weatherImage}
          // icon of api is very bad so we will use our own icons
          source={weatherImages[currentWeather?.condition?.toLowerCase()]}
        />
      </View>
      {/* degree celcius */}
      <View>
        <Text style={styles.weatherDegree}>
          {currentWeather.temperature}&deg;
        </Text>
        <Text style={styles.weatherStatus}>{currentWeather.condition}</Text>
      </View>
      {/* other stats */}
      <View style={styles.otherStats}>
        <View style={styles.otherState}>
          <Image
            style={styles.imageState}
            source={require("../assets/icons/wind.png")}
          />
          <Text style={styles.textState}>{currentWeather.windSpeed}km</Text>
        </View>
        <View style={styles.otherState}>
          <Image
            style={styles.imageState}
            source={require("../assets/icons/drop.png")}
          />
          <Text style={styles.textState}>{currentWeather.humidity}%</Text>
        </View>
        <View style={styles.otherState}>
          <Image
            style={styles.imageState}
            source={require("../assets/icons/sun.png")}
          />
          <Text style={styles.textState}>
            {convertTo12Hour(currentWeather.time)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // forecast section
  forecast: {
    alignItems: "center",
    zIndex: 1, // Keep it below locationsContainer but above the background
    justifyContent: "space-around",
    marginVertical: 10,
    flex: 1,
  },
  cityLocation: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  capitalLocation: {
    color: colors.gray300,
    fontSize: 16,
  },
  weatherImageContainer: {
    height: 200,
    width: 200,
    marginVertical: 12,
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
    marginTop: 10,
    marginBottom: 30,
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
});
