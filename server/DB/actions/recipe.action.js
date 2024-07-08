"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { extractValues, changeCategory, isCategoryImage } from "../function/function";
import {
  createRecipesService, readRecipeByIdService, updateRecipService,
} from "../service/recipe.service";
import { deleteImageFromCloud, saveImgToCloud } from "../cloudinary/cloudinary";
import { createCategorysService } from "../service/category.service";

export const createRecipeAction = async (fd) => {
  const body = Object.fromEntries(fd);

  try {
    await createRecipesService(body);
    revalidatePath(`/`);
  } catch (error) {
    console.log({ error });
  }
  redirect(`/`);
};


export const updateRecipeAction = async (id, prev, fd) => {
  let prevRecipe = await readRecipeByIdService(id);
  const categoryId = prevRecipe.category[0]._id.toString();
  const body = Object.fromEntries(fd);
  body.ingredients = extractValues(body);
  let img = fd.get("image")
  if (img) {
    const flag = await isCategoryImage(prevRecipe.image.image_url, categoryId)
    if (!flag) { await deleteImageFromCloud(prevRecipe?.image?.image_public_id) }
    body.image = await saveImgToCloud(img, 'recipeImage')
  }

  try {
    if (body.category) {
      await changeCategory(id, categoryId, { title: body.category });
      prevRecipe = await readRecipeByIdService(id);
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
    revalidatePath("/");
  } catch (error) {
    console.log({ error });
  }
  redirect("/");
};



