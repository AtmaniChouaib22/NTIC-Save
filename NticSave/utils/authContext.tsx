import React, { createContext, useState, useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  logout: () => Promise<void>;  // Add logout function
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  logout: async () => {},  // Default empty function
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Add logout function
  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      // Firebase will trigger onAuthStateChanged, which will update our state
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    isAuthenticated: !!user,
    isLoading,
    user,
    logout,  // Include in context value
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);