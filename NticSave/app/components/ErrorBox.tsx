import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

const ErrorBox = ({ error }) => {
  return (
    <View style={styles.errorContainer}>
      <Ionicons
        name="alert-circle"
        size={20}
        color="#fff"
        style={styles.errorIcon}
      />
      <Text style={styles.errorText}>
        {error.message || "An error occurred. Please try again."}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: "#e63946",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  errorIcon: {
    marginRight: 8,
  },
  errorText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
});

export default ErrorBox;
