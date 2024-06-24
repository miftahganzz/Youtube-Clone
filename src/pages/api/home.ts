import { NextApiRequest, NextApiResponse } from 'next';
import { YouTube } from 'youtube-sr';

function getRandomQueries(queries: string[], count: number) {
  const shuffled = queries.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default async function Home(req: NextApiRequest, res: NextApiResponse) {
  const queries = [
    'Trending Music Indonesia',
    'Trending Gaming',
    'Trending Music 2024 Indonesia',
    'Sad Vibes',
    'Random Gaming',
    'Random Music Indonesia',
    'Random Meme Indonesia',
    'Random Game Indonesia'
  ];

  const randomQueries = getRandomQueries(queries, 5);

  try {
    const results = await Promise.all(
      randomQueries.map(async (query) => {
        const videos = await YouTube.search(query);
        return {
          category: query,
          videos: videos.map((video) => video.toJSON())
        };
      })
    );

    const categorizedResults = results.reduce((acc, curr) => {
      acc[curr.category] = curr.videos;
      return acc;
    }, {});

    return res.status(200).json(categorizedResults);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return res.status(500).json({ message: 'Failed to fetch videos' });
  }
}
