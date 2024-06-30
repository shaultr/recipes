import { readCategoryService, updateCategoryService } from "../category.service";

export const getCategoryId = async (filter) =>
  (await readCategoryService(filter))._id.toString();

export const removeRecipeFromCategory = async (recipeId, categoryId) => {
  const category = await readCategoryService({ _id: categoryId },false,false);
  category.recipes = category.recipes.filter(
    (id) => id.toString() !== recipeId
  );
  await category.save();
};

export const addRecipeToCategory = async (recipeId, categoryId) => {
  let category = await readCategoryService({ _id: categoryId },false,false);
  if (!category) {
    throw new Error(`Category with _id ${categoryId} not found.`);
  }
  if (!category.recipes.includes(recipeId)) {
    category.recipes.push(recipeId);
    await category.save();
  }
};

export const addRecipeToCategoryWhthId = async (categoryId, recipeId) => {
  await updateCategoryService(categoryId, { $push: { recipes: recipeId } });
};