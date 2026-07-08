import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function check() {
  const { data, error } = await supabase.from('cv_data').select('content').eq('id', 1).single();
  console.log("DB DATA:", JSON.stringify(data?.content, null, 2));
}

check();
