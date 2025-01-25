"use client"

import { useState } from "react"
import Link from "next/link"
import { HexBackground } from "@/components/hex-background"
import { AvatarCard } from "@/components/avatar-card"
import { AvatarCreationForm } from "@/components/avatar-creation-form"
import { Mountain } from "lucide-react"

// Mock data for previously generated avatars
const previousAvatars = [
  { name: "AI Alice", imageUrl: "/placeholder.svg?height=300&width=300", twitterHandle: "ai_alice" },
  { name: "Bot Bob", imageUrl: "/placeholder.svg?height=300&width=300", twitterHandle: "bot_bob" },
  { name: "Cyber Charlie", imageUrl: "/placeholder.svg?height=300&width=300", twitterHandle: "cyber_charlie" },
  { name: "Digital Dave", imageUrl: "/placeholder.svg?height=300&width=300", twitterHandle: "digital_dave" },
]

export default function Home() {
  const [score, setScore] = useState(0)

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <HexBackground onScoreUpdate={setScore} />

      <header className="w-full p-4 flex justify-between items-center relative z-10">
        <Link href="/" className="flex items-center space-x-2">
          <Mountain className="h-8 w-8 text-white" />
          <span className="font-bold text-xl text-black">AI Avatar Gen</span>
        </Link>
        <Link
          href="https://www.notion.so/your-knowledge-base-link"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors"
        >
          Knowledge Base
        </Link>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center relative z-10 py-12">
        <div className="text-center space-y-8 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black">AI Character Generator</h1>

          <AvatarCreationForm />
        </div>

        <div className="w-full max-w-6xl px-4">
          <h2 className="text-2xl font-bold mb-6 text-black">Recently Generated Avatars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {previousAvatars.map((avatar, index) => (
              <AvatarCard key={index} {...avatar} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

