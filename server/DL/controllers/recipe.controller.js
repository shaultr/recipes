import { RecipeModel } from "../models/recipe.model"

export const readRecipes = () => RecipeModel.find().lean()
export const readRecipeById = async (id, populate = false, lean = true) => {
   const recipe = populate ? RecipeModel.findById(id).populate('category') : RecipeModel.findById(id);
   if(lean) recipe.lean();
   return recipe;
}

export const createRecipe = (data) => RecipeModel.create(data)
export const updateRecipe= (id, data) => RecipeModel.findByIdAndUpdate({ _id: id }, data, { new: true }).lean();

export const deleteRecipeById = (id) => RecipeModel.deleteOne({ _id: id })