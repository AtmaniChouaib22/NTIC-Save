import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { useState, useRef } from "react"
import { useRouter } from "expo-router"

import NotificationSVG from "@/assets/images/notification.svg"
import ChatbotSVG from "@/assets/images/chatbot.svg"
import TrackingSVG from "@/assets/images/tracking.svg"
import CommunicationSVG from "@/assets/images/communication.svg"
import EscapeRouteSVG from "@/assets/images/escapeRoute.svg"
import RealTime from "@/assets/images/realTime.svg"
import SupervisedSVG from "@/assets/images/engineer.svg"
import TeamRescueSVG from "@/assets/images/teamRescue.svg"

export default function Index() {
  const { width } = useWindowDimensions()
  const scrollViewRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const router = useRouter()

  const slides = [
    {
      title: "Instant Fire Detection & Smart Alerts",
      description:
        "Detect fire risks in real time and receive instant alerts to take action before it’s too late.",
      ImageComponent: NotificationSVG,
    },
    {
      title: "Smart Escape Route Solutions",
      description:
        "Find the fastest and safest way out with dynamically updated evacuation routes.",
      ImageComponent: EscapeRouteSVG,
    },
    {
      title: "Live Member Tracking",
      description:
        "Monitor all department members in real time to ensure safety and quick rescues.",
      ImageComponent: TrackingSVG,
    },
    {
      title: "Teamwork-Based Evacuation Assistance",
      description:
        "Rescuers guide victims safely through coordinated evacuation plans, ensuring no one is left behind.",
      ImageComponent: TeamRescueSVG,
    },
    {
      title: "Reliable Global Communication",
      description:
        "Stay connected with instant messaging between users, responders, and administrators.",
      ImageComponent: CommunicationSVG,
    },
    {
      title: "Real-Time Data & Alerts",
      description:
        "Stay updated with live fire risk data and safety notifications.",
      ImageComponent: RealTime,
    },
    {
      title: "AI Chatbot – Your Smart Emergency Guide",
      description:
        "Get instant help with our AI chatbot, offering step-by-step guidance during emergencies.",
      ImageComponent: ChatbotSVG,
    },
    {
      title: "Supervised by IoT Engineers",
      description:
        "Expert IoT engineers monitor the system to ensure accuracy and reliability.",
      ImageComponent: SupervisedSVG,
    },
  ]

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX / width)
    setCurrentPage(currentIndex)
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Header/Logo Area */}
      <View className="items-center justify-center pt-28 pb-8">
        <Text className="text-3xl font-bold text-customRed">NticSave</Text>
        <Text className="text-gray-500 text-center px-8 mt-2">
          Smart Fire Detection & Rescue System for NTIC
        </Text>
      </View>

      {/* Scrollable Presentation */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-1"
      >
        {slides.map((slide, index) => {
          const { ImageComponent } = slide
          return (
            <View
              key={index}
              style={{ width }}
              className="items-center justify-center px-6"
            >
              <View className="w-64 h-64 items-center justify-center mb-8 overflow-hidden">
                <ImageComponent
                  width="100%"
                  height="100%"
                  style={{ borderRadius: 999 }}
                />
              </View>
              <Text className="text-center text-xl font-bold text-gray-800 mb-3">
                {slide.title}
              </Text>
              <Text className="text-center text-gray-700 text-lg mb-8 px-6">
                {slide.description}
              </Text>
            </View>
          )
        })}
      </ScrollView>

      {/* Pagination Indicators */}
      <View className="flex-row justify-center items-center mb-6">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full mx-1 ${
              currentPage === index ? "w-6 bg-customRed" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </View>

      {/* Auth Buttons */}
      <View className="px-8 pb-12">
        <TouchableOpacity
          className="bg-customRed py-4 rounded-xl mb-4 items-center"
          onPress={() => router.navigate("/sign-in")}
        >
          <Text className="text-white font-semibold text-lg">Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border border-customRed py-4 rounded-xl items-center"
          onPress={() => router.navigate("/sign-up")}
        >
          <Text className="text-customRed font-semibold text-lg">
            Create Account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-6 items-center"
          onPress={() => router.navigate("/")}
        >
          <Text className="text-gray-500">Continue as guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
