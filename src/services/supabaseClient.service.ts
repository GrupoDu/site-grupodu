import { createClient, SupabaseClient } from "@supabase/supabase-js";

interface IEnvSecrets {
  supabaseUrl: string;
  supabaseKey: string;
}

/**
 * Cria conexão com o supabase.
 */
export function supabaseClient(): SupabaseClient {
  const { supabaseKey, supabaseUrl } = getEnvSecrets();
  return createClient(supabaseUrl, supabaseKey);
}

/**
 * Extrai as SECRETS para supabase
 */
function getEnvSecrets(): IEnvSecrets {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_API_KEY;
  const isMissingEnvValue = !supabaseUrl || !supabaseKey;

  if (isMissingEnvValue) throw new Error("SECRETS faltando.");

  return {
    supabaseUrl,
    supabaseKey,
  };
}
