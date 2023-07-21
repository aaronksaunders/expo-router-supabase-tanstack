import { User } from "@supabase/supabase-js";
import {
  useRootNavigation,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import React, { useContext, createContext, useEffect, useState } from "react";
import { supabaseClient } from "./supabase-service";

// Define the AuthContextValue interface
interface SignInResponse {
  data: User | undefined;
  error: Error | undefined;
}

interface SignOutResponse {
  error: any | undefined;
  data: {} | undefined;
}

interface AuthContextValue {
  signIn: (e: string, p: string) => Promise<SignInResponse>;
  signUp: (e: string, p: string, n: string) => Promise<SignInResponse>;
  signOut: () => Promise<SignOutResponse>;
  user: User | undefined | null;
  authInitialized: boolean;
}

// Define the Provider component
interface ProviderProps {
  children: React.ReactNode;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function Provider(props: ProviderProps) {
  const [user, setAuth] = useState<User | null>(null);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);
  const router = useRouter();

  // This hook will protect the route access based on user authentication.
  const useProtectedRoute = (user: User | null) => {
    const segments = useSegments();
    const router = useRouter();

    // checking that navigation is all good;
    const navigationState = useRootNavigationState();

    useEffect(() => {
      if (!navigationState?.key || !authInitialized) return;

      const inAuthGroup = segments[0] === "(auth)";

      if (
        // If the user is not signed in and the initial segment is not anything in the auth group.
        !user &&
        !inAuthGroup
      ) {
        // Redirect to the sign-in page.
        router.push("/sign-in");
      } else if (user && inAuthGroup) {
        // Redirect away from the sign-in page.
        router.push("/(tabs)/home");
      }
    }, [user, segments, authInitialized, navigationState?.key]);
  };

  useEffect(() => {
    supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log("got user", session?.user?.email);
      setAuthInitialized(true);
      setAuth(session?.user || null);
      router.push("/(tabs)/home");
    });
  }, []);

  /**
   *
   * @returns
   */
  const logout = async (): Promise<SignOutResponse> => {
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
      return { error: undefined, data: true };
    } catch (error) {
      return { error, data: undefined };
    } finally {
      setAuth(null);
    }
  };
  /**
   *
   * @param email
   * @param password
   * @returns
   */
  const login = async (
    email: string,
    password: string
  ): Promise<SignInResponse> => {
    try {
      console.log(email, password);
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      setAuth(data.user);
      return { data: data?.user, error: undefined };
    } catch (error) {
      console.log("login error", error);
      setAuth(null);
      return { error: error as Error, data: undefined };
    }
  };

  /**
   *
   * @param email
   * @param password
   * @param username
   * @returns
   */
  const createAcount = async (
    email: string,
    password: string,
    username: string
  ): Promise<SignInResponse> => {
    try {
      console.log(email, password, username);
      let { error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      const { data, error: updateErr } = await supabaseClient.auth.updateUser({
        data: { username },
      });
      if (updateErr) throw updateErr

      setAuth(data.user);
      return { data: data?.user as User, error: undefined };
    } catch (error) {
      console.log("login error", error);
      setAuth(null);
      return { error: error as Error, data: undefined };
    }
  };

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: login,
        signOut: logout,
        signUp: createAcount,
        user,
        authInitialized,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// Define the useAuth hook
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return authContext;
};
