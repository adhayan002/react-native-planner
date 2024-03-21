import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://tzzmxbcrsiaqujlaxmdm.supabase.co', 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6em14YmNyc2lhcXVqbGF4bWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyNjYwOTAsImV4cCI6MjAyNTg0MjA5MH0.XM8T9Atzf2O7c68b2vRqs0tBJgd4he5-tXWSoOwY3F4')