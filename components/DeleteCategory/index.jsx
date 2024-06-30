"use client"
import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import styles from "./style.module.scss";
import { useState } from "react";
import { Popup } from "../Popup";
import { DeleteConfirm } from '../DeleteConfirm';


export default function DeleteCategory({ categoryId }) {
  const [popup, setPopup] = useState(undefined)

  return (
    <>
      <div
        onClick={() => setPopup(<DeleteConfirm type={'category'} _id={categoryId} setPopup={setPopup} category={'category'} title={'title'} />)}
      >
        <FaRegTrashAlt className={styles.icon} />
      </div>
      {popup && <Popup setPopup={setPopup} >
        {popup}
      </Popup>}
    </>
  )
}
