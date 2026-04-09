import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const links = [
  { label: 'Início', href: '#hero' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Contato', href: '#contato' },
]

export default function PillNav() {
  const [active, setActive] = useState('Início')
  const [hovered, setHovered] = useState(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
      display: 'flex', justifyContent: 'center',
      padding: scrolled ? '12px 24px' : '20px 24px',
      transition: 'padding 0.3s ease',
      pointerEvents: 'none',
    }}>
      {/* Desktop pill */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'flex', alignItems: 'center', gap: 0,
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(16px)',
          borderRadius: 100,
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)'
            : '0 4px 20px rgba(0,0,0,0.08)',
          padding: '6px 8px',
          pointerEvents: 'all',
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{
          display: 'flex', alignItems: 'center',
          textDecoration: 'none', padding: '2px 14px 2px 4px',
          borderRight: '1px solid rgba(0,0,0,0.06)', marginRight: 8,
        }}>
          <img
            src="/logo.png"
            alt="Clínica do Dente"
            style={{ height: 48, width: 'auto', display: 'block', objectFit: 'contain', borderRadius: 30 }}
          />
        </a>

        {/* Nav links — desktop only */}
        <nav
          className="show-desktop"
          style={{ alignItems: 'center', gap: 2, position: 'relative' }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setActive(l.label)}
              onMouseEnter={() => setHovered(l.label)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative', zIndex: 1,
                fontFamily: 'var(--font)', fontWeight: 500, fontSize: '0.85rem',
                color: active === l.label ? 'var(--gold)' : 'var(--gray-600)',
                textDecoration: 'none', padding: '6px 14px', borderRadius: 50,
                transition: 'color 0.2s', whiteSpace: 'nowrap',
              }}
            >
              {(hovered === l.label || active === l.label) && (
                <motion.span
                  layoutId="pill-bg"
                  style={{
                    position: 'absolute', inset: 0, borderRadius: 50,
                    background: active === l.label
                      ? 'rgba(249,115,22,0.10)'
                      : 'rgba(0,0,0,0.04)',
                    zIndex: -1,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA — desktop only */}
        <a
          href="https://wa.me/5595991235500?text=Oi!%20Gostaria%20de%20agendar%20uma%20consulta."
          target="_blank" rel="noopener noreferrer"
          className="show-desktop"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.82rem',
            background: '#25D366', color: 'white',
            padding: '8px 16px', borderRadius: 50,
            textDecoration: 'none', marginLeft: 8,
            boxShadow: '0 2px 8px rgba(37,211,102,0.35)',
            transition: 'opacity 0.2s, transform 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MessageCircle size={14} />
          Agendar
        </a>

        {/* Hamburger — mobile only */}
        <button
          className="show-mobile-only"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{
            display: 'flex', flexDirection: 'column', gap: 4,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '4px 8px', marginLeft: 4,
          }}
        >
          {[0, 1, 2].map(i => (
            <motion.span key={i} style={{
              display: 'block', width: 20, height: 2,
              background: 'var(--gray-700)', borderRadius: 2,
            }}
            animate={{
              rotate: open && i === 0 ? 45 : open && i === 2 ? -45 : 0,
              y: open && i === 0 ? 6 : open && i === 2 ? -6 : 0,
              opacity: open && i === 1 ? 0 : 1,
            }}
            />
          ))}
        </button>
      </motion.div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', top: '100%', left: 16, right: 16, marginTop: 8,
              background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)',
              borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
              padding: '12px 8px 16px',
              pointerEvents: 'all',
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => { setActive(l.label); setOpen(false) }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  display: 'block', fontFamily: 'var(--font)', fontWeight: 500,
                  fontSize: '0.95rem', color: 'var(--gray-700)', textDecoration: 'none',
                  padding: '11px 16px', borderRadius: 12,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(249,115,22,0.07)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {l.label}
              </motion.a>
            ))}
            <div style={{ padding: '8px 8px 0' }}>
              <a
                href="https://wa.me/5595991235500?text=Oi!%20Gostaria%20de%20agendar%20uma%20consulta."
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.9rem',
                  background: '#25D366', color: 'white',
                  padding: '11px', borderRadius: 12, textDecoration: 'none',
                }}
              >
                <MessageCircle size={16} />
                Agendar no WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
