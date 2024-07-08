import {
  createRecipe, deleteRecipeById, readRecipeById, readRecipes, updateRecipe,
} from "../../DL/controllers/recipe.controller";
import { extractValues, checkFields, uploadImage, isCategoryImage } from "../function/function";
import { revalidatePath } from "next/cache";
import { addRecipeToCategoryWhthId, removeRecipeFromCategory } from "../function/categoryFunction";
import { getCategoryDetails } from "../function/recipeFunction";
import { deleteImageFromCloud } from "../cloudinary/cloudinary";

export const createRecipesService = async (recipe) => {
  checkFields(recipe, ["title", "ingredients", "typeFood", "instructions", "category"]);

  const { categoryId, imageDefault } = await getCategoryDetails(recipe.category);
  recipe.image = await uploadImage(recipe.image, 'recipeImage', imageDefault)
  recipe.ingredients = extractValues(recipe);
  recipe.category = categoryId;

  const createdRecipe = await createRecipe(recipe);
  const idRecipe = createdRecipe._id;
  await addRecipeToCategoryWhthId(categoryId, idRecipe);
  return idRecipe;
};

export const updateRecipService = async (id, data) => {
  const { category, ...dataWithoutTitle } = data; // Extract title and keep the rest
  return await updateRecipe(id, dataWithoutTitle);
};


export const readRecipesService = () => readRecipes();
export const readRecipeByIdService = (id, populate, lean) => readRecipeById(id, populate, lean);

export const deleteRecipe = async (recipeId, categoryId) => {
  try {
    await removeRecipeFromCategory(recipeId, categoryId);
    const recipe = await readRecipeById(recipeId);
    const flag = await isCategoryImage(recipe?.image?.image_url, categoryId)
    if (!flag) { await deleteImageFromCloud(recipe?.image?.image_public_id) }
    await deleteRecipeById(recipeId);
    revalidatePath("/");

  } catch (error) {
    console.log({ error });
  }

};
