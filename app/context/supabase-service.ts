import "react-native-url-polyfill/auto";
import { createClient, User } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const supabaseClient = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL as string,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

export interface SignInResponse {
  data: User | undefined;
  error: Error | undefined;
}

export interface SignOutResponse {
  error: any | undefined;
  data: {} | undefined;
}

/**
 *
 * @param email
 * @param password
 * @returns
 */
export const login = async (
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
    return { data: data?.user, error: undefined };
  } catch (error) {
    console.log("login error", error);
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
export const createAcount = async (
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
    if (updateErr) throw updateErr;

    return { data: data?.user as User, error: undefined };
  } catch (error) {
    console.log("login error", error);
    return { error: error as Error, data: undefined };
  }
};

/**
 *
 * @returns
 */
export const logout = async (): Promise<SignOutResponse> => {
  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    return { error: undefined, data: true };
  } catch (error) {
    return { error, data: undefined };
  } finally {
  }
};
