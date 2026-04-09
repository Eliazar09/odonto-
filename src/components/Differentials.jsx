import { useEffect, useRef } from 'react'
import { Zap, Star, ShieldCheck, Clock, Smile, HeartHandshake } from 'lucide-react'
import { BlurFade } from './ui/BlurFade'

const diffs = [
  { icon: Zap, title: 'Resultados Rápidos', desc: 'Transformação visível já nas primeiras sessões com técnicas modernas de última geração.', color: '#F97316', bg: 'rgba(249,115,22,0.1)' },
  { icon: Star, title: 'Avaliação 5 Estrelas', desc: 'Nota máxima no Google com 48 avaliações reais de pacientes satisfeitos.', color: '#F97316', bg: 'rgba(249,115,22,0.08)' },
  { icon: ShieldCheck, title: 'Segurança Total', desc: 'Esterilização rigorosa, materiais de primeira linha e protocolos de biossegurança.', color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  { icon: Clock, title: 'Horários Flexíveis', desc: 'Atendemos em horários que cabem na sua rotina, inclusive aos sábados.', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)' },
  { icon: Smile, title: 'Atendimento Premium', desc: 'Do acolhimento ao pós-tratamento, você é tratado com atenção e cuidado real.', color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  { icon: HeartHandshake, title: 'Pagamento Facilitado', desc: 'Parcelas sem juros, convênios odontológicos e condições especiais para a família.', color: '#F97316', bg: 'rgba(249,115,22,0.1)' },
]

export default function Differentials() {
  const titleRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const all = [titleRef.current, ...cardRefs.current].filter(Boolean)
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.12 })
    all.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="diferenciais" style={{ padding: '100px 24px', background: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ display: 'inline-flex' }}>
            <ShieldCheck size={14} />
            Nossos Diferenciais
          </div>
          <h2 style={{
            fontFamily: 'var(--font)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            color: 'var(--gray-800)', lineHeight: 1.2,
            letterSpacing: '-0.025em', marginBottom: 16,
          }}>
            Por que escolher a{' '}
            <span className="text-gradient-gold">Clínica do Dente?</span>
          </h2>
          <p style={{ fontFamily: 'var(--font)', fontSize: '1.05rem', color: 'var(--gray-600)', maxWidth: 480, margin: '0 auto' }}>
            Somos mais do que uma clínica — somos parceiros do seu sorriso e da sua saúde.
          </p>
        </div>

        <div className="differentials-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {diffs.map((d, i) => (
            <div
              key={i}
              ref={el => cardRefs.current[i] = el}
              className={`reveal delay-${(i % 3) * 100 + 100}`}
              style={{
                display: 'flex', gap: 18, padding: '28px 24px',
                background: 'var(--gray-50)', borderRadius: 'var(--radius-lg)',
                border: '1.5px solid var(--gray-200)',
                transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                e.currentTarget.style.borderColor = d.color
                e.currentTarget.style.background = 'white'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'var(--gray-200)'
                e.currentTarget.style.background = 'var(--gray-50)'
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                background: d.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <d.icon size={22} color={d.color} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '1rem', color: 'var(--gray-800)', marginBottom: 8 }}>
                  {d.title}
                </h3>
                <p style={{ fontFamily: 'var(--font)', fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.65 }}>
                  {d.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
