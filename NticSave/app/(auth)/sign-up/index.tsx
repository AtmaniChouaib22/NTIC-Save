import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { handleSignUp } from "../../../utils/authentHandlers"
import ErrorBox from "../../components/ErrorBox"

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const router = useRouter()

  const updateFormField = (field: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }))
    if (error) setError(null)
  }

  const clearFormData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      studentId: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    })
  }

  const onSubmit = async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await handleSignUp({ formData })

      if (result.success === false) {
        setLoading(false)
        setError(result)
        console.log("result", result)
        return
      }
      clearFormData()
      console.log("result", result)
      router.replace("/home")
    } catch (err) {
      console.log(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 5}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            {/* Header Section */}
            <View style={styles.header}>
              <Image
                source={require("../../../assets/images/NTIC.jpg")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Please fill in the form to continue
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
              {error && <ErrorBox error={error} />}
              {/* First Name & Last Name (row) */}
              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.label}>First Name</Text>
                  <View style={styles.inputWithIcon}>
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color="#6c757d"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.inputWithIconStyle}
                      placeholder="First name"
                      placeholderTextColor="#A0A0A0"
                      value={formData.firstName}
                      onChangeText={(value) =>
                        updateFormField("firstName", value)
                      }
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.label}>Last Name</Text>
                  <View style={styles.inputWithIcon}>
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color="#6c757d"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.inputWithIconStyle}
                      placeholder="Last name"
                      placeholderTextColor="#A0A0A0"
                      value={formData.lastName}
                      onChangeText={(value) =>
                        updateFormField("lastName", value)
                      }
                      autoCapitalize="words"
                    />
                  </View>
                </View>
              </View>

              {/* Student ID */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Student ID</Text>
                <View style={styles.inputWithIcon}>
                  <Ionicons
                    name="id-card-outline"
                    size={20}
                    color="#6c757d"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.inputWithIconStyle}
                    placeholder="Enter your student ID"
                    placeholderTextColor="#A0A0A0"
                    keyboardType="numeric"
                    value={formData.studentId}
                    onChangeText={(value) =>
                      updateFormField("studentId", value)
                    }
                  />
                </View>
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWithIcon}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#6c757d"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.inputWithIconStyle}
                    placeholder="Enter your email"
                    placeholderTextColor="#A0A0A0"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(value) => updateFormField("email", value)}
                  />
                </View>
              </View>

              {/* Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWithIcon}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#6c757d"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.inputWithIconStyle}
                    placeholder="Enter your password"
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(value) => updateFormField("password", value)}
                  />
                </View>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputWithIcon}>
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={20}
                    color="#6c757d"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.inputWithIconStyle}
                    placeholder="Confirm your password"
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry
                    value={formData.confirmPassword}
                    onChangeText={(value) =>
                      updateFormField("confirmPassword", value)
                    }
                  />
                </View>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={onSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Already have an account?{" "}
                  <Text
                    style={styles.link}
                    onPress={() => router.push("/sign-in")}
                  >
                    Sign In
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 10,
    padding: 8,
  },
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 25,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#e63946", // Customized to match your red theme
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6c757d",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  halfWidth: {
    width: "48%",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#495057",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#DEE2E6",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#212529",
  },
  button: {
    backgroundColor: "#e63946",
    padding: 16,
    alignItems: "center",
    marginTop: 16,
    shadowColor: "#e63946",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#6c757d",
  },
  link: {
    color: "#e63946",
    fontWeight: "bold",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#DEE2E6",
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputWithIconStyle: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: "#212529",
  },
})
