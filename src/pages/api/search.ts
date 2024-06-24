import { NextApiRequest, NextApiResponse } from "next";
import { YouTube } from "youtube-sr";

export default async function Home(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;
  if (!query)
    return res.status(400).json({ message: "Search query is required" });

  const videos = await YouTube.search(`${query}`);
  return res.json(videos.map((video) => video.toJSON()));
}
