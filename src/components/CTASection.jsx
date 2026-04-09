import { useEffect, useRef } from 'react'
import { MessageCircle, CalendarCheck, Star, Users, Award } from 'lucide-react'

export default function CTASection() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="cta" style={{
      padding: '100px 24px',
      background: 'linear-gradient(135deg, #0D2B22 0%, #0A2233 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: -100, left: -100, width: 400, height: 400,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, right: -80, width: 360, height: 360,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '50%', right: '20%', width: 200, height: 200,
        borderRadius: '50%', transform: 'translateY(-50%)',
        background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div ref={ref} className="reveal" style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: 50, padding: '7px 18px', marginBottom: 28,
        }}>
          <span style={{ fontFamily: 'var(--font)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--green)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Pronto para transformar?
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font)', fontWeight: 800,
          fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
          lineHeight: 1.15, letterSpacing: '-0.03em',
          color: 'white', marginBottom: 20,
        }}>
          Seu novo sorriso{' '}
          <span style={{
            background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>começa hoje</span>
        </h2>

        <p style={{
          fontFamily: 'var(--font)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)',
          lineHeight: 1.75, marginBottom: 44, maxWidth: 520, margin: '0 auto 44px',
        }}>
          Agende agora via WhatsApp e receba atendimento humanizado,
          resultado real e condições especiais para você e sua família.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://wa.me/5595991235500?text=Oi!%20Gostaria%20de%20agendar%20uma%20consulta."
            target="_blank" rel="noopener noreferrer"
            className="btn-whatsapp animate-pulse-glow"
            style={{ fontSize: '1.05rem', padding: '16px 32px' }}
          >
            <MessageCircle size={20} />
            Agendar no WhatsApp
          </a>
          <a
            href="tel:+5595991235500"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font)', fontWeight: 600, fontSize: '1rem',
              color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
              padding: '16px 28px', border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: 50, transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
          >
            <CalendarCheck size={18} />
            (95) 99123-5500
          </a>
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 52, flexWrap: 'wrap' }}>
          {[
            { Icon: Star, label: '5.0 Google', sub: '48 avaliações', color: '#F97316' },
            { Icon: Users, label: '+500 pacientes', sub: 'satisfeitos', color: '#10B981' },
            { Icon: Award, label: 'Referência', sub: 'em Boa Vista', color: '#06B6D4' },
          ].map(({ Icon, label, sub, color }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} color={color} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '0.9rem', color: 'white' }}>{label}</div>
                <div style={{ fontFamily: 'var(--font)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
