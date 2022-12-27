import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";


export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    const session:any = await getSession();
    const animeId = req.query.slug;
    console.log(session);

     if(req.method==="DELETE"){
        const anime = await prisma.favourite.delete({
            where:{
                id:animeId as string
            }
        });
        res.json(anime)
    }

}
