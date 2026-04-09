import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { BlurFade } from './ui/BlurFade'
import { searchPexels } from '../lib/pexels'

const baseItems = [
  { id: 1, title: 'Sorriso Ortodôntico', desc: 'Resultado após 12 meses de tratamento', query: 'orthodontics braces smile', span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2' },
  { id: 2, title: 'Clareamento Dental', desc: 'Tratamento 8 tons mais branco', query: 'teeth whitening bright smile', span: 'md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2' },
  { id: 3, title: 'Facetas de Porcelana', desc: 'Harmonização completa do sorriso', query: 'dental veneers porcelain smile', span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2' },
  { id: 4, title: 'Resultado Estético', desc: 'Transformação em 2 semanas', query: 'beautiful smile dental', span: 'md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2' },
  { id: 5, title: 'Implante Dental', desc: 'Resultado natural e duradouro', query: 'dental implant treatment', span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2' },
  { id: 6, title: 'Sorriso Perfeito', desc: 'O sorriso que você sempre quis', query: 'happy patient perfect smile dentist', span: 'md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2' },
]

function GalleryModal({ item, onClose, setItem, items }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white', borderRadius: 24, overflow: 'hidden',
          maxWidth: 640, width: '100%', boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ position: 'relative', aspectRatio: '4/3' }}>
          <img src={item.url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 12, right: 12,
              width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(0,0,0,0.5)', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }}
          >
            <X size={16} color="white" />
          </button>
        </div>
        <div style={{ padding: '20px 24px' }}>
          <h3 style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--gray-800)', marginBottom: 4 }}>
            {item.title}
          </h3>
          <p style={{ fontFamily: 'var(--font)', fontSize: '0.88rem', color: 'var(--gray-600)' }}>{item.desc}</p>
        </div>
        {/* Thumbnail dock */}
        <div style={{ display: 'flex', gap: 8, padding: '0 24px 20px', overflowX: 'auto' }}>
          {items.map(i => (
            <motion.img
              key={i.id}
              src={i.url} alt={i.title}
              onClick={() => setItem(i)}
              whileHover={{ scale: 1.08 }}
              style={{
                width: 52, height: 52, borderRadius: 10, objectFit: 'cover',
                cursor: 'pointer', flexShrink: 0,
                border: item.id === i.id ? '2.5px solid var(--gold)' : '2.5px solid transparent',
                transition: 'border-color 0.2s',
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function InteractiveBentoGallery() {
  const [selected, setSelected] = useState(null)
  const [items, setItems] = useState(baseItems.map(i => ({ ...i, url: '' })))
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    baseItems.forEach(async (item) => {
      const photos = await searchPexels(item.query, 1)
      if (photos[0]) {
        setItems(prev => prev.map(p => p.id === item.id ? { ...p, url: photos[0].src.large } : p))
      }
    })
  }, [])

  return (
    <section id="resultados" style={{ padding: '100px 24px', background: 'var(--gray-50)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <BlurFade delay={0} style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{
            fontFamily: 'var(--font)', fontSize: '0.82rem', fontWeight: 600,
            color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12,
          }}>Resultados Reais</p>
          <h2 style={{
            fontFamily: 'var(--font)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            color: 'var(--gray-800)', letterSpacing: '-0.025em', marginBottom: 16,
          }}>
            Transformações que <span className="text-gradient-gold">falam por si</span>
          </h2>
          <p style={{ fontFamily: 'var(--font)', fontSize: '1rem', color: 'var(--gray-600)', maxWidth: 440, margin: '0 auto' }}>
            Clique em qualquer foto para ver em destaque. Arraste para reordenar.
          </p>
        </BlurFade>

        <AnimatePresence mode="wait">
          {selected ? (
            <GalleryModal
              key="modal"
              item={selected}
              onClose={() => setSelected(null)}
              setItem={setSelected}
              items={items}
            />
          ) : null}
        </AnimatePresence>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4"
          style={{ gap: 12, gridAutoRows: '60px' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative overflow-hidden rounded-2xl cursor-pointer ${item.span}`}
              variants={{
                hidden: { y: 40, opacity: 0, scale: 0.92 },
                visible: {
                  y: 0, opacity: 1, scale: 1,
                  transition: { type: 'spring', stiffness: 300, damping: 24, delay: index * 0.05 },
                },
              }}
              whileHover={{ scale: 1.025 }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.8}
              onDragStart={() => setDragging(true)}
              onDragEnd={(_, info) => {
                setDragging(false)
                const dist = info.offset.x + info.offset.y
                if (Math.abs(dist) > 60) {
                  const arr = [...items]
                  const dragged = arr[index]
                  const to = dist > 0 ? Math.min(index + 1, items.length - 1) : Math.max(index - 1, 0)
                  arr.splice(index, 1)
                  arr.splice(to, 0, dragged)
                  setItems(arr)
                }
              }}
              onClick={() => !dragging && setSelected(item)}
            >
              {item.url ? (
                <img
                  src={item.url} alt={item.title}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              ) : (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.4s infinite',
                }} />
              )}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: '12px 14px',
                }}
              >
                <p style={{ fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.88rem', color: 'white', margin: 0 }}>{item.title}</p>
                <p style={{ fontFamily: 'var(--font)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)', margin: '2px 0 0' }}>{item.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 639px) {
          #resultados .grid { grid-auto-rows: 140px !important; }
          #resultados .grid > div { row-span: 1 !important; }
        }
      `}</style>
    </section>
  )
}
