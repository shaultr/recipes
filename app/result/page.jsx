import Photo from '@/components/Photo'
import styles from './style.module.scss'
import { SearchBar } from '@/components/SearchBar'
import { connectToMongo } from '@/server/DL/connectToMongo'
import { readRecipes } from '@/server/DL/controllers/recipe.controller'
import Link from 'next/link'
import React from 'react'

export default async function Page({ searchParams: { search } }) {
   await connectToMongo()
   const result = await readRecipes({
      $or: [{ title: { $regex: search, $options: 'i' } }, { typeFood: { $regex: search, $options: 'i' } }]
   })

   return (
      <div>
         <SearchBar val={search}/>
         <section className={styles.photoContainer}>
            {result?.map((recipe) => (
               <Link  key={recipe._id} href={`/recipe/${recipe._id}`} >
                  <Photo data={recipe} typeObj={'recipe'} />
               </Link>
            ))}
         </section>
      </div>
   )
}
