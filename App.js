import { StatusBar } from "expo-status-bar";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { theme } from "./theme";
import { useState } from "react";

export default function App() {
  const [toggleSearch, setToggleSearch] = useState(false);
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
            {toggleSearch && (
              <TextInput
                placeholder="Search City"
                style={styles.searchInput}
                placeholderTextColor="white"
              />
            )}
            <TouchableOpacity
              onPress={() => setToggleSearch((open) => !open)}
              style={styles.searchIconContainer}
            >
              <Ionicons name="search" size={25} color="white" />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && toggleSearch ? (
            <View style={styles.locationsContainer}>
              {locations.map((loc, index) => (
                <TouchableOpacity style={styles.locationContainer}>
                  <Ionicons name="location" size={24} color="gray" />
                  <Text style={styles.locationText}>
                    London, United Kingdom
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    marginHorizontal:10,
  },
  searchContainer: {
    height: "40%",
    marginVertical:20,
  },
  appContainer: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: -1,
  },

  searchInputContainer: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    minHeight: "30%",
  },
  searchInput: {
    backgroundColor: theme.bgWhite(0.2),
    borderRadius: 25,
    padding: 12,
    paddingLeft: 25,
    paddingRight:75,
    fontSize: 18,
    color: "white",
    flex: 1,
  },

  searchIconContainer: {
    backgroundColor: theme.bgWhite(0.2),
    width: 70,
    height: 50,
    borderRadius: 25, // half of width and height
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
  },
  locationsContainer: {
    backgroundColor: "#ccc",
    borderRadius: 20,
  },
  locationContainer: {
    borderBottomWidth: 1.2,
    borderBottomColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection:"row",
    gap:10,
  },
  locationText: {
    fontSize: 18,
  },
});
