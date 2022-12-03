import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    const { title,imageUrl,userEmail,malId } = req.body;
    if(req.method === "POST") {
        try {
            await prisma.favouriteAnime.create({
                data:{
                    title,
                    imageUrl,
                    userEmail,
                    malId
                }
            });
            res.status(201).json({message:"Note created"})
        }catch(err) {
            res.status(400).json({error:err})
        }
    }
}