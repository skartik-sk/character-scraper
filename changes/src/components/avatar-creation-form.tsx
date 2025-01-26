"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function AvatarCreationForm() {
  const [formData, setFormData] = useState({
    twitterHandle: "",
    twitterPassword: "",
    name: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({ twitterHandle: "", twitterPassword: "", name: "" })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="group relative inline-flex items-center justify-center bg-black text-white border border-black px-6 py-3 text-sm font-medium tracking-wide shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all transform hover:scale-105">
          Create Your Own Avatar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Your AI Avatar</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="twitterHandle">Twitter Handle</Label>
            <Input
              id="twitterHandle"
              name="twitterHandle"
              value={formData.twitterHandle}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="twitterPassword">Twitter Password</Label>
            <Input
              id="twitterPassword"
              name="twitterPassword"
              type="password"
              value={formData.twitterPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

