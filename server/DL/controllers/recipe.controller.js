import { RecipeModel } from "../models/recipe.model"

export const readRecipes = (filter = {}, populate = false, lean = true) => {
   let query = RecipeModel.find(filter);
   if (populate) {
     query = query.populate('category');
   }
   if (lean) {
     query = query.lean();
   }
   return query;
 };
 
export const readRecipeById = async (filter = {}, populate = false, lean = true) => {
   const recipe = populate ? RecipeModel.findById(filter).populate('category') : RecipeModel.findById(id);
   if(lean) recipe.lean();
   return recipe;
}

export const createRecipe = (data) => RecipeModel.create(data)
export const updateRecipe= (id, data) => RecipeModel.findByIdAndUpdate({ _id: id }, data, { new: true }).lean();

export const deleteRecipeById = (id) => RecipeModel.deleteOne({ _id: id })