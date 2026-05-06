import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md">
        <Heart className="w-16 h-16 mx-auto text-muted-foreground/50 mb-6" />
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Enlace no encontrado
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          Este enlace no existe o ya ha expirado.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Crear un nuevo mensaje
        </Link>
      </div>
    </main>
  )
}
