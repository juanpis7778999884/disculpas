import { createClient } from '@/lib/supabase/server'
import ApologyPage from './apology-page'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Este es el token unico de tu enlace - NO lo cambies
const UNIQUE_TOKEN = 'mi-mensaje-especial-2024'

export default async function Home({ 
  searchParams 
}: { 
  searchParams: Promise<{ test?: string }> 
}) {
  const params = await searchParams
  const isTestMode = params.test === 'true'
  
  const supabase = await createClient()
  
  // Verificar si el enlace ya fue visto
  const { data: link } = await supabase
    .from('one_time_links')
    .select('viewed')
    .eq('token', UNIQUE_TOKEN)
    .single()
  
  // Si no existe el enlace, crearlo
  if (!link) {
    await supabase
      .from('one_time_links')
      .insert({ token: UNIQUE_TOKEN, viewed: false })
  }
  
  const isExpired = link?.viewed === true
  
  return (
    <ApologyPage 
      isExpired={isExpired} 
      isTestMode={isTestMode}
      token={UNIQUE_TOKEN}
    />
  )
}
