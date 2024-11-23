import { Image, StyleSheet, Text, View } from "react-native";
import { weatherImages } from "../constants";
import { colors } from "../theme";

export default function Forecast({ weatherData }) {
  return (
    <View style={styles.forecast}>
      {/* location */}
      <Text style={styles.cityLocation}>
        {weatherData.locationCountry},
        <Text style={styles.capitalLocation}>{weatherData.locationName}</Text>
      </Text>
      {/* weather image */}
      <View style={styles.weatherImageContainer}>
        <Image
          style={styles.weatherImage}
          // icon of api is very bad so we will use our own icons
          source={weatherImages[weatherData.condition.toLowerCase()]}
        />
      </View>
      {/* degree celcius */}
      <View>
        <Text style={styles.weatherDegree}>{weatherData.temperature}&deg;</Text>
        <Text style={styles.weatherStatus}>{weatherData.condition}</Text>
      </View>
      {/* other stats */}
      <View style={styles.otherStats}>
        <View style={styles.otherState}>
          <Image
            style={styles.imageState}
            source={require("../assets/icons/wind.png")}
          />
          <Text style={styles.textState}>{weatherData.windSpeed}km</Text>
        </View>
        <View style={styles.otherState}>
          <Image
            style={styles.imageState}
            source={require("../assets/icons/drop.png")}
          />
          <Text style={styles.textState}>{weatherData.humidity}%</Text>
        </View>
        <View style={styles.otherState}>
          <Image
            style={styles.imageState}
            source={require("../assets/icons/sun.png")}
          />
          <Text style={styles.textState}>{weatherData.time} Am</Text>
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
    marginVertical: 20,
  },
  cityLocation: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    // maxHeight:"10%",
  },
  capitalLocation: {
    color: colors.gray300,
    fontSize: 16,
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
