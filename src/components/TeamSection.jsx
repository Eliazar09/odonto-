import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BlurFade } from './ui/BlurFade'
import { searchPexels } from '../lib/pexels'
import { MessageCircle } from 'lucide-react'

const members = [
  { name: 'Dra. Clínica do Dente', role: 'Ortodontia & Estética', croBadge: 'CRO-RR', query: 'female doctor dentist professional portrait white coat' },
  { name: 'Dr. Clínica do Dente', role: 'Implantes & Cirurgia', croBadge: 'CRO-RR', query: 'male doctor dentist professional portrait white coat' },
  { name: 'Dra. Clínica do Dente', role: 'Odontopediatria', croBadge: 'CRO-RR', query: 'woman doctor nurse medical professional portrait' },
]

export default function TeamSection() {
  const [photos, setPhotos] = useState(members.map(() => ''))

  useEffect(() => {
    members.forEach(async (m, i) => {
      const p = await searchPexels(m.query, 1, 'portrait')
      if (p[0]) setPhotos(prev => { const n = [...prev]; n[i] = p[0].src.medium; return n })
    })
  }, [])

  return (
    <section id="equipe" style={{ padding: '100px 24px', background: '#0A0F1A', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative bg */}
      <div style={{
        position: 'absolute', top: '50%', right: -200, transform: 'translateY(-50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <BlurFade delay={0}>
          <div style={{ marginBottom: 64 }}>
            <p style={{
              fontFamily: 'var(--font)', fontSize: '0.78rem', fontWeight: 700,
              color: 'var(--gold)', letterSpacing: '0.16em',
              textTransform: 'uppercase', marginBottom: 16,
            }}>Nossa Equipe</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
              <h2 style={{
                fontFamily: 'var(--font)', fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                lineHeight: 1.1, letterSpacing: '-0.03em',
                color: 'white', textTransform: 'uppercase',
                maxWidth: 560,
              }}>
                Mãos cuidadosas,{' '}
                <span style={{ color: 'var(--gold)' }}>expertise profissional</span>
              </h2>
              <p style={{
                fontFamily: 'var(--font)', fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.5)', maxWidth: 360, lineHeight: 1.7,
              }}>
                Nossa equipe é formada por especialistas comprometidos com a sua saúde bucal e o seu sorriso.
              </p>
            </div>
          </div>
        </BlurFade>

        {/* Team grid */}
        <div id="team-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderRadius: 20, overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.04)',
                position: 'relative',
                cursor: 'default',
              }}
            >
              {/* Photo */}
              <div style={{ aspectRatio: '4/5', background: '#141A28', position: 'relative', overflow: 'hidden' }}>
                {photos[i] ? (
                  <img
                    src={photos[i]}
                    alt={m.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                    loading="lazy"
                  />
                ) : (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(90deg, #1a2030 25%, #141a28 50%, #1a2030 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.4s infinite',
                  }} />
                )}
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(10,15,26,0.9) 0%, rgba(10,15,26,0.2) 50%, transparent 100%)',
                }} />
                {/* CRO badge */}
                <div style={{
                  position: 'absolute', top: 16, left: 16,
                  background: 'var(--gold)', borderRadius: 8,
                  padding: '5px 12px',
                  fontFamily: 'var(--font)', fontSize: '0.72rem',
                  fontWeight: 700, color: 'white', letterSpacing: '0.06em',
                }}>
                  {m.croBadge}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font)', fontWeight: 700,
                    fontSize: '1rem', color: 'white', marginBottom: 4,
                  }}>
                    {m.name}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font)', fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.45)',
                  }}>
                    {m.role}
                  </div>
                </div>
                <a
                  href="https://wa.me/5595991235500"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    width: 38, height: 38, borderRadius: 12, flexShrink: 0,
                    background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(249,115,22,0.15)'}
                >
                  <MessageCircle size={16} color="var(--gold)" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
