import { supabase } from '@/lib/supabaseClient';

export async function POST(req) {
  const { userId, sender, message } = await req.json();

  const { error } = await supabase.from('chat_messages').insert([
    { user_id: userId, sender, message },
  ]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
