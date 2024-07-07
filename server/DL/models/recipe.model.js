import mongoose from "mongoose";
import Category from './category.model'
import { imageSchema } from "./imageSchema";
 


const recipeSchema = new mongoose.Schema({
  image:{
    type:imageSchema,
    required:true
  },
  title: {
    type: String,
    required: true,
  },
  ingredients: [{
    type: String,
    required: true,
  }],
  typeFood: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  preparationTime: {
    type: String,
  },
  CookingTime: {
    type: String,
  },
  servings: {
    type: Number,
  },
  category:
  [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Category',
    required: true,
  },]

});

export const RecipeModel =
  mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);
