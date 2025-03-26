import React from "react"
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from "react-native"

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.content}>
        <Text style={styles.heading}>Home</Text>
        <Text style={styles.subheading}>Welcome to NTIC Save</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e63946",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    color: "#6c757d",
  },
})
