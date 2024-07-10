import mongoose from "mongoose";
import Recipe from '../models/recipe.model';
import { imageSchema } from "./imageSchema";

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        unique: true,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    avatar: imageSchema,
    password: {
        type: String,
        select: false,
        required: true

    },
    permission: {
        type: String,
        enum: ["admin", "editor", "user"],
        default: "user",
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    recipes: [{
        recipe: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Recipe',
        },
        isFavorite: Boolean,
        isEditor: Boolean,

    }],
    isActive: {
        type: Boolean,
        default: true,
    }

})

export const UserModel =
    mongoose.models.User || mongoose.model("User", userSchema);



