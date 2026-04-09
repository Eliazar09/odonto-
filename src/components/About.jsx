import { useEffect, useRef, useState } from 'react'
import { Heart, Shield, Users, Award } from 'lucide-react'
import { BlurFade } from './ui/BlurFade'
import { searchPexels } from '../lib/pexels'

const values = [
  { icon: Heart, label: 'Atendimento Humanizado', desc: 'Cada paciente é único. Cuidamos com empatia e atenção real.' },
  { icon: Shield, label: 'Ambiente Acolhedor', desc: 'Espaço moderno, seguro e pensado para o seu conforto.' },
  { icon: Users, label: 'Empresa Inclusiva', desc: 'LGBTQ+ friendly. Aqui todos são bem-vindos sem exceção.' },
  { icon: Award, label: 'Liderada por Mulheres', desc: 'Gestão feminina com excelência, cuidado e propósito.' },
]

export default function About() {
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const [aboutImg, setAboutImg] = useState('')

  useEffect(() => {
    const els = [leftRef.current, rightRef.current]
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.15 })
    els.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    searchPexels('dentist doctor woman clinic professional', 1, 'portrait').then(p => {
      if (p[0]) setAboutImg(p[0].src.large)
    })
  }, [])

  return (
    <section id="sobre" style={{ padding: '100px 24px', background: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div id="about-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 72, alignItems: 'center',
        }}>
          {/* Image side */}
          <div ref={leftRef} className="reveal-left" style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 24, overflow: 'hidden',
              boxShadow: '0 32px 72px rgba(0,0,0,0.12)',
              aspectRatio: '4/5',
            }}>
              {aboutImg && (
                <img
                  src={aboutImg}
                  alt="Clínica do Dente - Boa Vista"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              )}
            </div>
            {/* Floating stat card — kept inside column bounds */}
            <div style={{
              position: 'absolute', bottom: 16, right: 16,
              background: 'white', borderRadius: 20, padding: '18px 22px',
              boxShadow: '0 12px 36px rgba(0,0,0,0.12)',
              border: '1px solid var(--gray-200)', minWidth: 160,
            }}>
              <div style={{ fontFamily: 'var(--font)', fontWeight: 800, fontSize: '2rem', color: 'var(--gold)', lineHeight: 1 }}>
                +500
              </div>
              <div style={{ fontFamily: 'var(--font)', fontSize: '0.85rem', color: 'var(--gray-600)', marginTop: 4 }}>
                pacientes satisfeitos
              </div>
            </div>
            {/* Decorative blob */}
            <div style={{
              position: 'absolute', top: -20, left: -20,
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
              opacity: 0.25, zIndex: -1,
            }} />
          </div>

          {/* Content side */}
          <div ref={rightRef} className="reveal-right">
            <div className="section-label">
              <Heart size={14} fill="var(--gold)" color="var(--gold)" />
              Sobre a Clínica
            </div>
            <h2 style={{
              fontFamily: 'var(--font)', fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              color: 'var(--gray-800)', lineHeight: 1.2,
              letterSpacing: '-0.025em', marginBottom: 20,
            }}>
              Mais do que uma clínica —{' '}
              <span className="text-gradient-green">um espaço de cuidado</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font)', fontSize: '1rem', color: 'var(--gray-600)',
              lineHeight: 1.8, marginBottom: 36,
            }}>
              A Clínica do Dente nasceu com um propósito: transformar a experiência odontológica em
              Boa Vista. Acreditamos que saúde bucal é saúde plena — e que todo paciente merece
              atenção, acolhimento e resultados de verdade.
            </p>

            {/* Values grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20,
            }}>
              {values.map((v, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                  padding: '18px', borderRadius: 16,
                  background: 'var(--gray-50)', border: '1px solid var(--gray-200)',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                  cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: 'rgba(249,115,22,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <v.icon size={18} color="var(--gold)" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--gray-800)', marginBottom: 4 }}>
                      {v.label}
                    </div>
                    <div style={{ fontFamily: 'var(--font)', fontSize: '0.8rem', color: 'var(--gray-600)', lineHeight: 1.5 }}>
                      {v.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
