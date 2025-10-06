// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fzbjkuzieaqimrsjmqib.supabase.co";
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6YmprdXppZWFxaW1yc2ptcWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMjg5NjMsImV4cCI6MjA3MzcwNDk2M30.i0r67_fvWC3GMNgORJVkosSOQve9gBmBq0RI_gsAMCw";

export const supabase = createClient(supabaseUrl, supabaseKey);
