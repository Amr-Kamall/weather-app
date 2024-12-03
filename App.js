import { StatusBar } from "expo-status-bar";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useState } from "react";
import Search from "./components/Search";
import Loading from "./components/Loading";
import Forecast from "./components/Forecast";
import NextForecast from "./components/NextForecast";
import { WeatherProvider } from "./store/WeatherContext";

export default function App() {
  const [loading, setLoading] = useState(true);
  return (
    <WeatherProvider updateLoading={setLoading}>
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
            <Search />
            {/* we use scrollView if the content become bigger than screen */}
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            >
              {/* forecast section */}
              <Forecast />
              {/* forecast for next days */}
              <NextForecast />
            </ScrollView>
          </SafeAreaView>
        )}
      </View>
    </WeatherProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    marginHorizontal: 10,
    flex: 1,
  },
  appContainer: {
    flex: 1,
    // position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 0, // Keep background layer lowest
  },
});
