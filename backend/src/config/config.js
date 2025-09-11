import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega o .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

//Carrega o uploads
dotenv.config({ path: path.join(__dirname, '..', 'uploads') });

export const GROQ_API_TOKEN = process.env.GROQ_API_TOKEN;
export const OPENAI_API_TOKEN = process.env.OPENAI_API_TOKEN;
export const SUPABASE_API_TOKEN = process.env.SUPABASE_API_TOKEN;
