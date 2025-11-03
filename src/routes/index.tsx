import { createFileRoute } from '@tanstack/react-router'
import { PostItNote } from '~/components/PostItNote'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div
      className="min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#f0f0f0',
        perspective: '1000px', /* 增加3D透视效果 */
      }}
    >
      <PostItNote text="今天有没有好好吃饭" />
    </div>
  )
}
