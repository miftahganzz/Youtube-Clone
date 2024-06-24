import { NextApiRequest, NextApiResponse } from "next";
import { YouTube } from "youtube-sr";

export default async function Home(req: NextApiRequest, res: NextApiResponse) {
  const queries = [
    "trending music",
    "trending gaming",
    "tranding music 2024",
    "sad vibes",
    "random gaming",
    "random music",
    "random meme",
    "random game"
  ];

  const results = await Promise.all(
    queries.map(async (query) => {
      const videos = await YouTube.search(query); 
      return videos.map((video) => video.toJSON());
    })
  );

  return res.json(results);
}
