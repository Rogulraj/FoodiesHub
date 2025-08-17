import appConfig from "@config/index";
import { createClient } from '@supabase/supabase-js';

export const supabaseClient = createClient(appConfig.VITE_SUPABASE_URL, appConfig.VITE_SUPABASE_KEY);