import LoadPhoto from '@/components/LoadPhotos'
import React from 'react'
import styles from './style.module.scss'

const loading = () => {
  return (
      <div>
      <div className={styles.load}></div>
      <LoadPhoto/>
      </div>
  )
}

export default loading