import { Stack, useRouter } from "expo-router"
import { useEffect } from "react"
import { useAuth } from "@/utils/authContext"

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/(auth)/sign-in")
    }
  }, [isAuthenticated, isLoading, router])

  return <Stack screenOptions={{ headerShown: false }} />
}
