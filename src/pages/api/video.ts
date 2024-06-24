import { NextApiRequest, NextApiResponse } from 'next';
import { YouTube } from 'youtube-sr';

export default async function GetVideo(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Video id is required' });
  }

  try {
    const video = await YouTube.getVideo(id);
    const relatedVideos = await video.related();

    res.status(200).json({
      video: video.toJSON(),
      related: relatedVideos.map((v) => v.toJSON()),
    });
  } catch (error) {
    console.error('Error fetching video data:', error);
    res.status(500).json({ message: 'Failed to fetch video data' });
  }
}
