'use client'

import { useState, useRef } from 'react'
import { Heart, Play, Pause, Volume2, VolumeX, Sparkles, Sun } from 'lucide-react'

interface Props {
  isExpired: boolean
  isTestMode: boolean
  token: string
}

export default function ApologyPage({ isExpired, isTestMode, token }: Props) {
  const [showMessage, setShowMessage] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleButtonClick = async () => {
    // Marcar como visto en la base de datos (solo si no es modo prueba)
    if (!isTestMode) {
      await fetch('/api/mark-viewed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })
    }
    
    // Mostrar el mensaje y reproducir musica
    setShowMessage(true)
    if (audioRef.current) {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch {
        // No hay cancion cargada, ignorar el error
        setIsPlaying(false)
      }
    }
  }

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch {
          // No hay cancion cargada
        }
      }
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Si el enlace ya fue usado, mostrar mensaje de expirado
  if (isExpired && !isTestMode) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-50 to-yellow-100">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center">
            <Heart className="w-10 h-10 text-amber-400" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-amber-900 mb-4">
            Este mensaje ya fue visto
          </h1>
          <p className="text-amber-700">
            Este enlace solo podia ser abierto una vez, y ya fue utilizado.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50">
      {/* Audio - CAMBIA ESTA URL POR TU CANCION */}
      <audio 
        ref={audioRef} 
        loop 
        src="/audio/yellow.mp3"
      />

      {/* Modo prueba indicator */}
      {isTestMode && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-medium z-50 shadow-lg">
          Modo Prueba - El enlace NO se quemara
        </div>
      )}

      {/* Elementos decorativos animados */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soles y destellos */}
        <Sun className="absolute top-16 left-[8%] w-8 h-8 text-amber-300/40 animate-rotate-slow" />
        <Sun className="absolute top-32 right-[12%] w-6 h-6 text-yellow-400/30 animate-rotate-slow" style={{ animationDirection: 'reverse' }} />
        <Sparkles className="absolute top-24 left-[25%] w-5 h-5 text-amber-400/50 animate-pulse" />
        <Sparkles className="absolute bottom-32 right-[20%] w-6 h-6 text-yellow-500/40 animate-pulse" />
        
        {/* Corazones flotantes */}
        <Heart className="absolute top-20 right-[25%] w-6 h-6 text-orange-300/30 animate-float" />
        <Heart className="absolute bottom-40 left-[15%] w-8 h-8 text-amber-300/25 animate-float-reverse" />
        <Heart className="absolute top-48 left-[60%] w-5 h-5 text-yellow-400/35 animate-float" style={{ animationDelay: '1s' }} />
        <Heart className="absolute bottom-24 right-[35%] w-7 h-7 text-orange-200/30 animate-float-reverse" style={{ animationDelay: '0.5s' }} />
        
        {/* Circulos decorativos */}
        <div className="absolute top-10 right-[5%] w-32 h-32 bg-gradient-to-br from-amber-200/20 to-yellow-300/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 left-[5%] w-40 h-40 bg-gradient-to-tr from-orange-200/20 to-amber-200/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-100/30 to-amber-100/20 rounded-full blur-3xl" />
      </div>

      {!showMessage ? (
        /* PANTALLA INICIAL - Solo el boton Perdon */
        <div className="relative z-10 text-center">
          <button
            onClick={handleButtonClick}
            className="group relative px-16 py-8 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-amber-900 font-serif text-4xl font-bold rounded-full shadow-2xl shadow-amber-300/50 transition-all duration-500 hover:scale-110 hover:shadow-amber-400/60 animate-pulse-glow"
          >
            {/* Brillo animado */}
            <span className="absolute inset-0 rounded-full animate-shimmer opacity-60" />
            
            {/* Texto del boton */}
            <span className="relative z-10 flex items-center gap-3">
              <Heart className="w-8 h-8 animate-heart-beat" />
              Perdon
            </span>
          </button>
          
          <p className="mt-8 text-amber-600/70 text-sm animate-bounce-soft">
            Toca para ver el mensaje
          </p>
        </div>
      ) : (
        /* MENSAJE REVELADO */
        <div className="relative z-10 max-w-2xl w-full text-center px-4">
          {/* Controles de audio */}
          <div className="fixed bottom-6 right-6 flex gap-2 z-50">
            <button
              onClick={togglePlay}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-amber-600 hover:bg-amber-50 transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleMute}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-amber-600 hover:bg-amber-50 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Contenido del mensaje */}
          <div className="animate-fade-in-up">
            <Heart className="w-20 h-20 mx-auto text-amber-500 mb-6 animate-heart-beat" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-amber-900 mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Lo siento mucho
          </h1>

          {/* 
            ====================================
            AQUI VA TU MENSAJE - EDITALO ABAJO
            ====================================
          */}
          <div className="space-y-6 text-lg md:text-xl text-amber-800 leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <p>
              Nunca va a ser mi intencion hacerla sentir menos, siempre estare apoyandola y protegiendola y queriendola
            </p>
            <p>
             cada dia trato de demostrarles que no soy el ser humano del cual les he hablado tanto, ese ser humano inhumano,
            </p>
            <p>
             que hacia todo por su propio bien, siempre pienso en los mios, aveces por encima de mi, porque si mi entorno esta bien, yo tambien
            </p>
            <p>
            usted hace parte de ese entorno hermoso del cual algun dia yo le pedi a Dios que me diera, yo he demostrado con acciones que no soy una persona comun,

            </p>
            <p>
              y si estoy haciendo esto es para que en su vida vuelva a pensar que yo tendria alguna mala intencion con usted,
            </p>
            <p>
            porque usted hace parte de ese pedazo hermoso que hay en mi corazon,
            </p>
            
            <p className="text-2xl font-serif text-amber-900 pt-4">
              Te quiero mucho.
            </p>
          </div>
          {/* FIN DEL MENSAJE */}

          <div className="mt-12 animate-fade-in-up opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
            <Heart className="w-8 h-8 mx-auto text-amber-400" />
          </div>
        </div>
      )}
    </main>
  )
}
