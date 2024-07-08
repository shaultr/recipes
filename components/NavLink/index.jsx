"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import Spinner from '../Spinner'

export default function Navlink({ children, href }) {
   const path = usePathname()
   const [isLoading, setIsLoading] = useState(false)

   const handleClick = (e) => {
      path === href ? setIsLoading(false) : setIsLoading(true)
   }

   useEffect(() => {
      setIsLoading(false)
   }, [path])

   return (
      <div className={`${isLoading ? styles.loading : ''}`}>
         <Link href={href} onClick={handleClick}
            style={{ color: path === href ? '#a3040c' : 'white' }}>
            {children}
         </Link>
         {isLoading && <Spinner/>}
      </div>
   )
}
