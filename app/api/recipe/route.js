import { deleteRecipe, readRecipesService } from "@/server/DB/recipe.service";
import { connectToMongo } from "@/server/DL/connectToMongo";
import { NextResponse } from "next/server";
import cloudinary from 'cloudinary';

// הגדרת Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

// GET פונקציית ה-
export const GET = async (req) => {
  try {
    console.log('Connecting to MongoDB...');
    await connectToMongo();
    console.log('Fetching recipes...');
    const recipes = await readRecipesService();
    console.log('Recipes fetched:', recipes);
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
};

// POST פונקציית ה-
export const POST = async (req) => {
  try {
    const body = await req.json();
    const imageFile = body.img;

    if (!imageFile) {
      return NextResponse.json({ error: 'Missing required parameter - img' }, { status: 400 });
    }

    console.log('Uploading image to Cloudinary...');
    const result = await cloudinary.v2.uploader.upload(imageFile, {
      folder: "instructions-images"
    });

    console.log('Image uploaded:', result);
    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    console.error('Error uploading image:', err);
    return NextResponse.json({ error: 'Image upload failed', details: err.message }, { status: 500 });
  }
};
