import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { BlurFade } from './ui/BlurFade'

const services = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C9 2 7 4 7 6.5c0 1.5.5 2.5 1 3.5L9 14c.5 2 1 4 3 5s2.5-3 3-5l1-4c.5-1 1-2 1-3.5C17 4 15 2 12 2z" fill="currentColor" opacity="0.9"/>
        <circle cx="12" cy="7" r="1.5" fill="white" opacity="0.6"/>
      </svg>
    ),
    title: 'Ortodontia',
    desc: 'Aparelhos fixos, removíveis e alinhadores invisíveis para um sorriso perfeito e funcional.',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.1)',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M4 12h16M4 8h16M4 16h10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="17" cy="16" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 17h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Limpeza Dental',
    desc: 'Profilaxia completa com remoção de tártaro, clareamento e polimento para um sorriso fresco.',
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.1)',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 3 L8 7 L4 11 L8 15 L12 21 L16 15 L20 11 L16 7 Z" fill="currentColor" opacity="0.85"/>
        <path d="M12 3 L12 21" stroke="white" strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
    title: 'Clareamento',
    desc: 'Técnicas modernas de clareamento com resultados visíveis já nas primeiras sessões.',
    color: '#F97316',
    bg: 'rgba(249,115,22,0.1)',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8 2 5 5 5 9c0 3 2 5.5 4 7l3 4 3-4c2-1.5 4-4 4-7 0-4-3-7-7-7z" fill="currentColor" opacity="0.85"/>
        <path d="M9 10 Q12 7 15 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
    title: 'Estética Dental',
    desc: 'Facetas, lentes de contato dental e harmonização do sorriso para resultados extraordinários.',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.1)',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M8 20 Q12 18 16 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M12 4C9.5 4 8 6 8 8c0 1.2.4 2 .8 2.8L10 14c.4 1.6.8 3.2 2 4 1.2-.8 1.6-2.4 2-4l1.2-3.2c.4-.8.8-1.6.8-2.8C16 6 14.5 4 12 4z" fill="currentColor" opacity="0.85"/>
        <circle cx="12" cy="8" r="1.5" fill="white" opacity="0.5"/>
      </svg>
    ),
    title: 'Odonto Infantil',
    desc: 'Atendimento especializado para crianças em ambiente lúdico, seguro e acolhedor.',
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.1)',
  },
]

function ServiceCard({ service, delay }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className={`service-card reveal delay-${delay}`} style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: -30, right: -30, width: 100, height: 100,
        borderRadius: '50%', background: service.bg, pointerEvents: 'none',
      }} />
      <div className="service-icon" style={{ background: service.bg, color: service.color }}>
        {service.icon}
      </div>
      <h3 style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--gray-800)', marginBottom: 10 }}>
        {service.title}
      </h3>
      <p style={{ fontFamily: 'var(--font)', fontSize: '0.88rem', color: 'var(--gray-600)', lineHeight: 1.65, marginBottom: 18 }}>
        {service.desc}
      </p>
      <a
        href={`https://wa.me/5595991235500?text=Oi!%20Gostaria%20de%20saber%20mais%20sobre%20${encodeURIComponent(service.title)}`}
        target="_blank" rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--font)', fontSize: '0.83rem', fontWeight: 600,
          color: service.color, textDecoration: 'none',
          transition: 'gap 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.gap = '10px'}
        onMouseLeave={e => e.currentTarget.style.gap = '6px'}
      >
        Saiba mais <ArrowRight size={14} />
      </a>
    </div>
  )
}

export default function Services() {
  const titleRef = useRef(null)
  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="servicos" style={{ background: 'white' }}>
      {/* Dark accent header */}
      <div id="servicos-header" style={{
        background: '#0A0F1A',
        padding: '64px 24px 48px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: -120, transform: 'translateY(-50%)',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div ref={titleRef} className="reveal" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font)', fontSize: '0.75rem', fontWeight: 700,
            color: 'var(--gold)', letterSpacing: '0.18em',
            textTransform: 'uppercase', marginBottom: 16,
          }}>Nossos Serviços</p>
          <div id="servicos-header-inner" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <h2 style={{
              fontFamily: 'var(--font)', fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              color: 'white', lineHeight: 1.1,
              letterSpacing: '-0.03em', textTransform: 'uppercase',
              maxWidth: 520,
            }}>
              Cuidado completo para{' '}
              <span style={{ color: 'var(--gold)' }}>cada sorriso</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font)', fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.45)', maxWidth: 360, lineHeight: 1.7,
            }}>
              Do preventivo ao estético, tratamentos modernos com tecnologia e humanidade.
            </p>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div id="servicos-cards" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 24,
        }}>
          {services.map((s, i) => (
            <ServiceCard key={i} service={s} delay={(i % 3) * 100 + 100} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a
            href="https://wa.me/5595991235500?text=Oi!%20Gostaria%20de%20agendar%20uma%20consulta."
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
          >
            Agendar Minha Consulta
          </a>
        </div>
      </div>
    </section>
  )
}
