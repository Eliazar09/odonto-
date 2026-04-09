import { useEffect, useRef } from 'react'
import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    name: 'Ana Paula S.',
    avatar: 'AP',
    rating: 5,
    text: 'Em menos de 1 ano meus dentes mudaram muito! A equipe é incrível, atenciosa e o resultado superou todas as minhas expectativas.',
    service: 'Ortodontia',
    color: '#38D39F',
  },
  {
    name: 'Marcos Ribeiro',
    avatar: 'MR',
    rating: 5,
    text: 'Atendimento perfeito do início ao fim. Ambiente super acolhedor, profissionais competentes. Já indiquei para toda a família!',
    service: 'Clareamento',
    color: '#4FC3F7',
  },
  {
    name: 'Fernanda Lima',
    avatar: 'FL',
    rating: 5,
    text: 'A melhor clínica odontológica de Boa Vista! Meu filho se sentiu super confortável. Recomendo de olhos fechados.',
    service: 'Odontopediatria',
    color: '#D4A017',
  },
  {
    name: 'João Carlos',
    avatar: 'JC',
    rating: 5,
    text: 'Fiz clareamento e limpeza e ficou impecável! Preço justo, agendamento fácil e resultado visível desde a primeira sessão.',
    service: 'Estética',
    color: '#38D39F',
  },
  {
    name: 'Camila Torres',
    avatar: 'CT',
    rating: 5,
    text: 'Saí da consulta com um sorriso enorme no rosto — e não é só por causa do dente! A experiência toda foi muito positiva.',
    service: 'Limpeza',
    color: '#4FC3F7',
  },
  {
    name: 'Rafael Mendes',
    avatar: 'RM',
    rating: 5,
    text: 'Profissionalismo e cuidado em cada detalhe. A Clínica do Dente é referência em Boa Vista. Minha confiança está de volta!',
    service: 'Ortodontia',
    color: '#D4A017',
  },
]

function ReviewCard({ review, delay }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className={`review-card reveal delay-${delay}`} style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 20, right: 20, opacity: 0.08 }}>
        <Quote size={40} color="var(--gold)" />
      </div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} size={16} fill="#F0C84A" color="#F0C84A" />
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font)', fontSize: '0.95rem', color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: 20 }}>
        "{review.text}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 42, height: 42, borderRadius: '50%',
          background: review.color, color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font)', fontWeight: 700, fontSize: '0.82rem',
          flexShrink: 0,
        }}>
          {review.avatar}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--gray-800)' }}>
            {review.name}
          </div>
          <div style={{
            fontFamily: 'var(--font)', fontSize: '0.75rem', fontWeight: 500,
            color: review.color, background: `${review.color}18`,
            padding: '2px 10px', borderRadius: 50, display: 'inline-block', marginTop: 2,
          }}>
            {review.service}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SocialProof() {
  const titleRef = useRef(null)
  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="avaliacoes" style={{
      padding: '100px 24px',
      background: 'var(--gray-50)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ display: 'inline-flex' }}>
            <Star size={14} fill="var(--gold)" color="var(--gold)" />
            Avaliações Reais
          </div>
          <h2 style={{
            fontFamily: 'var(--font)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            color: 'var(--gray-800)', lineHeight: 1.2,
            letterSpacing: '-0.025em', marginBottom: 16,
          }}>
            O que nossos pacientes <span className="text-gradient-gold">dizem sobre nós</span>
          </h2>
          <p style={{ fontFamily: 'var(--font)', fontSize: '1.05rem', color: 'var(--gray-600)', maxWidth: 500, margin: '0 auto' }}>
            Mais de 500 sorrisos transformados e centenas de histórias reais de cuidado e resultado.
          </p>
          {/* Stars summary */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 24 }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} fill="#F0C84A" color="#F0C84A" />
              ))}
            </div>
            <span style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--gray-800)' }}>5.0</span>
            <span style={{ fontFamily: 'var(--font)', fontSize: '0.9rem', color: 'var(--gray-500)' }}>· 48 avaliações no Google</span>
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {reviews.map((r, i) => (
            <ReviewCard key={i} review={r} delay={(i % 3) * 100 + 100} />
          ))}
        </div>
      </div>
    </section>
  )
}
