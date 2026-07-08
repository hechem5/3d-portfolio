import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hhokznnkhdystzaqfysv.supabase.co';
const supabaseKey = 'sb_publishable_HHUlacDeqv5DYUUH3UtBEQ_zTYOgtXf';

export const supabase = createClient(supabaseUrl, supabaseKey);
