// services/uploadSupabase.js
import { createClient } from '@supabase/supabase-js';

import { SUPABASE_API_TOKEN } from '../config/config.js';

const supabaseUrl = 'https://tftwyaduxdzgbzuikgdn.supabase.co';
const supabaseKey = SUPABASE_API_TOKEN;
const bucketName = 'json';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadJson(nomeArquivo, conteudoJson) {

  const { data, error } = await supabase
    .storage
    .from(bucketName)
    .upload(nomeArquivo, conteudoJson, {
      contentType: 'application/json',
      upsert: true, // sobrescreve se já existir
    });

  if (error) {
    console.error('\nErro ao fazer upload no Supabase:', error);
    return null;
  }

  const { data: publicUrlData } = supabase
    .storage
    .from(bucketName)
    .getPublicUrl(nomeArquivo);

  return publicUrlData.publicUrl;
  
}
