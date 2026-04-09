import { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { searchPexels } from '../lib/pexels'

export default function ContainerScroll() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isMobile, setIsMobile] = useState(false)
  const [clinicImg, setClinicImg] = useState('')

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    searchPexels('modern dental clinic interior equipment', 1).then(p => {
      if (p[0]) setClinicImg(p[0].src.large2x || p[0].src.large)
    })
  }, [])

  const rotate = useTransform(scrollYProgress, [0, 1], [18, 0])
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.72, 0.92] : [1.04, 1])
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <section style={{ background: 'white', overflow: 'hidden' }}>
      <div
        ref={containerRef}
        style={{
          height: isMobile ? '52rem' : '68rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
        }}
      >
        <div style={{ perspective: '1000px', width: '100%', paddingTop: '4rem', paddingBottom: '8rem' }}>
          {/* Title */}
          <motion.div
            style={{ translateY, marginBottom: 24, textAlign: 'center' }}
          >
            <p style={{
              fontFamily: 'var(--font)', fontSize: '0.82rem', fontWeight: 600,
              color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase',
              marginBottom: 12,
            }}>Nossa Clínica</p>
            <h2 style={{
              fontFamily: 'var(--font)', fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              letterSpacing: '-0.03em', color: 'var(--gray-800)',
              lineHeight: 1.2, marginBottom: 14,
            }}>
              Ambiente moderno,{' '}
              <span className="text-gradient-gold">cuidado de verdade</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font)', fontSize: '1rem',
              color: 'var(--gray-600)', maxWidth: 460, margin: '0 auto',
            }}>
              Tecnologia de ponta e um espaço acolhedor para que você se sinta em casa do início ao fim do tratamento.
            </p>
          </motion.div>

          {/* 3D scroll card */}
          <motion.div
            style={{
              rotateX: rotate, scale,
              boxShadow: '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026',
              maxWidth: '72rem', margin: '-3rem auto 0',
              border: '4px solid #2a2a2a', borderRadius: 30,
              background: '#1a1a1a', padding: 8,
              height: isMobile ? '18rem' : '30rem',
            }}
          >
            <div style={{ height: '100%', borderRadius: 22, overflow: 'hidden', background: '#f3f4f6' }}>
              {clinicImg && (
                <img
                  src={clinicImg}
                  alt="Clínica do Dente - Ambiente moderno"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  loading="lazy"
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
