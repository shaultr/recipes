import { deleteRecipe, readRecipesService } from "@/server/DB/recipe.service";
import { connectToMongo } from "@/server/DL/connectToMongo";
import { NextResponse } from "next/server";
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

export const GET = async (req) => {
   if (req?.method === 'GET') {
      try {
         await connectToMongo()
         const recipes = await readRecipesService()
         return NextResponse.json(recipes)
      } catch (error) {
         console.log(error);
      }
   }
}

export const POST = async (req) => {
   if (req.method === 'POST') {
     try {
       const body = await req.json();
       const imageFile = body.img;
 
       if (!imageFile) {
         return NextResponse.json({ error: 'Missing required parameter - img' }, { status: 400 });
       }
 
       const result = await cloudinary.uploader.upload(imageFile, {
         folder: "instructions-images"
       });
 
       console.log(":rocket: ~ POST ~ result:", result);
       return NextResponse.json({ url: result.secure_url });
     } catch (err) {
       console.log({ err });
       return NextResponse.json({ error: 'Image upload failed', details: err.message }, { status: 500 });
     }
   } else {
     return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
   }
 };