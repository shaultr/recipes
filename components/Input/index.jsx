"use client";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";

export default function Input({ recipe, setRecipe }) {
  const [image, setImage] = useState(false);
  const [values, setValues] = useState({});
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const setFunc = setRecipe ? setRecipe : setValues;

    setFunc((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { title, description, preparationTime, CookingTime, servings } =
    recipe||values;
    const imageUrl =recipe ? recipe.image?.image_url ? recipe.image?.image_url : recipe.image : undefined;

  return (
    <div className={styles.container}>
      <input
        onChange={handleInputChange}
        value={title || ""}
        type="text"
        placeholder="שם המתכון"
        name="title"
        required
      />
      <input
        onChange={handleInputChange}
        value={description || ""}
        type="text"
        placeholder="תיאור"
        name="description"
      />
      <input
        onChange={handleInputChange}
        value={servings || ""}
        type="number"
        min="1"
        placeholder="מספר מנות"
        name="servings"
      />
      <div className={styles.time}>
        <input
          onChange={handleInputChange}
          value={preparationTime || ""}
          type="text"
          placeholder="זמן הכנה"
          name="preparationTime"
        />
        <input
          onChange={handleInputChange}
          value={CookingTime || ""}
          type="text"
          placeholder="זמן בישול/אפיה"
          name="CookingTime"
        />
      </div>
      <h3 onClick={() => setImage(!image)}>
        {recipe?.image ? "שנה תמונה" : "הוסף תמונה"}
      </h3>
      {image ? (
        <input type="file" name="image" />
      ) : (
        <img src={imageUrl || ""}></img>
      )}
    </div>
  );
}
