import { readCategorysService } from "@/server/DB/service/category.service";
import { connectToMongo } from "@/server/DL/connectToMongo";
import { NextResponse } from "next/server";


export const GET = async () => {
   try {
      await connectToMongo()
      const recipes = await readCategorysService()
      return NextResponse.json(recipes);
   } catch (error) {
      console.log(error);
   }
}

