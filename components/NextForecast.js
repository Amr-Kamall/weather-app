import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { theme } from "../theme";
import { weatherImages } from "../constants";
import { useWeather } from "../store/WeatherContext";
import { currentDay } from "../helper";

export default function NextForecast() {
  const { currentWeather } = useWeather();

  return (
    <View style={styles.nextForecast}>
      <View style={styles.forecastCalendar}>
        <Ionicons name="calendar-outline" color="white" size={20} />
        <Text style={styles.calendarText}>Daily forecast</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      >
        {/* view */}
        {currentWeather?.forecastDays?.map((item, index) => (
          <View key={index} style={styles.nextforecastDay}>
            <Image
              style={styles.nextDayImage}
              source={
                weatherImages[item.day.condition.text.toLowerCase()] ||
                weatherImages["other"]
              }
            />
            <Text style={styles.nextDayDay}>{currentDay(item.date)}</Text>
            <Text style={styles.nextDayDegree}>{item.day.avgtemp_c}&deg;</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  nextForecast: {
    marginVertical: 15,
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
