import { useState, useEffect, useRef } from 'react'
import { Plus, Minus, HelpCircle } from 'lucide-react'

const faqs = [
  {
    q: 'Os procedimentos doem?',
    a: 'A maioria dos procedimentos é realizada com anestesia local, garantindo total conforto durante o tratamento. Utilizamos técnicas modernas e materiais de alta qualidade para minimizar qualquer desconforto. Sua tranquilidade é nossa prioridade.',
  },
  {
    q: 'Quanto tempo leva o tratamento?',
    a: 'O tempo varia conforme o procedimento. Uma limpeza pode ser feita em 1 sessão (aprox. 1h), o clareamento em 3–5 sessões e a ortodontia entre 12 e 24 meses. Na consulta de avaliação, traçamos juntos o plano ideal para você.',
  },
  {
    q: 'Vocês atendem crianças?',
    a: 'Sim! Contamos com atendimento odontopediátrico especializado. Criamos um ambiente acolhedor e lúdico para que as crianças se sintam seguras e confortáveis, construindo desde cedo bons hábitos de saúde bucal.',
  },
  {
    q: 'Quais são as formas de pagamento?',
    a: 'Aceitamos pagamento em cartão de crédito (parcelado em até 12x sem juros), cartão de débito, PIX e dinheiro. Também trabalhamos com os principais convênios odontológicos. Consulte as condições na recepção.',
  },
  {
    q: 'Preciso de encaminhamento para consultar?',
    a: 'Não! Você pode agendar diretamente pelo WhatsApp ou telefone, sem necessidade de encaminhamento médico. Nossa equipe vai fazer uma avaliação completa na primeira consulta.',
  },
  {
    q: 'Vocês atendem emergências?',
    a: 'Sim, damos prioridade a atendimentos de urgência. Em caso de dor aguda, fratura dentária ou perda de coroa, entre em contato pelo WhatsApp e faremos o possível para atendê-lo no mesmo dia.',
  },
]

function FAQItem({ item, isOpen, toggle }) {
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={toggle}>
        <span>{item.q}</span>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          background: isOpen ? 'var(--gold)' : 'var(--gray-100)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.25s',
        }}>
          {isOpen
            ? <Minus size={14} color="white" />
            : <Plus size={14} color="var(--gray-600)" />
          }
        </div>
      </button>
      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
        {item.a}
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const titleRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const els = [titleRef.current, contentRef.current].filter(Boolean)
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.15 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="faq" style={{ padding: '100px 24px', background: 'white' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ display: 'inline-flex' }}>
            <HelpCircle size={13} />
            Perguntas Frequentes
          </div>
          <h2 style={{
            fontFamily: 'var(--font)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            color: 'var(--gray-800)', lineHeight: 1.2,
            letterSpacing: '-0.025em', marginBottom: 16,
          }}>
            Suas dúvidas,{' '}
            <span className="text-gradient-gold">respondidas</span>
          </h2>
          <p style={{ fontFamily: 'var(--font)', fontSize: '1.05rem', color: 'var(--gray-600)', maxWidth: 460, margin: '0 auto' }}>
            Encontre respostas para as perguntas mais comuns sobre nossos serviços e tratamentos.
          </p>
        </div>

        <div ref={contentRef} className="reveal" style={{
          background: 'var(--gray-50)', borderRadius: 'var(--radius-xl)',
          border: '1.5px solid var(--gray-200)', padding: '8px 28px',
        }}>
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <p style={{ fontFamily: 'var(--font)', fontSize: '0.95rem', color: 'var(--gray-600)', marginBottom: 16 }}>
            Ainda tem dúvidas? Fale com a gente!
          </p>
          <a
            href="https://wa.me/5595991235500?text=Oi!%20Tenho%20uma%20dúvida%20sobre%20os%20tratamentos."
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
