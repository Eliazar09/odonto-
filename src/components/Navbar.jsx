import { useState, useEffect } from 'react'
import { Phone } from 'lucide-react'

const links = [
  { label: 'Início', href: '#hero' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Contato', href: '#contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--gray-200)' : 'none',
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, background: 'var(--gold)', borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C9 2 7 4 7 6.5c0 1.5.5 2.5 1 3.5L9 14c.5 2 1 4 3 5s2.5-3 3-5l1-4c.5-1 1-2 1-3.5C17 4 15 2 12 2z" fill="white" opacity="0.9"/>
                <path d="M10 6c0-1.1.9-2 2-2s2 .9 2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--gray-800)' }}>
              Clínica do <span style={{ color: 'var(--gold)' }}>Dente</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav style={{ alignItems: 'center', gap: 32 }} className="show-desktop">
            {links.map(l => (
              <a key={l.href} href={l.href} style={{
                fontFamily: 'var(--font)', fontWeight: 500, fontSize: '0.9rem',
                color: 'var(--gray-600)', textDecoration: 'none',
                transition: 'color 0.2s', padding: '4px 0',
                borderBottom: '2px solid transparent',
              }}
              onMouseEnter={e => { e.target.style.color = 'var(--gold)'; e.target.style.borderBottomColor = 'var(--gold)'; }}
              onMouseLeave={e => { e.target.style.color = 'var(--gray-600)'; e.target.style.borderBottomColor = 'transparent'; }}
              >{l.label}</a>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href="tel:+5595991235500" style={{
              alignItems: 'center', gap: 6,
              fontFamily: 'var(--font)', fontSize: '0.85rem', fontWeight: 600,
              color: 'var(--gray-700)', textDecoration: 'none',
            }} className="show-desktop">
              <Phone size={15} color="var(--gold)" />
              (95) 99123-5500
            </a>
            <a
              href="https://wa.me/5595991235500?text=Oi!%20Gostaria%20de%20agendar%20uma%20consulta."
              target="_blank" rel="noopener noreferrer"
              className="btn-primary show-desktop"
              style={{ padding: '10px 20px', fontSize: '0.88rem' }}
            >
              Agendar Consulta
            </a>
            {/* Hamburger */}
            <button className={`hamburger show-mobile-only ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu" style={{ display: 'flex' }}>
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${open ? 'open' : ''}`} style={{
          background: 'white', borderTop: '1px solid var(--gray-200)', borderRadius: '0 0 16px 16px',
          boxShadow: 'var(--shadow-md)',
        }}>
          <div style={{ padding: '16px 0 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                fontFamily: 'var(--font)', fontWeight: 500, fontSize: '1rem',
                color: 'var(--gray-700)', textDecoration: 'none',
                padding: '12px 16px', borderRadius: 10, transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.target.style.background = 'var(--gray-50)'; e.target.style.color = 'var(--gold)'; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gray-700)'; }}
              >{l.label}</a>
            ))}
            <div style={{ padding: '8px 16px 0' }}>
              <a
                href="https://wa.me/5595991235500?text=Oi!%20Gostaria%20de%20agendar%20uma%20consulta."
                target="_blank" rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Agendar Consulta
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
