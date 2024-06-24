import { NextApiRequest, NextApiResponse } from "next";
import { YouTube } from "youtube-sr";

export default async function Home(req: NextApiRequest, res: NextApiResponse) {
  const videos = await YouTube.homepage();
  return res.json(videos.map((video) => video.toJSON()));
}
