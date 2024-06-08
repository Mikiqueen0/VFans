import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ixtmnmywluclcxqvonnz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4dG1ubXl3bHVjbGN4cXZvbm56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4MzYwMDEsImV4cCI6MjAzMzQxMjAwMX0.qt3js9jTx8c85lzCYihZtdoPXJVHiRwRIHA1N-kC2co";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
