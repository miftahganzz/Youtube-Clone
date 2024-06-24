import { NextApiRequest, NextApiResponse } from "next";
import { YouTube } from "youtube-sr";

const allQueries = [
  "the weeknd save your tears",
  "trending music",
  "latest hits",
  "pop music 2024",
  "top 10 songs",
  "best of 2023",
  "new music videos",
  "hip hop charts",
  "classical music",
  "jazz essentials",
  'Trending Music',
  'Trending Gaming',
  'Trending Music 2024',
  'Sad Vibes',
  'Random Gaming',
  'Random Music',
  'Random Meme',
  'Random Game'
];

function getRandomQueries(queries: string[], count: number) {
  const shuffled = queries.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default async function Home(req: NextApiRequest, res: NextApiResponse) {
  try {
    const queries = getRandomQueries(allQueries, 5);

    const results = await Promise.all(
      queries.map(async (query) => {
        const videos = await YouTube.search(query);
        return {
          query,
          videos: videos.map((video) => video.toJSON())
        };
      })
    );

    return res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
