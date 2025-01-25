"use client"

import { useEffect, useRef } from "react"

interface HexBackgroundProps {
  onScoreUpdate: (score: number) => void
}

export function HexBackground({ onScoreUpdate }: HexBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const hexSize = 30
    const hexHeight = hexSize * Math.sqrt(3)
    const hexWidth = hexSize * 2
    const hexagons: {
      center: [number, number]
      lines: {
        start: [number, number]
        end: [number, number]
        progress: number
        color: string
      }[]
    }[] = []
    const colors = [
      "rgba(238, 110, 115, 0.2)",
      "rgba(130, 170, 255, 0.2)",
      "rgba(145, 215, 145, 0.2)",
      "rgba(200, 200, 200, 0.2)",
    ]

    for (let y = -hexHeight; y < canvas.height + hexHeight; y += hexHeight * 0.75) {
      for (let x = -hexWidth; x < canvas.width + hexWidth; x += hexWidth * 0.75) {
        const centerX = x + (Math.floor(y / (hexHeight * 0.75)) % 2 ? hexWidth * 0.5 : 0)
        const centerY = y
        hexagons.push({ center: [centerX, centerY], lines: [] })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      hexagons.forEach((hexagon) => {
        if (Math.random() < 0.05 && hexagon.lines.length < 6) {
          const angle = Math.floor(Math.random() * 6) * (Math.PI / 3)
          const startX = hexagon.center[0] + hexSize * Math.cos(angle)
          const startY = hexagon.center[1] + hexSize * Math.sin(angle)
          const endX = hexagon.center[0] + hexSize * Math.cos(angle + Math.PI / 3)
          const endY = hexagon.center[1] + hexSize * Math.sin(angle + Math.PI / 3)
          hexagon.lines.push({
            start: [startX, startY],
            end: [endX, endY],
            progress: 0,
            color: colors[Math.floor(Math.random() * colors.length)],
          })
        }

        hexagon.lines.forEach((line, index) => {
          ctx.beginPath()
          ctx.strokeStyle = line.color
          ctx.lineWidth = 2
          ctx.lineCap = "round"
          ctx.moveTo(line.start[0], line.start[1])
          const currentX = line.start[0] + (line.end[0] - line.start[0]) * line.progress
          const currentY = line.start[1] + (line.end[1] - line.start[1]) * line.progress
          ctx.lineTo(currentX, currentY)
          ctx.stroke()

          line.progress += 0.02
          if (line.progress >= 1) {
            hexagon.lines.splice(index, 1)
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ transform: "translate(4.23px, -0.99px) scale(1.06793)" }}
      aria-hidden="true"
    />
  )
}

