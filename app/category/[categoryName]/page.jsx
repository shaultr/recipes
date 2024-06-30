import React from "react";
import { connectToMongo } from "@/server/DL/connectToMongo";
import { readCategoryService, readCategorysService } from "@/server/DB/category.service";
import styles from "./style.module.scss";
import Navlink from "@/components/NavLink";
import Photo from "@/components/Photo";

export const generateStaticParams = async () => {
  await connectToMongo();
  const res = await readCategorysService();
  return res.map(category => ({ categoryName: category.title }));
}

export default async function Category({ params: { categoryName } }) {
  const result = await readCategoryService({ title: decodeURI(categoryName) }, true);
  return (
    <div className={styles.photoContainer}>
      {result?.recipes.map((category, index) => (
        <Navlink key={index} href={`/recipe/${category._id}`}>
          <Photo data={category} typeObj={"recipe"} />
        </Navlink>
      ))}
    </div>
  );
}
