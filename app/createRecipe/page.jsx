import { connectToMongo } from "@/server/DL/connectToMongo";
import Select from "@/components/Select";
import AddIngredients from "@/components/AddIngredients";
import styles from "./style.module.scss";
import { createRecipeAction } from "@/server/DB/actions/recipe.action";
import { readCategorysService } from "@/server/DB/category.service";
import Input from "@/components/Input";

export default async function CreateRecipe() {
  
  await connectToMongo();

  return (
    <div className={styles.container}>
      <form action={createRecipeAction}>
        <div className={styles.inputes}>
          <Select  />
          <Input />
        </div>
        <div className={styles.add}>
          <AddIngredients />
          <button className={styles.btn} type="submit">
            צור מתכון
          </button>
        </div>
        <textarea name="instructions" placeholder="הוראות הכנה" required/>
      </form>
    </div>
  );
}
