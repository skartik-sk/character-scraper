import Image from "next/image"
import Link from "next/link"
import { Twitter } from "lucide-react"

interface AvatarCardProps {
  name: string
  imageUrl: string
  twitterHandle: string
}

export function AvatarCard({ name, imageUrl, twitterHandle }: AvatarCardProps) {
  return (
    <Link href={`https://twitter.com/${twitterHandle}`} target="_blank" rel="noopener noreferrer" className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
        <div className="relative h-48 w-full">
          <Image src={imageUrl || "/placeholder.svg"} alt={`Avatar of ${name}`} layout="fill" objectFit="cover" />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{name}</h3>
          <div className="flex items-center text-blue-400">
            <Twitter className="w-4 h-4 mr-2" />
            <span className="text-sm">@{twitterHandle}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

