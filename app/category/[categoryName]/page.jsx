import React from "react";
import { connectToMongo } from "@/server/DL/connectToMongo";
import { readCategoryService, readCategorysService} from "@/server/DB/service/category.service";
import styles from "./style.module.scss";
import Navlink from "@/components/NavLink";
import Photo from "@/components/Photo";
import NoRecipes from "@/components/recipe.component/NoRecipes";

export const generateStaticParams = async () => {
  await connectToMongo();
  const res = await readCategorysService();
  return res.map((category) => ({ categoryName: category.title }));
};

export default async function Category({ params: { categoryName } }) {
  await connectToMongo();
  const result = await readCategoryService({ title: decodeURI(categoryName) }, true);
  return (
    <div className={styles.photoContainer}>
      {result?.recipes.length > 0 ? (
        result.recipes.map((recipe, index) => (
          <Navlink key={index} href={`/recipe/${recipe._id}`}>
            <Photo data={recipe} typeObj="recipe" />
          </Navlink>
        ))
      ) : <NoRecipes />
}
    </div>
  );
}
