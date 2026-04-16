import { supabase } from './supabaseClient';

export async function saveProgress(userId, date, data) {
  const { error } = await supabase
    .from('progress')
    .upsert([{ user_id: userId, date, data }], { onConflict: ['user_id', 'date'] });
  if (error) throw error;
}

export async function getProgress(userId) {
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  if (error) throw error;
  return data;
}
