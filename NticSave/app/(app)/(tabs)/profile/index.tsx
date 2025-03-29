import React from "react"
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native"
import { useRouter } from "expo-router"
import { useAuth } from "@/utils/authContext"

export default function Profile() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          await logout()
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Profile</Text>
        <Text style={styles.email}>{user?.email || "No email found"}</Text>

        {/* User info and other profile content here */}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e63946",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: "#f8d7da",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  logoutText: {
    color: "#e63946",
    fontWeight: "bold",
    fontSize: 16,
  },
})
