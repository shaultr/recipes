import {
  createCategory, readCategoryById, readCategorys, updateCategory, readCategory, deleteRecipeById,
} from "../../DL/controllers/category.controller";
import { deleteImageFromCloud, saveImgToCloud } from "../cloudinary/cloudinary";
import { checkFields } from "../function/function";

export const createCategorysService = async (category) => {
  checkFields(category, ["title", "colorLabel", "image"]);
  category.image = await saveImgToCloud(category.image, 'categoies');
  createCategory(category);
};
export const readCategoryByIdService = (id) => readCategoryById(id);
export const readCategorysService = () => readCategorys();
export const readCategoryService = (filter, populate, lean) =>
  readCategory(filter, populate, lean);
export const updateCategoryService = (id, data) => updateCategory(id, data);

export const deleteRecipeByIdService = async (id) => {
  const category = await readCategoryByIdService(id);
  if (category.image) await deleteImageFromCloud(category.image.image_public_id);
  if (category?.recipes.length > 0) {
    throw { message: "Can't delete category because it has recipes" };
  }

  await deleteRecipeById(id);
};
