import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()
    
    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 })
    }
    
    const supabase = await createClient()
    
    // Marcar el enlace como visto
    const { error } = await supabase
      .from('one_time_links')
      .update({ 
        viewed: true, 
        viewed_at: new Date().toISOString() 
      })
      .eq('token', token)
    
    if (error) {
      return NextResponse.json({ error: 'Failed to mark as viewed' }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
