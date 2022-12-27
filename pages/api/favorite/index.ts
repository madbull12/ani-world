import {
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
  NextPageContext,
} from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, imageUrl, malId,type } = req.body;
  const session: any = await unstable_getServerSession(req, res, authOptions);

  console.log(session);
  if (req.method === "POST") {
    try {
      await prisma.favourite.create({
        data: {
              type:type as string,
              title: title as string,
              imageUrl: imageUrl as string,
              malId: malId as number,
              user: {
                connect: {
                  id: session?.user?.id as string,
                },
              },
              
              
        },
   
      });
      res.status(201).json({ message: "Favorite added" });
    } catch (err) {
      throw new Error("Mutation failed!");
    }
  }
  if (req.method === "GET") {
    try {
      const data = await prisma.favourite.findMany({
        where: {
            userId: session?.user?.id as string,
          },
    
      });

      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ err: err });
    }
  }
}
