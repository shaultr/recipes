"use server";

import { revalidatePath } from "next/cache";
import { RedirectType, redirect } from "next/navigation";
import { extractValues, getCategoryId,changeCategory } from "../function/function";
import {
  createRecipesService,
  readRecipeByIdService,
  updateRecipService,
} from "../recipe.service";
import { createCategorysService } from "../category.service";
import { saveImgToCloud } from "../cloudinary/cloudinary";

export const createRecipeAction = async (fd) => {
  const body = Object.fromEntries(fd);
  const category = body.category.toString()

  try {
    await createRecipesService(body);
    revalidatePath(`/`);
  } catch (error) {
    console.log({ error });
  }
  redirect(`/`);
};


export const updateRecipeAction = async (id,prev,fd) => {
  const body = Object.fromEntries(fd);
  body.ingredients = extractValues(body);
   let img = fd.get("image")
   
   if (img) { body.image = await saveImgToCloud(img)  }
  
  try {
    let recipe = await readRecipeByIdService(id);
    if (body.category) {
      const categoryId = recipe.category[0]._id.toString();
      await changeCategory(id, categoryId, {title:body.category});
      recipe = await readRecipeByIdService(id);
    }
    await updateRecipService(id, body);
    revalidatePath(`/recipe/${id}`);
    return "The recipe has been successfully updated";
  } catch (error) {
    console.log({ error });
  }

  redirect(`/recipe/${id}`);
};

export const cretaeCategoryAction = async (fd) => {
  const body = Object.fromEntries(fd);
  try {
    await createCategorysService(body);
    revalidatePath("/createRecipe");
  } catch (error) {
    console.log({ error });
  }
  redirect("/createRecipe");
};



