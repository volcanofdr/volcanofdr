import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  username: string;
  subscription_type: 'free' | 'vip' | 'expert' | 'extended';
  subscription_end: string | null;
  llamas_balance: number;
  staff_level: number | null;
  created_at: string;
  updated_at: string;
};

export type MinecraftAccount = {
  id: string;
  username: string;
  password: string | null;
  last_ip: string;
  is_premium: boolean;
  account_type: 'free' | 'vip' | 'extended';
  created_at: string;
};