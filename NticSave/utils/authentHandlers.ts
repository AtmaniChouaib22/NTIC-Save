import { db, auth } from "../utils/firebaseConfig"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "@firebase/auth"
import { collection, addDoc } from "firebase/firestore"

import {
  SignInParams,
  SignInResult,
  SignUpParams,
  SignUpResult,
} from "../app/types"

//sign in function
export const handleSignIn = async ({
  logFormData,
}: SignInParams): Promise<SignInResult> => {
  if (!logFormData.email.trim() || !logFormData.password.trim()) {
    return {
      success: false,
      message: "Email and password are required",
    }
  }

  const universityDomain = "@univ-constantine2.dz"
  if (!logFormData.email.endsWith(universityDomain)) {
    return {
      success: false,
      message: `Please use your university email (${universityDomain})`,
    }
  }

  try {
    const auth = getAuth()
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      logFormData.email,
      logFormData.password
    )
    const user = userCredentials.user
    return {
      success: true,
      message: "Signed in successfully",
    }
  } catch (error: any) {
    let errorMessage = "Failed to sign in. Please try again later"

    switch (error.code) {
      case "auth/user-not-found":
        errorMessage = "User not found. Please check your credentials"
        break

      case "auth/invalid-email":
        errorMessage = "The email address is not valid"
        break

      case "auth/invalid-credential":
        errorMessage = "The email or password is incorrect"
        break

      case "auth/internal-error":
        errorMessage = "Internal Error. Please Try again Later"
        break
    }

    return {
      success: false,
      message: errorMessage,
    }
  }
}

//sign up function

export const handleSignUp = async ({
  formData,
}: SignUpParams): Promise<SignUpResult> => {
  // Form validation
  if (!formData.firstName.trim()) {
    return {
      success: false,
      message: "First name is required",
    }
  }
  if (!formData.lastName.trim()) {
    return {
      success: false,
      message: "Last name is required",
    }
  }
  if (!formData.studentId.trim()) {
    return {
      success: false,
      message: "Student ID is required",
    }
  }
  if (!formData.email.trim()) {
    return {
      success: false,
      message: "Email address is required",
    }
  }

  // Email format validation
  const universityDomain = "@univ-constantine2.dz"
  const emailRegex = new RegExp(`^[^\\s@]+${universityDomain}$`)

  if (!emailRegex.test(formData.email)) {
    return {
      success: false,
      message:
        "Please use your university email address (@univ-constantine2.dz)",
    }
  }

  if (!formData.password) {
    return {
      success: false,
      message: "Password is required",
    }
  }

  if (formData.password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters long",
    }
  }

  if (formData.password !== formData.confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match",
    }
  }

  try {
    const auth = getAuth()
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    )

    const user = userCredentials.user

    const userData = {
      uid: user.uid,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      studentId: formData.studentId.trim(),
      email: formData.email.toLowerCase().trim(),
      role: formData.role,
      createdAt: new Date().toISOString(),
    }

    const docRef = await addDoc(collection(db, "users"), userData)

    return {
      success: true,
      userId: user.uid,
      message: "Account created successfully",
    }
  } catch (error: any) {
    // Firebase Auth errors handling
    let errorMessage = "Failed to create account. Please try again later"

    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "This email address is already registered"
        break

      case "auth/invalid-email":
        errorMessage = "The email address is not valid"
        break

      case "auth/weak-password":
        errorMessage =
          "The password is too weak. Please use at least 6 characters"
        break

      case "auth/network-request-failed":
        errorMessage = "Network error. Please check your internet connection"
        break
    }

    return {
      success: false,
      message: errorMessage,
    }
  }
}
