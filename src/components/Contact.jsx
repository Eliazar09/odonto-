import { useEffect, useRef } from 'react'
import { MapPin, Phone, MessageCircle, Map } from 'lucide-react'

export default function Contact() {
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const els = [leftRef.current, rightRef.current].filter(Boolean)
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.15 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contato" style={{ padding: '100px 24px', background: 'var(--gray-50)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ display: 'inline-flex' }}>
            <MapPin size={14} />
            Localização & Contato
          </div>
          <h2 style={{
            fontFamily: 'var(--font)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            color: 'var(--gray-800)', lineHeight: 1.2,
            letterSpacing: '-0.025em', marginBottom: 16,
          }}>
            Venha nos <span className="text-gradient-gold">visitar</span>
          </h2>
          <p style={{ fontFamily: 'var(--font)', fontSize: '1.05rem', color: 'var(--gray-600)', maxWidth: 460, margin: '0 auto' }}>
            Estamos localizados em Boa Vista, RR. Fácil acesso e estacionamento disponível.
          </p>
        </div>

        <div id="contact-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 40, alignItems: 'start',
        }}>
          {/* Info */}
          <div ref={leftRef} className="reveal-left" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Address */}
            <div style={{
              background: 'white', borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--gray-200)', padding: '24px',
              display: 'flex', gap: 16, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                background: 'rgba(249,115,22,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <MapPin size={22} color="var(--gold)" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--gray-500)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
                  Endereço
                </div>
                <div style={{ fontFamily: 'var(--font)', fontWeight: 600, fontSize: '1rem', color: 'var(--gray-800)', lineHeight: 1.5 }}>
                  R. Izidio Galdino da Silva, 737
                </div>
                <div style={{ fontFamily: 'var(--font)', fontSize: '0.88rem', color: 'var(--gray-600)', marginTop: 2 }}>
                  Boa Vista – RR
                </div>
              </div>
            </div>

            {/* Phone */}
            <div style={{
              background: 'white', borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--gray-200)', padding: '24px',
              display: 'flex', gap: 16, alignItems: 'center',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                background: 'rgba(16,185,129,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Phone size={22} color="var(--green)" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--gray-500)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
                  Telefone
                </div>
                <a href="tel:+5595991235500" style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--gray-800)', textDecoration: 'none' }}>
                  (95) 99123-5500
                </a>
              </div>
            </div>

            {/* Hours */}
            <div style={{
              background: 'white', borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--gray-200)', padding: '24px',
            }}>
              <div style={{ fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--gray-500)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>
                Horários de Atendimento
              </div>
              {[
                { day: 'Segunda – Sexta', hours: '08:00 – 18:00' },
                { day: 'Sábado', hours: '08:00 – 13:00' },
                { day: 'Domingo', hours: 'Fechado' },
              ].map((h, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--gray-100)' : 'none',
                }}>
                  <span style={{ fontFamily: 'var(--font)', fontSize: '0.9rem', color: 'var(--gray-700)' }}>{h.day}</span>
                  <span style={{
                    fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.88rem',
                    color: h.hours === 'Fechado' ? 'var(--gray-400)' : 'var(--green)',
                    background: h.hours === 'Fechado' ? 'var(--gray-100)' : 'rgba(16,185,129,0.1)',
                    padding: '3px 10px', borderRadius: 50,
                  }}>{h.hours}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/5595991235500?text=Oi!%20Gostaria%20de%20agendar%20uma%20consulta."
                target="_blank" rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ flex: 1, justifyContent: 'center', minWidth: 140 }}
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a
                href="https://maps.google.com/?q=R.+Izidio+Galdino+da+Silva+737+Boa+Vista+RR"
                target="_blank" rel="noopener noreferrer"
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center', minWidth: 140 }}
              >
                <Map size={18} />
                Google Maps
              </a>
            </div>
          </div>

          {/* Map */}
          <div ref={rightRef} className="reveal-right" style={{
            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)', border: '1.5px solid var(--gray-200)',
            height: 480,
          }}>
            <iframe
              title="Clínica do Dente - Localização"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.5!2d-60.6753!3d2.8235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8d9b23b0b0b0b0b0%3A0x0!2sR.+Izidio+Galdino+da+Silva%2C+737+-+Boa+Vista%2C+RR!5e0!3m2!1spt!2sbr!4v1699999999999!5m2!1spt!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
