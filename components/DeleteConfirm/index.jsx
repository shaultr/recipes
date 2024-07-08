import React, { useState } from "react";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";
import SuccessMessage from "../SuccessMessage";
import Spinner from "../Spinner";

export const DeleteConfirm = ({ type, setPopup, _id, category, title }) => {
  const [isClick, setIsClick] = useState(false)

  const router = useRouter();

  const handleDelete = async () => {
    setIsClick(true)

    const options = { method: "DELETE", cache: "no-store" };

    if (category) options.body = JSON.stringify({ category });

    const response = await fetch(`/api/${type}/${_id}`, options);
    const data = await response?.json();

    if (data.message) {
      router.push(`/${category ? `category/${title}` : ''}`, undefined, { shallow: false });
      setPopup(<SuccessMessage message={`${data.message}`} />);
      setTimeout(() => {
        setPopup(undefined);
      }, 2000);
    }
    else {
      setPopup(`${data.error}`);

    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        אתה בטוח<br /> שברצונך למחוק ?
      </h1>
      <div className={styles.buttons}>
        <button

          className={`${styles.button} ${styles.confirmButton} ${isClick ? styles.click : ''}`}
          onClick={handleDelete}
        >
          אישור
        </button>
        <button
          className={`${styles.button} ${styles.cancelButton}`}
          onClick={() => setPopup(undefined)}
        >
          ביטול
        </button>
      </div>
      {isClick && <Spinner />}
    </div>
  );
};
