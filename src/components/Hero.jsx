import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, CalendarCheck, ArrowRight } from 'lucide-react'
import { searchPexels } from '../lib/pexels'

const features = [
  { label: 'Ortodontia', desc: 'Aparelhos e alinhadores' },
  { label: 'Clareamento', desc: 'Até 8 tons mais branco' },
  { label: 'Estética Dental', desc: 'Facetas e lentes' },
]

export default function Hero() {
  const [heroImg, setHeroImg] = useState('')

  useEffect(() => {
    searchPexels('dental clinic patient treatment professional', 1, 'landscape').then(photos => {
      if (photos[0]) setHeroImg(photos[0].src.large2x || photos[0].src.large)
    })
  }, [])

  return (
    <section id="hero" style={{
      position: 'relative', minHeight: '100dvh',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Background image + overlays */}
      {heroImg && (
        <img
          src={heroImg}
          alt="Clínica do Dente"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            zIndex: 0,
          }}
          loading="eager"
        />
      )}
      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(5,10,18,0.72) 0%, rgba(5,10,18,0.55) 60%, rgba(5,10,18,0.82) 100%)',
      }} />
      {/* Orange accent stripe top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 4, background: 'var(--gold)', zIndex: 3,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        maxWidth: 1200, margin: '0 auto', padding: '120px 40px 60px',
        width: '100%',
      }}>
        {/* Google badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 50, padding: '7px 16px', marginBottom: 32,
            alignSelf: 'flex-start',
          }}
        >
          <div style={{ display: 'flex', gap: 2 }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#F97316" color="#F97316" />)}
          </div>
          <span style={{ fontFamily: 'var(--font)', fontSize: '0.8rem', fontWeight: 600, color: 'white' }}>
            5.0 Google · 48 avaliações
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font)', fontWeight: 800,
            fontSize: 'clamp(2.6rem, 6vw, 5rem)',
            lineHeight: 1.08, letterSpacing: '-0.03em',
            color: 'white', marginBottom: 24,
            textTransform: 'uppercase',
            maxWidth: 780,
          }}
        >
          Seu sorriso{' '}
          <span style={{ color: '#F97316' }}>lindo</span>
          <br />começa aqui
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: 'var(--font)', fontSize: '1.1rem', fontWeight: 400,
            color: 'rgba(255,255,255,0.75)', lineHeight: 1.7,
            maxWidth: 520, marginBottom: 40,
          }}
        >
          Atendimento moderno, humanizado e com resultados reais.
          Cuidamos do seu sorriso com a atenção que você merece.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}
        >
          <a
            href="#agenda"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              fontFamily: 'var(--font)', fontWeight: 700, fontSize: '0.95rem',
              background: 'var(--gold)', color: 'white',
              padding: '14px 28px', borderRadius: 50,
              textDecoration: 'none', letterSpacing: '0.01em',
              transition: 'transform 0.2s, background 0.2s',
              boxShadow: '0 8px 28px rgba(249,115,22,0.4)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#EA580C'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'var(--gold)'; }}
          >
            <CalendarCheck size={18} />
            Agendar Consulta
          </a>
          <a
            href="#servicos"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.95rem',
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
              color: 'white', padding: '14px 28px', borderRadius: 50,
              textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.3)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          >
            Ver Serviços
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>

      {/* Bottom feature strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        style={{
          position: 'relative', zIndex: 2,
          background: 'rgba(5,10,18,0.72)', backdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 40px',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
          {features.map((f, i) => (
            <a
              key={i}
              href="#servicos"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '22px 24px', textDecoration: 'none',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                transition: 'background 0.2s',
                gap: 12,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(249,115,22,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div>
                <div style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '0.95rem', color: 'white', marginBottom: 3 }}>
                  {f.label}
                </div>
                <div style={{ fontFamily: 'var(--font)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>
                  {f.desc}
                </div>
              </div>
              <ArrowRight size={16} color="rgba(249,115,22,0.8)" />
            </a>
          ))}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 680px) {
          #hero > div:first-of-type { padding: 100px 20px 40px !important; }
          #hero h1 { font-size: clamp(2rem,10vw,3rem) !important; }
          #hero > div:last-of-type > div { grid-template-columns: 1fr !important; }
          #hero > div:last-of-type a { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.1); }
        }
      `}</style>
    </section>
  )
}
