import { addRecipeToCategory, getCategoryId, removeRecipeFromCategory } from './categoryFunction'
import { readRecipeByIdService } from "../service/recipe.service";
import { saveImgToCloud } from "../cloudinary/cloudinary";
import { readCategoryById } from "@/server/DL/controllers/category.controller";
export const extractValues = (obj) => {
  const values = [];
  for (const key in obj) {
    if (key.startsWith("ingredients")) {
      obj[key] !== "" && values.push(obj[key]);
      delete obj[key];
    }
  }
  return values;
};

export const checkFields = (obj, fields) => {
  for (const field of fields) {
    if (obj[field] === "") {
      throw new Error(`Field '${field}' does not exist in object`);
    }
  }
};


export const changeCategory = async (recipeId, prevCat, newCat) => {
  await removeRecipeFromCategory(recipeId, prevCat);
  const newCatId = await getCategoryId(newCat);
  await addRecipeToCategory(recipeId, newCatId);
  changeRecipeCategory(recipeId, prevCat, newCatId);
};

export const changeRecipeCategory = async (recipeId, prevCat, newCat) => {
  const recipe = await readRecipeByIdService(recipeId, false, false);
  recipe.category = recipe.category.filter((id) => id.toString() !== prevCat);
  recipe.category.push({ _id: newCat });
  await recipe.save();

};

export const uploadImage = async (image, folder, imageDefault) => {
  return await saveImgToCloud(image, folder) || imageDefault;
};

export const isCategoryImage = async (image_url, category_id) => {
  const category = await readCategoryById(category_id);
  return category?.image?.image_url === image_url;
}
