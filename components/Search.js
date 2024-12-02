import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, theme } from "../theme";
import { useState } from "react";
import { useWeather } from "../store/WeatherContext";
import { truncateText } from "../helper";

export default function Search() {
  const { locations, getWeatherData, getSearchData, setLocations } =
    useWeather();
  const [openSearch, setOpenSearch] = useState(false);

  function handleSearch(value) {
    if (value.trim() === "") {
      setLocations([]); // Clear locations if the input is empty
    }
    if (value.length > 2) {
      getSearchData(value);
    }
  }
  function handleGetWeather(cityName) {
    // To get the selected country with the name
    getWeatherData(cityName);
    setOpenSearch(false);
  }

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        {openSearch && (
          <TextInput
            onChangeText={handleSearch}
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
      {locations?.length > 0 && openSearch && ( // [london, london-dea, egypt]
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
                {truncateText(loc.name, 20)}, {truncateText(loc.country, 17)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    height: "11%",
    marginTop: Platform.OS === "android" ? 30 : 0,
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
    zIndex: 100000, // to be above everything else
  },

  location: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    gap: 10,
    overflow: "hidden",
  },
  locationBorder: {
    borderBottomWidth: 1.2,
    borderBottomColor: "black",
  },
  locationText: {
    fontSize: 18,
  },
});
