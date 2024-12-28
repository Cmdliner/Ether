"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black backdrop-blur-md text-white shadow-lg z-50 p-4 border-b-2 border-gray-500">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Eather
        </Link>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:text-gray-300"><Link href="/login">Login</Link></Button>
          <Button variant="outline" className="text-black"><Link href="/register">Sign Up</Link></Button>
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;