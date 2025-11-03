import { motion } from 'motion/react'
import { useState } from 'react'
import Noise from './Noise'

interface PostItNoteProps {
  text: string
  color: string
  delay: number
  x: number
  y: number
  rotation: number
  isMobile?: boolean
  signature?: string
}

export function PostItNote({ text, color, delay, x, y, rotation, signature, isMobile = false }: PostItNoteProps) {
  // 生成随机的动画持续时间（3-6秒）
  const [duration] = useState(() => Math.random() * 3 + 3)

  // 移动端减弱动画幅度以提升性能
  const rotateZRange = isMobile
    ? [rotation, rotation + 1, rotation - 1.5, rotation + 0.5, rotation]
    : [rotation, rotation + 2, rotation - 3, rotation + 1.5, rotation]

  const rotateXRange = isMobile ? [0, 2, 0, -2, 0] : [0, 3, 0, -3, 0]
  const yRange = isMobile ? [0, 2, 0, 1, 0] : [0, 3, -1, 2, 0]

  return (
    <motion.div
      className="sticky-note"
      initial={{
        opacity: 0,
        scale: 0,
        rotateZ: rotation - 180,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateZ: rotateZRange,
        rotateX: rotateXRange,
        y: yRange,
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.8, delay, type: 'spring', stiffness: 200, damping: 15 },
        // 风吹动画
        rotateZ: {
          duration,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
          delay: delay + 0.8,
        },
        rotateX: {
          duration,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
          delay: delay + 0.8,
        },
        y: {
          duration,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
          delay: delay + 0.8,
        },
      }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transformOrigin: 'top center',
        backgroundColor: color,
      }}
    >
      <p className="note-text">{text}</p>

      {signature && <div className="note-watermark">{signature}</div>}

      <Noise
        patternSize={250}
        patternScaleX={1}
        patternScaleY={1}
        patternRefreshInterval={999}
        patternAlpha={10}
      />
    </motion.div>
  )
}
