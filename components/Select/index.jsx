"use client";

import { useRouter } from 'next/navigation';
import AddCategory from '../AddCategory';
import { Popup } from '../Popup';
import styles from './style.module.scss'
import { useEffect, useState } from 'react';
export default function Select({ typeFood = "בשרי/חלבי", cat = 'בחר קטגוריה' }) {
  const router = useRouter()

  const [category, setCategory] = useState([])
  const [createCategory, setCreateCategory] = useState(false)

  useEffect(() => {

    fetch(`/api/category`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => { setCategory(data) })
      .catch(error => console.error('Fetch error:', error));
  }, []);

  const handleChange = (event) => {
    if (event.target.value === 'addCategory') {
      router.push('/createCategory')
    }
  };

  return (
    <div className={styles.container}>
      <select onChange={handleChange} name="category" required={cat === 'בחר קטגוריה'}>
        <option value='' hidden disabled selected> {cat}</option>
        {category?.map((categoryItem, index) => (
         categoryItem.title !== cat && (<option key={index} value={categoryItem.title}>
            {categoryItem.title}
          </option>)
        ))}

      </select>
      <select name="typeFood" required={typeFood === "בשרי/חלבי"}>
        <option value="" hidden disabled selected> {typeFood}</option>
        <option>בשרי</option>
        <option>חלבי</option>
        <option>פרווה</option>
      </select>
    </div>
  );
}
