import { motion } from 'motion/react'
import { useState } from 'react'
import Noise from './Noise'

interface PostItNoteProps {
  text: string
}

export function PostItNote({ text }: PostItNoteProps) {
  // 生成随机的动画持续时间（3-6秒），使用 useState 确保稳定
  const [duration] = useState(() => Math.random() * 3 + 3)

  // 定义风吹摇摆动画的关键帧
  const windSwayAnimation = {
    rotateZ: [3, 5, -2, 4, 3],
    rotateX: [0, 5, 0, -5, 0],
    y: [0, 5, -2, 3, 0],
  }

  return (
    <motion.div
      className="sticky-note"
      animate={windSwayAnimation}
      transition={{
        duration,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      style={{
        transformOrigin: 'top center',
      }}
    >
      <p className="note-text">{text}</p>
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
