import { NextApiRequest, NextApiResponse } from 'next';
import { YouTube } from 'youtube-sr';

export default async function GetVideo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: 'Video id is required' });

  const video = await YouTube.getVideo(`${id}`);
  return res.json({
    video: video.toJSON(),
    related: video.videos?.map((v) => v.toJSON()) || [],
  });
}
