import { StyleSheet, Text, View } from "react-native";
import {CircleSnail} from "react-native-progress";

export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingSpinner}>
        <CircleSnail size={140} color="#0bb3b2" thickness={10} />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingSpinner: {
    color: "white",
    fontSize: 30,
  },
});
