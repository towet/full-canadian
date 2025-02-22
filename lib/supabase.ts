import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lxcnhbocdgbwsuxijwor.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4Y25oYm9jZGdid3N1eGlqd29yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMDY5OTYsImV4cCI6MjA1NTc4Mjk5Nn0.NgdJRn8Nndtt8dNJTdDQ1GjKyMUh15YOppVGFQCuqqg'

export const supabase = createClient(supabaseUrl, supabaseKey)
