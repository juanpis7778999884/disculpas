import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ApologyContent from './apology-content'

interface Props {
  params: Promise<{ token: string }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ApologyPage({ params }: Props) {
  const { token } = await params
  const supabase = await createClient()
  
  // Atomically check and mark as viewed in one operation
  // This prevents race conditions if someone refreshes quickly
  const { data, error } = await supabase
    .from('one_time_links')
    .update({ 
      viewed: true, 
      viewed_at: new Date().toISOString() 
    })
    .eq('token', token)
    .eq('viewed', false)
    .select()
    .single()
  
  // If no rows were updated, either the token doesn't exist or was already viewed
  if (error || !data) {
    // Check if it exists but was already viewed
    const { data: existing } = await supabase
      .from('one_time_links')
      .select('viewed')
      .eq('token', token)
      .single()
    
    if (existing?.viewed) {
      return <ExpiredMessage />
    }
    
    notFound()
  }
  
  // Link was valid and is now marked as viewed - show the message
  return <ApologyContent />
}

function ExpiredMessage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
          <svg className="w-10 h-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m0 0v2m0-2h2m-2 0H10m4-6.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Este mensaje ya fue visto
        </h1>
        <p className="text-muted-foreground text-lg">
          Este enlace era de un solo uso y ya ha sido abierto anteriormente. 
          El mensaje ha desaparecido para siempre.
        </p>
      </div>
    </main>
  )
}
