import React, { useContext } from 'react'
import styles from './style.module.scss'
import { useRouter } from "next/navigation"


export const DeleteConfirm = ({ type, setPopup, _id, category, title }) => {
  const router = useRouter()

  const handleDelete = async () => {

    try {
      if (type === 'recipe') {
        const response = await fetch(`/api/recipe/${_id}`, {
          method: 'DELETE',
          cache: 'no-store',
          body: JSON.stringify({ category }),
        });
        if (response.ok) {
          router.push(`/category/${title}`, undefined, { shallow: false })
          setPopup(undefined)

        }
      }
      else if (type === 'category') {
        console.log(type, _id);
        setPopup(undefined)

      }

    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>אתה בטוח רוצה <br /> למחוק את המתכון הזה?</h1>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.confirmButton}`} onClick={handleDelete}>אישור</button>
        <button className={`${styles.button} ${styles.cancelButton}`} onClick={() => setPopup(undefined)}>ביטול</button>
      </div>

    </div>
  )
}
