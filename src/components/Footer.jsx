import { Phone, MapPin, Mail } from 'lucide-react'

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="rgba(255,255,255,0.6)" stroke="none"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const navLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
]

const services = [
  'Ortodontia', 'Limpeza Dental', 'Clareamento',
  'Estética Dental', 'Odonto Infantil',
]

export default function Footer() {
  return (
    <footer style={{
      background: '#0A0E14',
      color: 'rgba(255,255,255,0.7)',
      padding: '72px 24px 0',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div id="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 48, paddingBottom: 56,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 36, height: 36, background: 'var(--gold)', borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C9 2 7 4 7 6.5c0 1.5.5 2.5 1 3.5L9 14c.5 2 1 4 3 5s2.5-3 3-5l1-4c.5-1 1-2 1-3.5C17 4 15 2 12 2z" fill="white" opacity="0.9"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>
                Clínica do <span style={{ color: 'var(--gold)' }}>Dente</span>
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font)', fontSize: '0.88rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', marginBottom: 24, maxWidth: 240 }}>
              Transformando sorrisos em Boa Vista, RR com atendimento humanizado e resultados reais.
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
                { icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(249,115,22,0.15)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <s.icon size={16} color="rgba(255,255,255,0.6)" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
              Navegação
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {navLinks.map(l => (
                <a key={l.href} href={l.href} style={{
                  fontFamily: 'var(--font)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                >{l.label}</a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
              Serviços
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {services.map((s, i) => (
                <a key={i} href="#servicos" style={{
                  fontFamily: 'var(--font)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--green)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
              Contato
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <MapPin size={16} color="var(--gold)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font)', fontSize: '0.88rem', lineHeight: 1.5, color: 'rgba(255,255,255,0.6)' }}>
                  R. Izidio Galdino da Silva, 737<br />Boa Vista – RR
                </span>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Phone size={16} color="var(--green)" style={{ flexShrink: 0 }} />
                <a href="tel:+5595991235500" style={{ fontFamily: 'var(--font)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                  (95) 99123-5500
                </a>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Mail size={16} color="var(--blue)" style={{ flexShrink: 0 }} />
                <a href="mailto:contato@clinicadodente.com.br" style={{ fontFamily: 'var(--font)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                  contato@clinicadodente.com.br
                </a>
              </div>
            </div>

            {/* LGBTQ badge */}
            <div style={{
              marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, padding: '8px 14px',
            }}>
              <svg width="18" height="12" viewBox="0 0 18 12">
                {['#E40303','#FF8C00','#FFED00','#008026','#004DFF','#750787'].map((c,i) => (
                  <rect key={i} x="0" y={i*2} width="18" height="2" fill={c} />
                ))}
              </svg>
              <span style={{ fontFamily: 'var(--font)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                LGBTQ+ Friendly
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '24px 0', flexWrap: 'wrap', gap: 12,
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}>
          <span style={{ fontFamily: 'var(--font)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} Clínica do Dente. Todos os direitos reservados.
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacidade', 'Termos'].map((t, i) => (
              <a key={i} href="#" style={{
                fontFamily: 'var(--font)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
              >{t}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Big decorative word */}
      <div style={{
        overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.04)',
        padding: '0 24px', userSelect: 'none', pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: 'var(--font)', fontWeight: 900,
          fontSize: 'clamp(5rem, 18vw, 14rem)',
          lineHeight: 0.85,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.07)',
          letterSpacing: '-0.04em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          marginLeft: -8,
        }}>
          SORRISO
        </div>
      </div>
    </footer>
  )
}
