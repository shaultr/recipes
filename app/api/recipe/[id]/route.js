import { deleteRecipe, readRecipeByIdService} from "@/server/DB/recipe.service";
import { connectToMongo } from "@/server/DL/connectToMongo";
import { NextResponse } from "next/server";


// export const PUT = async (req, { params }) => {
//    try {
//       const body = await req.json();
//       const { id } = params;
//       const searchParams = Object.fromEntries(req.nextUrl.searchParams)
//       return NextResponse.json({ body, id, searchParams })
//    } catch (error) {
//       console.log(error);
//    }
// }

export const GET = async (req, { params }) => {
   if(req.method === "GET"){

      try {
         await connectToMongo()
         const { id } = params;
         const recipes = await readRecipeByIdService( id, true )
         return NextResponse.json(recipes);
      } catch (error) {
         console.log(error);
      }
   }
}

export const DELETE = async (req, { params }) => {
   if(req.method === 'DELETE'){
      const { id } = params;
      const body = await req.json(); 
      const { category } = body;
      try {
         await deleteRecipe(id, category);
         return NextResponse.json({ message: 'Recipe deleted successfully' });
      } catch (error) {
         console.log(error);
      }
   }
}


