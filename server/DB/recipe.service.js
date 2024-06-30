import { MdPeopleOutline } from "react-icons/md";
import { updateCategory } from "../DL/controllers/category.controller";
import {
  createRecipe,
  deleteRecipeById,
  readRecipeById,
  readRecipes,
  updateRecipe,
} from "../DL/controllers/recipe.controller";
import { extractValues, checkFields, uploadImage } from "./function/function";
import { revalidatePath } from "next/cache";
import { addRecipeToCategoryWhthId, removeRecipeFromCategory } from "./function/categoryFunction";
import { getCategoryDetails } from "./function/recipeFunction";

export const createRecipesService = async (recipe) => {
  checkFields(recipe, ["title", "ingredients", "typeFood", "instructions", "category"]);

  const { categoryId, imageDefault } = await getCategoryDetails(recipe.category);
  recipe.image = await uploadImage(recipe.image, imageDefault)
  console.log(recipe.image)
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
export const readRecipeByIdService = (id, populate, lean) => readRecipeById(id, populate,lean);

export const deleteRecipe = async (recipeId, categoryId) => {
  try {
    await removeRecipeFromCategory(recipeId, categoryId);
    await deleteRecipeById(recipeId);
    revalidatePath("/");

  } catch (error) {
    console.log({ error });
  }

};
