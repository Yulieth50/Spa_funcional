// Si ya existe, no lo vuelvas a crear
if (!window.supabaseClient) {
  const SUPABASE_URL = "https://balohzjwgempafuengzs.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_yKS1vh40Ws3xHXKAN2mv8A_BAB4VkHY";

  window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
const supabaseClient = window.supabaseClient;