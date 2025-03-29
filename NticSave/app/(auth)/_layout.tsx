import { Stack, useRouter, useSegments } from "expo-router"
import { useEffect } from "react"
import { useAuth } from "@/utils/authContext"

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/(app)/(tabs)/home")
    }
  }, [isAuthenticated, isLoading])

  return <Stack screenOptions={{ headerShown: false }} />
}
