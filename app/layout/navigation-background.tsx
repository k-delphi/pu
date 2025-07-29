
import { useEffect, useRef } from 'react'

export default function NavigationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    // 设置画布大小为侧边栏尺寸
    const resizeCanvas = () => {
      canvas.width = 320 // 侧边栏宽度 80 (rem) = 320px
      canvas.height = window.innerHeight
    }

    const drawSpiralHalftone = () => {
      const gridSize = 25 // 网格大小，降低密度
      const rows = Math.ceil(canvas.height / gridSize)
      const cols = Math.ceil(canvas.width / gridSize)

      // 清除画布，使用深色背景
      ctx.fillStyle = 'rgba(15, 15, 30, 0.3)' // 深海军蓝背景
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // 计算相对于画布中心的位置
          const centerX = x * gridSize + gridSize / 2
          const centerY = y * gridSize + gridSize / 2
          
          // 计算相对于画布中心的距离和角度（用于螺旋效果）
          const deltaX = centerX - canvas.width / 2
          const deltaY = centerY - canvas.height / 2
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
          const angle = Math.atan2(deltaY, deltaX)
          
          // 创建螺旋效果：结合角度和距离的正弦波
          const spiralEffect = Math.sin(distance * 0.05 - time * 0.5 + angle * 2)
          const waveEffect = Math.sin(distance * 0.03 - time * 0.3)
          
          // 综合效果
          const combinedEffect = (spiralEffect + waveEffect) * 0.5
          
          // 计算点的大小和透明度
          const size = gridSize * 0.6 * (0.7 + 0.3 * combinedEffect)
          const opacity = 0.1 + 0.15 * (combinedEffect * 0.5 + 0.5)
          
          // 绘制圆形点
          ctx.beginPath()
          ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(79, 193, 255, ${opacity})` // 蓝色点
          ctx.fill()
        }
      }
    }

    const animate = () => {
      drawSpiralHalftone()
      time += 0.02 // 减慢动画速度
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}