import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fkqpgofnlmetepksfhys.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrcXBnb2ZubG1ldGVwa3NmaHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNzY3MzYsImV4cCI6MjA5MTk1MjczNn0.-yrjq_1qKugVi5ZHN-9UBw-3kpIt9t2SEW4nrYfO4Ow';

export const supabase = createClient(supabaseUrl, supabaseKey);
