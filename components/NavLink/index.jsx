"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Navlink({ children, href }) {
   const path = usePathname()

   return (
      <Link
         href={href}
         style={{ color: path === href ? '#a3040c' : 'white' }}>{children}</Link>
   )
}
