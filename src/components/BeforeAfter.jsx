import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const cases = [
  {
    label: 'Ortodontia',
    before: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=500&q=80&fit=crop',
    after: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&q=80&fit=crop',
    duration: '12 meses',
    desc: 'Correção de apinhamento e mordida com aparelho fixo',
  },
  {
    label: 'Clareamento',
    before: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=500&q=80&fit=crop',
    after: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&q=80&fit=crop',
    duration: '3 sessões',
    desc: 'Clareamento a laser com 8 tons de diferença',
  },
  {
    label: 'Estética',
    before: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&q=80&fit=crop',
    after: 'https://images.unsplash.com/photo-1571674305471-4ff3e3dd01db?w=500&q=80&fit=crop',
    duration: '2 semanas',
    desc: 'Facetas em porcelana para harmonização do sorriso',
  },
]

function CaseCard({ c, active }) {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const updatePos = (clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    setSliderPos(pct)
  }

  const onMouseDown = () => { dragging.current = true }
  const onMouseUp = () => { dragging.current = false }
  const onMouseMove = (e) => { if (dragging.current) updatePos(e.clientX) }
  const onTouchMove = (e) => { updatePos(e.touches[0].clientX) }

  return (
    <div style={{
      opacity: active ? 1 : 0,
      transform: active ? 'scale(1)' : 'scale(0.95)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
      position: active ? 'relative' : 'absolute',
      width: '100%',
    }}>
      <div
        ref={containerRef}
        onMouseDown={onMouseDown} onMouseUp={onMouseUp}
        onMouseMove={onMouseMove} onMouseLeave={onMouseUp}
        onTouchMove={onTouchMove}
        style={{
          position: 'relative', borderRadius: 20, overflow: 'hidden',
          cursor: 'ew-resize', aspectRatio: '4/3',
          boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
          userSelect: 'none',
        }}
      >
        {/* Before */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src={c.before} alt="Antes" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
          <div style={{
            position: 'absolute', top: 14, left: 14,
            background: 'rgba(0,0,0,0.55)', color: 'white',
            fontFamily: 'var(--font)', fontWeight: 700, fontSize: '0.78rem',
            padding: '5px 12px', borderRadius: 50, backdropFilter: 'blur(4px)',
            letterSpacing: '0.08em',
          }}>ANTES</div>
        </div>
        {/* After */}
        <div style={{
          position: 'absolute', inset: 0,
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
          transition: 'none',
        }}>
          <img src={c.after} alt="Depois" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
          <div style={{
            position: 'absolute', top: 14, right: 14,
            background: 'var(--green)', color: 'white',
            fontFamily: 'var(--font)', fontWeight: 700, fontSize: '0.78rem',
            padding: '5px 12px', borderRadius: 50,
            letterSpacing: '0.08em',
          }}>DEPOIS</div>
        </div>
        {/* Divider line */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          left: `${sliderPos}%`, transform: 'translateX(-50%)',
          width: 3, background: 'white', zIndex: 5,
          boxShadow: '0 0 8px rgba(0,0,0,0.3)',
        }}>
          {/* Handle */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 44, height: 44, background: 'white',
            borderRadius: '50%', boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0,
          }}>
            <ChevronLeft size={14} color="var(--gray-600)" />
            <ChevronRight size={14} color="var(--gray-600)" />
          </div>
        </div>
      </div>
      {/* Case info */}
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
        <div>
          <h4 style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--gray-800)', marginBottom: 6 }}>
            {c.label}
          </h4>
          <p style={{ fontFamily: 'var(--font)', fontSize: '0.88rem', color: 'var(--gray-600)', lineHeight: 1.5 }}>
            {c.desc}
          </p>
        </div>
        <div style={{
          flexShrink: 0, background: 'rgba(56,211,159,0.1)', border: '1px solid rgba(56,211,159,0.25)',
          borderRadius: 12, padding: '8px 16px', textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--green)' }}>
            {c.duration}
          </div>
          <div style={{ fontFamily: 'var(--font)', fontSize: '0.72rem', color: 'var(--gray-600)' }}>tratamento</div>
        </div>
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  const [current, setCurrent] = useState(0)
  const titleRef = useRef(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="resultados" style={{ padding: '100px 24px', background: 'var(--gray-50)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ display: 'inline-flex' }}>
            <span>✨</span>
            Resultados Reais
          </div>
          <h2 style={{
            fontFamily: 'var(--font)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            color: 'var(--gray-800)', lineHeight: 1.2,
            letterSpacing: '-0.025em', marginBottom: 16,
          }}>
            Antes e <span className="text-gradient-green">depois que</span>{' '}
            <span className="text-gradient-gold">impressionam</span>
          </h2>
          <p style={{ fontFamily: 'var(--font)', fontSize: '1.05rem', color: 'var(--gray-600)', maxWidth: 500, margin: '0 auto' }}>
            Arraste o divisor para ver a transformação real dos nossos pacientes.
          </p>
        </div>

        {/* Slider tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 40 }}>
          {cases.map((c, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.85rem',
              padding: '9px 20px', borderRadius: 50,
              background: current === i ? 'var(--green)' : 'white',
              color: current === i ? 'white' : 'var(--gray-600)',
              border: current === i ? '2px solid var(--green)' : '2px solid var(--gray-200)',
              cursor: 'pointer', transition: 'all 0.25s',
            }}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Case viewer */}
        <div style={{ position: 'relative', minHeight: 380 }}>
          {cases.map((c, i) => (
            i === current && <CaseCard key={i} c={c} active={true} />
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 32 }}>
          <button
            onClick={() => setCurrent(p => (p - 1 + cases.length) % cases.length)}
            style={{
              width: 44, height: 44, borderRadius: '50%', border: '2px solid var(--gray-200)',
              background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.background = 'rgba(56,211,159,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.background = 'white'; }}
          >
            <ChevronLeft size={18} color="var(--gray-600)" />
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            {cases.map((_, i) => (
              <div key={i} onClick={() => setCurrent(i)} style={{
                width: current === i ? 24 : 8, height: 8, borderRadius: 4,
                background: current === i ? 'var(--green)' : 'var(--gray-300)',
                cursor: 'pointer', transition: 'all 0.3s',
              }} />
            ))}
          </div>
          <button
            onClick={() => setCurrent(p => (p + 1) % cases.length)}
            style={{
              width: 44, height: 44, borderRadius: '50%', border: '2px solid var(--gray-200)',
              background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.background = 'rgba(56,211,159,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.background = 'white'; }}
          >
            <ChevronRight size={18} color="var(--gray-600)" />
          </button>
        </div>
      </div>
    </section>
  )
}
