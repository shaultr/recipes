import { NextResponse } from "next/server";
import { deleteRecipeByIdService } from "@/server/DB/service/category.service";
import { connectToMongo } from "@/server/DL/connectToMongo";
import { isAdmin } from "@/server/DB/function/userAuth";

export const DELETE = async (req, { params }) => {
    await connectToMongo()
    if(req.method === 'DELETE'){
       const { id } = params;
       try {
         if(!isAdmin()) throw new Error("רק מנהל יכול למחוק קטגוריה")
          await deleteRecipeByIdService(id);
          return NextResponse.json({ message: 'המתכון נמחק בהצלחה' });
       } catch (error) {
          console.log(error?.message);
          return NextResponse.json({ error: error?.message });

       }
    }
 }