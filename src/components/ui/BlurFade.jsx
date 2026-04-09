import { useRef } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'

export function BlurFade({
  children,
  className,
  style,
  duration = 0.45,
  delay = 0,
  yOffset = 10,
  blur = '8px',
  inViewMargin = '-40px',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: inViewMargin })

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ y: yOffset, opacity: 0, filter: `blur(${blur})` }}
        animate={inView ? { y: 0, opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ delay: 0.04 + delay, duration, ease: 'easeOut' }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
