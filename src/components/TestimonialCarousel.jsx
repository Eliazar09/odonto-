import { useState } from 'react'
import { motion } from 'framer-motion'
import { BlurFade } from './ui/BlurFade'

const testimonials = [
  {
    id: 1,
    name: 'Ana Paula Sousa',
    role: 'Ortodontia',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    text: 'Fiz o tratamento de ortodontia aqui e o resultado superou todas as expectativas. A equipe é incrível, atenciosa e extremamente profissional. Recomendo sem hesitar!',
    stars: 5,
  },
  {
    id: 2,
    name: 'Carlos Mendes',
    role: 'Clareamento Dental',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    text: 'Em apenas 3 sessões de clareamento meu sorriso ficou completamente diferente. O atendimento humanizado e o ambiente acolhedor fazem toda a diferença.',
    stars: 5,
  },
  {
    id: 3,
    name: 'Fernanda Lima',
    role: 'Facetas de Porcelana',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    text: 'As facetas de porcelana transformaram meu sorriso. Finalmente tenho a confiança que sempre quis. A doutora foi extremamente cuidadosa em cada etapa do processo.',
    stars: 5,
  },
  {
    id: 4,
    name: 'Ricardo Alves',
    role: 'Implante Dental',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    text: 'O implante foi muito melhor do que esperava. Procedimento sem dor, resultado natural e profissionalismo em todos os detalhes. Estou muito satisfeito.',
    stars: 5,
  },
  {
    id: 5,
    name: 'Mariana Costa',
    role: 'Toda a família',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    text: 'Melhor clínica de Boa Vista com certeza. Atendimento impecável, ambiente moderno e os resultados são reais. Hoje toda a minha família é paciente da Clínica do Dente.',
    stars: 5,
  },
]

function StarRating({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F97316">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [exitX, setExitX] = useState(0)

  const next = () => {
    setExitX(-200)
    setTimeout(() => {
      setCurrent(p => (p + 1) % testimonials.length)
      setExitX(0)
    }, 200)
  }
  const prev = () => {
    setExitX(200)
    setTimeout(() => {
      setCurrent(p => (p - 1 + testimonials.length) % testimonials.length)
      setExitX(0)
    }, 200)
  }

  return (
    <section id="depoimentos" style={{ padding: '100px 24px', background: 'var(--gray-50)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <BlurFade delay={0} style={{ textAlign: 'center', marginBottom: 60 }}>
          <p style={{
            fontFamily: 'var(--font)', fontSize: '0.82rem', fontWeight: 600,
            color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            Avaliações
          </p>
          <h2 style={{
            fontFamily: 'var(--font)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            color: 'var(--gray-800)', letterSpacing: '-0.025em', marginBottom: 16,
          }}>
            O que nossos pacientes dizem
          </h2>
          <p style={{ fontFamily: 'var(--font)', fontSize: '1rem', color: 'var(--gray-600)', maxWidth: 440, margin: '0 auto' }}>
            Mais de 48 avaliações 5 estrelas no Google — veja o que eles falam.
          </p>
        </BlurFade>

        {/* Stacked card carousel */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          {/* Arrow prev */}
          <button
            onClick={prev}
            style={{
              width: 44, height: 44, borderRadius: '50%', border: '1.5px solid var(--gray-200)',
              background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s', flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.color = 'inherit' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Cards stack */}
          <div className="testimonial-stack" style={{ position: 'relative', width: 340, height: 280 }}>
            {testimonials.map((t, index) => {
              const offset = (index - current + testimonials.length) % testimonials.length
              const isActive = offset === 0
              const isPrev = offset === 1
              const isPrevPrev = offset === 2
              if (offset > 2) return null

              return (
                <motion.div
                  key={t.id}
                  drag={isActive ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) > 80) {
                      info.offset.x > 0 ? prev() : next()
                    }
                  }}
                  animate={{
                    scale: isActive ? 1 : isPrev ? 0.95 : 0.9,
                    y: isActive ? 0 : isPrev ? 10 : 20,
                    rotate: isActive ? 0 : isPrev ? -2 : -4,
                    opacity: isActive ? 1 : isPrev ? 0.65 : 0.35,
                    x: isActive ? exitX : 0,
                    zIndex: isActive ? 3 : isPrev ? 2 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  style={{
                    position: 'absolute', inset: 0, borderRadius: 20,
                    background: 'white', padding: 28,
                    boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
                    border: '1.5px solid var(--gray-200)',
                    cursor: isActive ? 'grab' : 'default',
                    userSelect: 'none',
                  }}
                >
                  <StarRating count={t.stars} />
                  <p style={{
                    fontFamily: 'var(--font)', fontSize: '0.9rem', color: 'var(--gray-700)',
                    lineHeight: 1.65, margin: '14px 0 20px',
                  }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={t.avatar} alt={t.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--gray-800)' }}>{t.name}</div>
                      <div style={{ fontFamily: 'var(--font)', fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 600 }}>{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Arrow next */}
          <button
            onClick={next}
            style={{
              width: 44, height: 44, borderRadius: '50%', border: '1.5px solid var(--gray-200)',
              background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s', flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.color = 'inherit' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

      <style>{`
        @media (max-width: 400px) {
          .testimonial-stack { width: 92vw !important; }
          #depoimentos .testimonial-stack > div { width: 92vw !important; }
        }
        @media (max-width: 767px) {
          #depoimentos { padding: 64px 16px !important; }
        }
      `}</style>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: current === i ? 24 : 8, height: 8,
                borderRadius: 50, border: 'none', cursor: 'pointer',
                background: current === i ? 'var(--gold)' : 'var(--gray-300)',
                transition: 'all 0.3s ease', padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
