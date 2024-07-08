import mongoose from "mongoose";
import Category from './category.model'
import { imageSchema } from "./imageSchema";



const recipeSchema = new mongoose.Schema({
  image: {
    type: imageSchema,
    required: true
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
  createDate: {
    type: Date,
    default: Date.now,
  },editor:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  category:
    [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },],
    likes: {
      type: [String],
      default: []
    }, 
    views: {
      type: [String],
      default: [], 
    }
  
});

export const RecipeModel =
  mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);
