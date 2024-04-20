import React, { useEffect, useState } from "react";
import {
  supabaseClient,
  login,
  createAcount,
  logout,
  SignInResponse,
} from "./supabase-service";
import { User } from "@supabase/supabase-js";

const AuthContext = React.createContext<{
  signIn: (
    email: string,
    password: string
  ) => Promise<SignInResponse> | undefined;
  signUp: (
    email: string,
    password: string,
    name?: string
  ) => Promise<SignInResponse> | undefined;
  signOut: () => void;
  isLoading: boolean;
  user?: User | undefined;
}>({
  signIn: () => undefined,
  signUp: () => undefined,
  signOut: () => null,
  isLoading: false,
  user: undefined,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    /**
     * Initialize the component
     */
    async function init() {
      console.log("[init]");
      try {
        const response = await supabaseClient.auth.getUser();
        console.log("[init] ==>", response?.data?.user);
        setUser((prev) => {
          setIsLoading(false);
          return response?.data?.user!;
        });
        return response?.data?.user;
      } catch (e) {
        console.log("[error getting user] ==>", e);
        setIsLoading(false);
      }
    }
    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          // Perform sign-in logic here
          const response = await login(email, password);
          setUser(response?.data!);
          setIsLoading(false);
          return response;
        },
        signUp: async (email: string, password: string, name?: string) => {
          // Perform sign-up logic here
          const response = await createAcount(email, password, name!);
          setUser(response?.data!);
          setIsLoading(false);
          return response
        },
        signOut: async () => {
          // Perform sign-out logic here
          await logout();
          setUser(undefined);
          setIsLoading(false);
        },
        isLoading,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
