'use client'

import { useState, useRef } from 'react'
import { Heart, Play, Pause, Volume2, VolumeX } from 'lucide-react'

export default function ApologyContent() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleStart = () => {
    setHasStarted(true)
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  if (!hasStarted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <FloatingHearts />
        <div className="max-w-md relative z-10">
          <Heart className="w-20 h-20 mx-auto text-primary mb-8 animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Tienes un mensaje especial
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Alguien tiene algo muy importante que decirte. 
            Este mensaje solo puedes verlo una vez.
          </p>
          <button
            onClick={handleStart}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <Play className="w-5 h-5" />
            Ver Mensaje
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      
      <FloatingHearts />

      {/* Audio element */}
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2024/11/04/audio_a0189ac98b.mp3"
      />

      {/* Audio controls */}
      <div className="fixed top-6 right-6 flex gap-2 z-20">
        <button
          onClick={togglePlay}
          className="p-3 bg-card/80 backdrop-blur-sm rounded-full border border-border hover:bg-secondary transition-colors"
          aria-label={isPlaying ? 'Pausar musica' : 'Reproducir musica'}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button
          onClick={toggleMute}
          className="p-3 bg-card/80 backdrop-blur-sm rounded-full border border-border hover:bg-secondary transition-colors"
          aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="max-w-2xl w-full text-center">
          {/* Animated heart */}
          <div className="mb-8 opacity-0 animate-fade-in-up">
            <Heart className="w-16 h-16 mx-auto text-primary animate-pulse" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 opacity-0 animate-fade-in-up animation-delay-300 text-balance">
            Perdoname
          </h1>

          {/* Message */}
          <div className="space-y-6 text-lg md:text-xl text-foreground/90 leading-relaxed opacity-0 animate-fade-in-up animation-delay-600">
            <p>
              Se que las palabras a veces no son suficientes, 
              pero quiero que sepas que lo siento de verdad.
            </p>
            <p>
              Me equivoque, y cada dia que pasa me doy cuenta 
              de lo importante que eres para mi.
            </p>
            <p>
              No te pido que olvides, solo que me des la oportunidad 
              de demostrarte que puedo ser mejor.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-12 opacity-0 animate-fade-in-up animation-delay-900">
            <p className="text-2xl md:text-3xl font-semibold text-primary italic">
              Con todo mi corazon
            </p>
          </div>

          {/* Bottom hearts */}
          <div className="mt-12 flex justify-center gap-4 opacity-0 animate-fade-in-up animation-delay-1200">
            <Heart className="w-6 h-6 text-primary/60" fill="currentColor" />
            <Heart className="w-8 h-8 text-primary" fill="currentColor" />
            <Heart className="w-6 h-6 text-primary/60" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Footer message */}
      <div className="p-6 text-center opacity-0 animate-fade-in-up animation-delay-1200 relative z-10">
        <p className="text-sm text-muted-foreground/60">
          Este mensaje fue creado especialmente para ti y ya no podra verse de nuevo.
        </p>
      </div>
    </main>
  )
}

function FloatingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <Heart className="absolute top-[10%] left-[5%] w-6 h-6 text-primary/10 animate-float" />
      <Heart className="absolute top-[20%] right-[10%] w-8 h-8 text-accent/10 animate-float-delayed" />
      <Heart className="absolute top-[40%] left-[8%] w-5 h-5 text-primary/15 animate-float" />
      <Heart className="absolute top-[30%] right-[5%] w-7 h-7 text-accent/10 animate-float-delayed" />
      <Heart className="absolute top-[60%] left-[3%] w-9 h-9 text-primary/10 animate-float" />
      <Heart className="absolute top-[50%] right-[8%] w-6 h-6 text-accent/15 animate-float-delayed" />
      <Heart className="absolute top-[70%] left-[10%] w-5 h-5 text-primary/10 animate-float" />
      <Heart className="absolute top-[80%] right-[15%] w-8 h-8 text-accent/10 animate-float-delayed" />
      <Heart className="absolute bottom-[10%] left-[15%] w-7 h-7 text-primary/15 animate-float" />
      <Heart className="absolute bottom-[20%] right-[3%] w-6 h-6 text-accent/10 animate-float-delayed" />
    </div>
  )
}
