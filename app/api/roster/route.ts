import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')
  const supabase  = createClient()

  let query = supabase
    .from('waivers')
    .select('id, signed_at, activity_key, is_minor, participants(full_name, email)')
    .order('created_at', { ascending: true })

  if (sessionId) query = query.eq('session_id', sessionId)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
