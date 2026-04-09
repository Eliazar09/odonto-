import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarCheck, Clock, ChevronDown } from 'lucide-react'
import { BlurFade } from './ui/BlurFade'

const services = [
  'Ortodontia',
  'Clareamento Dental',
  'Limpeza e Profilaxia',
  'Implante Dental',
  'Facetas de Porcelana',
  'Odontopediatria',
  'Tratamento de Canal',
  'Extração Dental',
  'Prótese Dentária',
  'Avaliação Geral',
]

const slots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

function getTodayStr() {
  return new Date().toISOString().split('T')[0]
}

function formatDateBR(dateStr) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

export default function BookingSection() {
  const [form, setForm] = useState({
    name: '', phone: '', service: '', date: '', time: '',
  })
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Informe seu nome'
    if (!form.phone.trim()) e.phone = 'Informe seu telefone'
    if (!form.service) e.service = 'Escolha um serviço'
    if (!form.date) e.date = 'Escolha uma data'
    if (!form.time) e.time = 'Escolha um horário'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const msg = encodeURIComponent(
      `Olá! Gostaria de agendar uma consulta na Clínica do Dente.\n\n` +
      `*Nome:* ${form.name}\n` +
      `*Serviço:* ${form.service}\n` +
      `*Data:* ${formatDateBR(form.date)}\n` +
      `*Horário:* ${form.time}\n` +
      `*Telefone:* ${form.phone}`
    )
    window.open(`https://wa.me/5595991235500?text=${msg}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const field = {
    base: {
      width: '100%', fontFamily: 'var(--font)', fontSize: '0.95rem',
      color: 'var(--gray-800)', background: 'white',
      border: '1.5px solid var(--gray-200)', borderRadius: 12,
      padding: '12px 14px', outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    },
  }

  return (
    <section id="agenda" style={{ padding: '100px 24px', background: 'white' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <BlurFade style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ display: 'inline-flex' }}>
            <CalendarCheck size={13} />
            Agendamento Online
          </div>
          <h2 style={{
            fontFamily: 'var(--font)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            color: 'var(--gray-800)', letterSpacing: '-0.025em', marginBottom: 14,
          }}>
            Agende sua consulta
            <br />
            <span className="text-gradient-gold">diretamente pelo WhatsApp</span>
          </h2>
          <p style={{ fontFamily: 'var(--font)', fontSize: '1rem', color: 'var(--gray-600)', maxWidth: 440, margin: '0 auto' }}>
            Preencha o formulário e enviaremos sua solicitação diretamente ao nosso WhatsApp para confirmação.
          </p>
        </BlurFade>

        <div id="booking-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 40, alignItems: 'start',
        }}>
          {/* Form */}
          <BlurFade delay={0.1}>
            <form
              onSubmit={handleSubmit}
              style={{
                background: 'var(--gray-50)', borderRadius: 24,
                border: '1.5px solid var(--gray-200)',
                padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 18,
              }}
            >
              {/* Name */}
              <div>
                <label style={{ fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>
                  Nome completo
                </label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  style={{
                    ...field.base,
                    borderColor: errors.name ? '#EF4444' : 'var(--gray-200)',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.12)' }}
                  onBlur={e => { e.target.style.borderColor = errors.name ? '#EF4444' : 'var(--gray-200)'; e.target.style.boxShadow = 'none' }}
                />
                {errors.name && <span style={{ fontFamily: 'var(--font)', fontSize: '0.75rem', color: '#EF4444', marginTop: 4, display: 'block' }}>{errors.name}</span>}
              </div>

              {/* Phone */}
              <div>
                <label style={{ fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>
                  Telefone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="(95) 99999-9999"
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                  style={{
                    ...field.base,
                    borderColor: errors.phone ? '#EF4444' : 'var(--gray-200)',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.12)' }}
                  onBlur={e => { e.target.style.borderColor = errors.phone ? '#EF4444' : 'var(--gray-200)'; e.target.style.boxShadow = 'none' }}
                />
                {errors.phone && <span style={{ fontFamily: 'var(--font)', fontSize: '0.75rem', color: '#EF4444', marginTop: 4, display: 'block' }}>{errors.phone}</span>}
              </div>

              {/* Service */}
              <div>
                <label style={{ fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>
                  Serviço desejado
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={form.service}
                    onChange={e => set('service', e.target.value)}
                    style={{
                      ...field.base,
                      appearance: 'none', paddingRight: 40,
                      borderColor: errors.service ? '#EF4444' : 'var(--gray-200)',
                      cursor: 'pointer',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.12)' }}
                    onBlur={e => { e.target.style.borderColor = errors.service ? '#EF4444' : 'var(--gray-200)'; e.target.style.boxShadow = 'none' }}
                  >
                    <option value="">Selecione o serviço</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={16} color="var(--gray-400)" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
                {errors.service && <span style={{ fontFamily: 'var(--font)', fontSize: '0.75rem', color: '#EF4444', marginTop: 4, display: 'block' }}>{errors.service}</span>}
              </div>

              {/* Date + Time */}
              <div className="booking-date-time" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>
                    Data
                  </label>
                  <input
                    type="date"
                    min={getTodayStr()}
                    value={form.date}
                    onChange={e => set('date', e.target.value)}
                    style={{
                      ...field.base,
                      borderColor: errors.date ? '#EF4444' : 'var(--gray-200)',
                      cursor: 'pointer',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.12)' }}
                    onBlur={e => { e.target.style.borderColor = errors.date ? '#EF4444' : 'var(--gray-200)'; e.target.style.boxShadow = 'none' }}
                  />
                  {errors.date && <span style={{ fontFamily: 'var(--font)', fontSize: '0.75rem', color: '#EF4444', marginTop: 4, display: 'block' }}>{errors.date}</span>}
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>
                    Horário
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={form.time}
                      onChange={e => set('time', e.target.value)}
                      style={{
                        ...field.base,
                        appearance: 'none', paddingRight: 40,
                        borderColor: errors.time ? '#EF4444' : 'var(--gray-200)',
                        cursor: 'pointer',
                      }}
                      onFocus={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.12)' }}
                      onBlur={e => { e.target.style.borderColor = errors.time ? '#EF4444' : 'var(--gray-200)'; e.target.style.boxShadow = 'none' }}
                    >
                      <option value="">Horário</option>
                      {slots.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <Clock size={15} color="var(--gray-400)" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                  {errors.time && <span style={{ fontFamily: 'var(--font)', fontSize: '0.75rem', color: '#EF4444', marginTop: 4, display: 'block' }}>{errors.time}</span>}
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  background: sent ? '#22C55E' : '#25D366',
                  color: 'white', fontFamily: 'var(--font)', fontWeight: 700, fontSize: '1rem',
                  padding: '14px', borderRadius: 14, border: 'none', cursor: 'pointer',
                  boxShadow: '0 8px 28px rgba(37,211,102,0.32)',
                  transition: 'background 0.3s',
                  marginTop: 4,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {sent ? 'Enviado! Aguarde nosso contato' : 'Enviar pelo WhatsApp'}
              </motion.button>
              <p style={{ fontFamily: 'var(--font)', fontSize: '0.75rem', color: 'var(--gray-400)', textAlign: 'center', marginTop: -6 }}>
                Você sera redirecionado para o WhatsApp para confirmar.
              </p>
            </form>
          </BlurFade>

          {/* Right: time slots + info */}
          <BlurFade delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Hours card */}
              <div style={{
                background: 'var(--gray-50)', borderRadius: 20,
                border: '1.5px solid var(--gray-200)', padding: '28px 24px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{
                    width: 40, height: 40, background: 'rgba(249,115,22,0.10)',
                    borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Clock size={18} color="var(--gold)" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '1rem', color: 'var(--gray-800)' }}>Horários de Atendimento</div>
                    <div style={{ fontFamily: 'var(--font)', fontSize: '0.78rem', color: 'var(--gray-500)' }}>Consulte disponibilidade</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[
                    { day: 'Segunda — Sexta', time: '08:00 – 18:00' },
                    { day: 'Sábado', time: '08:00 – 13:00' },
                    { day: 'Domingo', time: 'Fechado' },
                    { day: 'Feriados', time: 'Fechado' },
                  ].map(({ day, time }) => (
                    <div key={day} style={{
                      background: 'white', borderRadius: 12, padding: '12px 14px',
                      border: '1px solid var(--gray-200)',
                    }}>
                      <div style={{ fontFamily: 'var(--font)', fontSize: '0.75rem', color: 'var(--gray-500)', marginBottom: 3 }}>{day}</div>
                      <div style={{ fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.85rem', color: time === 'Fechado' ? 'var(--gray-400)' : 'var(--gray-800)' }}>{time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick-book slots */}
              <div style={{
                background: 'var(--gray-50)', borderRadius: 20,
                border: '1.5px solid var(--gray-200)', padding: '24px',
              }}>
                <div style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--gray-800)', marginBottom: 16 }}>
                  Horários disponíveis hoje
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {slots.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set('time', t)}
                      style={{
                        fontFamily: 'var(--font)', fontSize: '0.82rem', fontWeight: 600,
                        padding: '8px 14px', borderRadius: 10, cursor: 'pointer',
                        border: '1.5px solid',
                        borderColor: form.time === t ? 'var(--gold)' : 'var(--gray-200)',
                        background: form.time === t ? 'rgba(249,115,22,0.08)' : 'white',
                        color: form.time === t ? 'var(--gold)' : 'var(--gray-700)',
                        transition: 'all 0.15s',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact strip */}
              <a
                href="https://wa.me/5595991235500"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: '#25D366', borderRadius: 16, padding: '18px 20px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(37,211,102,0.25)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(37,211,102,0.35)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.25)' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <div>
                  <div style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '1rem', color: 'white' }}>Fale conosco agora</div>
                  <div style={{ fontFamily: 'var(--font)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)' }}>(95) 99123-5500</div>
                </div>
              </a>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
