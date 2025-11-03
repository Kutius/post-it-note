import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PostItNote } from '~/components/PostItNote'
import { GridPattern } from '~/components/ui/grid-pattern'
import { NOTE_COLORS, WARM_MESSAGES } from '~/constants'

export const Route = createFileRoute('/')({
  component: Home,
})

function isTooClose(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  minDistance: number,
): boolean {
  const dx = x1 - x2
  const dy = y1 - y2
  return Math.sqrt(dx * dx + dy * dy) < minDistance
}

function generateNotes(count: number, isMobile: boolean) {
  const positions: Array<{ x: number, y: number }> = []
  const minDistance = isMobile ? 18 : 12
  const maxAttempts = 50

  const notes = []

  for (let i = 0; i < count; i++) {
    let x = 0
    let y = 0
    let attempts = 0
    let foundValidPosition = false

    while (attempts < maxAttempts && !foundValidPosition) {
      x = Math.random() * 85
      y = Math.random() * 85

      // 检查是否与已有位置太近
      foundValidPosition = positions.every(pos =>
        !isTooClose(x, y, pos.x, pos.y, minDistance),
      )

      attempts++
    }

    if (foundValidPosition) {
      positions.push({ x, y })
    }

    notes.push({
      id: i,
      text: WARM_MESSAGES[Math.floor(Math.random() * WARM_MESSAGES.length)],
      color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
      x,
      y,
      rotation: Math.random() * 20 - 10, // -10 到 10 度
      delay: i * 0.05, // 错开出场时间
    })
  }

  return notes
}

function Home() {
  const [isMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768
    }
    return false
  })

  const noteCount = isMobile ? 20 : 40

  const [notes] = useState(() => generateNotes(noteCount, isMobile))

  return (
    <div
      className="min-h-screen overflow-hidden relative"
      style={{
        backgroundColor: '#f0f0f0',
        perspective: '1000px',
      }}
    >
      {notes.map(note => (
        <PostItNote
          key={note.id}
          text={note.text}
          color={note.color}
          x={note.x}
          y={note.y}
          rotation={note.rotation}
          delay={note.delay}
          isMobile={isMobile}
          signature="CYL"
        />
      ))}
      <GridPattern className="mask-[radial-gradient(ellipse_at_center,white,transparent_100%)] skew-y-10" />
    </div>
  )
}
