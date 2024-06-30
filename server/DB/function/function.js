import { readCategoryService, updateCategoryService } from "../category.service";
import {addRecipeToCategory, getCategoryId, removeRecipeFromCategory} from './categoryFunction'
import { readRecipeByIdService } from "../recipe.service";
import { saveImgToCloud } from "../cloudinary/cloudinary";
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

export const uploadImage = async (image, imageDefault) => {
  return await saveImgToCloud(image) || imageDefault;
};
