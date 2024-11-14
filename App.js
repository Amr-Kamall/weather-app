import { StatusBar } from "expo-status-bar";
import {
  Image,
  Platform,
  Pressable,
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
import { useState } from "react";

export default function App() {
  const [openSearch, setOpenSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);

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
          {locations.length > 0 && openSearch && (
            <View style={styles.locationsContainer}>
              {locations.map((loc, index) => (
                <TouchableOpacity
                  key={index}
                  style={
                    index === locations.length - 1
                      ? styles.location
                      : [styles.location, styles.locationBorder]
                  }
                >
                  <Ionicons name="location" size={24} color="gray" />
                  <Text style={styles.locationText}>
                    London, United Kingdom
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
            London,<Text style={styles.capitalLocation}>United Kingdom</Text>
          </Text>
          {/* weather image */}
          <View style={styles.weatherImageContainer}>
            <Image
              style={styles.weatherImage}
              source={require("./assets/images/partlycloudy.png")}
            />
          </View>
          {/* degree celcius */}
          <View>
            <Text style={styles.weatherDegree}>23&deg;</Text>
            <Text style={styles.weatherStatus}>partly cloudy</Text>
          </View>
          {/* other stats */}
          <View style={styles.otherStats}>
            <View style={styles.otherState}>
              <Image
                style={styles.imageState}
                source={require("./assets/icons/wind.png")}
              />
              <Text style={styles.textState}>22km</Text>
            </View>
            <View style={styles.otherState}>
              <Image
                style={styles.imageState}
                source={require("./assets/icons/drop.png")}
              />
              <Text style={styles.textState}>23%</Text>
            </View>
            <View style={styles.otherState}>
              <Image
                style={styles.imageState}
                source={require("./assets/icons/sun.png")}
              />
              <Text style={styles.textState}>6:05 Am</Text>
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
            <View style={styles.nextforecastDay}>
              <Image
                style={styles.nextDayImage}
                source={require("./assets/images/heavyrain.png")}
              />
              <Text style={styles.nextDayDay}>monday</Text>
              <Text style={styles.nextDayDegree}>13&deg;</Text>
            </View>
            {/* view */}
            <View style={styles.nextforecastDay}>
              <Image
                style={styles.nextDayImage}
                source={require("./assets/images/heavyrain.png")}
              />
              <Text style={styles.nextDayDay}>monday</Text>
              <Text style={styles.nextDayDegree}>13&deg;</Text>
            </View>
            <View style={styles.nextforecastDay}>
              <Image
                style={styles.nextDayImage}
                source={require("./assets/images/heavyrain.png")}
              />
              <Text style={styles.nextDayDay}>monday</Text>
              <Text style={styles.nextDayDegree}>13&deg;</Text>
            </View>
            <View style={styles.nextforecastDay}>
              <Image
                style={styles.nextDayImage}
                source={require("./assets/images/heavyrain.png")}
              />
              <Text style={styles.nextDayDay}>monday</Text>
              <Text style={styles.nextDayDegree}>13&deg;</Text>
            </View>
            <View style={styles.nextforecastDay}>
              <Image
                style={styles.nextDayImage}
                source={require("./assets/images/heavyrain.png")}
              />
              <Text style={styles.nextDayDay}>monday</Text>
              <Text style={styles.nextDayDegree}>13&deg;</Text>
            </View>
            <View style={styles.nextforecastDay}>
              <Image
                style={styles.nextDayImage}
                source={require("./assets/images/heavyrain.png")}
              />
              <Text style={styles.nextDayDay}>monday</Text>
              <Text style={styles.nextDayDegree}>13&deg;</Text>
            </View>
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
    height: "10%",
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
    height: "61%",
    justifyContent: "space-around",
  },
  cityLocation: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  capitalLocation: {
    color: colors.gray300,
    fontSize: 17,
  },
  weatherImageContainer: {
    height: 200,
    width: 200,
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
    width: 90,
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
