import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";


export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    const session:any = await getSession();
    const animeId = req.query.slug;
    console.log(session);
    if(req.method==="GET") {
        try {
            const data = await prisma.favouriteAnime.findMany({
                where:{
                    userId:session?.user.id as string
                }
            });

            res.status(200).json(data);
         
        } catch(err) {
            res.status(400).json({err:err})
        }
 
        
    } 
     if(req.method==="DELETE"){
        const anime = await prisma.favouriteAnime.delete({
            where:{
                id:animeId as string
            }
        });
        res.json(anime)
    }

}
