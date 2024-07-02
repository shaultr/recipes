import mongoose from "mongoose";
import Recipe from '../models/recipe.model';
import { imageSchema } from "./imageSchema";

const categorySchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  image: {
    type: imageSchema,
    required: true,
  },
  colorLabel: {
    type: String,
    required: true,
  },

  recipes:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}],
});

export const CategoryModel =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
