import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body     = await req.json()
    const supabase = createClient()
    const { data, error } = await supabase.from('waivers').insert({
      session_id:     body.sessionId,
      participant_id: body.participantId,
      activity_key:   body.activityKey,
      answers:        body.answers,
      clauses:        body.clauses,
      signed_at:      new Date().toISOString(),
      signature_data: body.signatureData,
      ip_address:     req.headers.get('x-forwarded-for') ?? 'unknown',
    }).select('id').single()
    if (error) throw error
    return NextResponse.json({ id: data.id })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save waiver' }, { status: 500 })
  }
}
