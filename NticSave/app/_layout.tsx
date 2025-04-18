import "./global.css"
import { Stack } from "expo-router"
import { AuthProvider } from "@/utils/authContext"



export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </AuthProvider>
  )
}
