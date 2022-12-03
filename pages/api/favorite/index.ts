import { NextApiHandler, NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { unstable_getServerSession } from "next-auth/next"
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    const { title,imageUrl,malId } = req.body;
    const session:any = await unstable_getServerSession(req,res, authOptions)

    console.log(session)
    if(req.method === "POST") {
        try {
            await prisma.favouriteAnime.create({
                data:{
                    title,
                    imageUrl,
                    malId,
                    user:{
                        connect:{
                            id:session?.user?.id as string
                        }
                    }
                    
                }
            });
            res.status(201).json({message:"Favorite added"})
        }catch(err) {
            throw new Error("Mutation failed!")
        }
    }
}