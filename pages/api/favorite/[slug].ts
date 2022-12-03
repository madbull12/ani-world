import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";


export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    const email:any = req?.query?.slug;
    const animeId=req?.query?.slug;
    if(req.method==="GET") {
        try {
            const data = await prisma.favouriteAnime.findMany({
                where:{
                    userEmail:email 
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
                id:Number(animeId)
            }
        });
        res.json(anime)
    }

}
