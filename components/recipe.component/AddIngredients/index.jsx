"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.scss";

export default function AddIngredien({ ingredients }) {
  const [arrIngredients, setArrIngredients] = useState([]);

  useEffect(() => {
    if (ingredients) {
      setArrIngredients(ingredients);
    }
  }, [ingredients]);

  const handleAddIngredients = () => {
    const updatedArr = [...arrIngredients, ""];
    setArrIngredients(updatedArr);
  };

  const handleDelIngredients = () => {
    if (arrIngredients.length > 0) {
      const updatedArr = arrIngredients.slice(0, -1);
      setArrIngredients(updatedArr);
    }
  };

  const handleIngredientsChange = (event, index) => {
    const updatedArrIngredients = [...arrIngredients];
    updatedArrIngredients[index] = event.target.value;
    setArrIngredients(updatedArrIngredients);
  };

  return (
    <div className={styles.container}>
      <h2>רשימת רכיבים</h2>
      <div className={styles.buttes}>
        <input type="button" value="+" onClick={handleAddIngredients} />
        <input type="button" value="-" onClick={handleDelIngredients} />
      </div>
      <div className={styles.btn}></div>
      <div className={styles.add}>
        {(!ingredients || arrIngredients.length === 0) && (
          <input
            type="text"
            placeholder="הוסף רכיב"
            name="ingredients"
            required
            onChange={(e) => handleIngredientsChange(e)}
          />
        )}
      </div>
      {arrIngredients?.map((item, index) => (
        <div className={styles.add} key={index}>
          <input
            value={item}
            type="text"
            placeholder="הוסף רכיב"
            name={`ingredients${index}`}
            onChange={(e) => handleIngredientsChange(e, index)}
          />
        </div>
      ))}
    </div>
  );
}
