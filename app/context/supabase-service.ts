import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage"

export const supabaseClient = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL as string,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string, {
    auth : {
        storage : AsyncStorage,
        autoRefreshToken : true,
        persistSession : true,
        detectSessionInUrl : false
    }
  }
);
