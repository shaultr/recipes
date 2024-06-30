'use client'

import { useEffect, useState } from "react";
import { useFormState } from 'react-dom'

import Input from "../Input";
import Select from "../Select";
import AddIngredients from "../AddIngredients";
import styles from "./style.module.scss";
import { updateRecipeAction } from "@/server/DB/actions/recipe.action";

export const EditRecipe = ({ recipeName,setPopup }) => {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    fetch(`/api/recipe/${recipeName}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const { ingredients, typeFood, instructions, category, _id } = recipe;

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const updateRecipeActionId = updateRecipeAction.bind(null, recipeName);
  const [state, formAction] = useFormState(updateRecipeActionId)
  {state!==undefined&&setPopup(undefined)}

  return (
    <div className={styles.container}>
      <form action={formAction}>
        <div className={styles.inputes}>
          <Select typeFood={typeFood} cat={category?.[0].title} />
          <Input recipe={recipe} setRecipe={setRecipe} />
        </div>
        <div className={styles.add}>
          <AddIngredients ingredients={ingredients} setRecipe={setRecipe} />
        </div>
        <textarea
          value={instructions}
          onChange={handleTextChange}
          name="instructions"
          placeholder="הוראות הכנה"
          required
        />
        <button className={styles.btn} type="submit">
          סיום
        </button>
      </form>
    </div>
  );
};
