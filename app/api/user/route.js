import { checkToken } from "@/server/DB/utils/jwt";
import { connectToMongo } from "@/server/DL/connectToMongo";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

await connectToMongo()   

export const POST = async (req) => {
   if (req.method === 'POST') {
      try {
         
         const cookieStore = cookies()
         const token = cookieStore.get('token');
         const {_id, permission} = checkToken(token.value)

         return NextResponse.json({_id:_id});
      } catch (error) {
         console.log(error.message);
      }
   }
}

export const DELETE = async (req) => {
   if (req.method === 'DELETE') {
      try {
         const cookieStore = cookies()
         cookieStore.delete('token');
         cookieStore.delete('avatar');
         cookieStore.delete('name');
         return NextResponse.json({ message: 'loged out' });
      } catch (error) {
         console.log(error.message);
      }

   }
}

