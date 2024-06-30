"use client"
import { useState } from 'react'
import AddCategory from '@/components/AddCategory'
import { Popup } from '@/components/Popup'
import { useRouter } from 'next/navigation';
import { connectToMongo } from '@/server/DL/connectToMongo';

export default async function createCategory() {
    const router = useRouter()
    const [popup, setPopup] = useState(true);
    await connectToMongo()

    return (
        <div>
            {
                popup ?
                    <Popup setPopup={setPopup}>
                        <AddCategory />
                    </Popup> :
                    router.push('/createRecipe')
            }
        </div>
    )
}
