import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '+500', label: 'Pacientes Atendidos', desc: 'em Boa Vista e região' },
  { value: '98%', label: 'Satisfação', desc: 'avaliações 5 estrelas' },
  { value: '5+', label: 'Anos de Experiência', desc: 'no mercado odontológico' },
  { value: '15+', label: 'Tratamentos', desc: 'especializados disponíveis' },
]

export default function StatsBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} style={{ background: '#0A0F1A', overflow: 'hidden' }}>
      <div id="stats-bar-grid" style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 40px',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            style={{
              padding: '40px 28px',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              position: 'relative',
            }}
          >
            {i === 0 && (
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0, width: 3,
                background: 'var(--gold)',
              }} />
            )}
            <div style={{
              fontFamily: 'var(--font)', fontWeight: 800,
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              color: 'var(--gold)', lineHeight: 1,
              letterSpacing: '-0.03em', marginBottom: 8,
            }}>
              {s.value}
            </div>
            <div style={{
              fontFamily: 'var(--font)', fontWeight: 700,
              fontSize: '0.92rem', color: 'white',
              marginBottom: 4, textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}>
              {s.label}
            </div>
            <div style={{
              fontFamily: 'var(--font)', fontSize: '0.78rem',
              color: 'rgba(255,255,255,0.4)',
            }}>
              {s.desc}
            </div>
          </motion.div>
        ))}
      </div>
      <style>{`
        @media (max-width: 720px) {
          #stats-bar-grid { grid-template-columns: repeat(2,1fr) !important; }
          #stats-bar-grid > div:nth-child(2) { border-right: none !important; }
          #stats-bar-grid > div:nth-child(3) { border-right: 1px solid rgba(255,255,255,0.08) !important; }
          #stats-bar-grid > div:nth-child(odd) { border-bottom: 1px solid rgba(255,255,255,0.08); }
        }
      `}</style>
    </section>
  )
}
