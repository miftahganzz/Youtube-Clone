import Nav from '@/components/nav/nav';
import VideoSearchCard from '@/components/page/VideoSearchCard';
import { IVideoInfo } from '@/components/page/common';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { interFont } from '@/lib/constants';
import { cn, fetcher, formatNumber, acronym } from '@/lib/utils';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Watch() {
  const router = useRouter();
  const { v } = router.query;

  const { data, error, isLoading } = useSWR<IVideoInfo>(() => {
    if (!v) {
      router.replace('/');
      return null;
    }
    return `/api/video?id=${encodeURIComponent(v as string)}`;
  }, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data || isLoading) return <div>Loading...</div>;

  const video = data.video;
  const relatedVideos = data.related;

  return (
    <>
      <Nav />
      <main className="px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4 my-4">
          <div className="flex-1">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&enablejsapi=1`}
              className="aspect-video border-none w-full"
              allowFullScreen
            />
            <div>
              <div className="py-2 flex justify-between items-center flex-col lg:flex-row">
                <div>
                  <h1 className="text-xl font-semibold">{video.title}</h1>
                </div>
                <div className="flex gap-2 items-center bg-secondary rounded-full p-3">
                  <div className="flex items-center gap-2 border-r dark:border-white/60 pr-4 cursor-pointer select-none">
                    <ThumbsUp className="h-5 w-5" />
                    <span>{formatNumber(video.ratings?.likes || 0)}</span>
                  </div>

                  <div>
                    <ThumbsDown className="h-5 w-5 cursor-pointer select-none" />
                  </div>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <Avatar>
                  <AvatarFallback>{acronym(video.channel.name)}</AvatarFallback>
                  <AvatarImage src={video.channel.icon.url} />
                </Avatar>
                <div>
                  <h1 className="font-semibold">{video.channel.name}</h1>
                  <p className="text-xs text-muted-foreground">
                    {video.channel.subscribers || 'N/A'} subscribers
                  </p>
                </div>
              </div>
              <div className="bg-secondary my-5 p-3 rounded-lg">
                <div className="text-sm font-semibold gap-3 flex">
                  <span>{video.views.toLocaleString()} views</span>
                  <span>{video.uploadedAt}</span>
                </div>
                <div className="overflow-auto">
                  <pre className={cn(interFont.className, 'break-words text-sm')}>
                    {video.description || 'N/A'}
                  </pre>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full lg:w-1/4">
            <h1 className="text-sm font-semibold">Related Videos</h1>
            {relatedVideos.length > 0 ? (
              relatedVideos.map((relatedVideo) => (
                <Link href={`/watch?v=${relatedVideo.id}`} key={relatedVideo.id}>
                  <VideoSearchCard key={relatedVideo.id} video={relatedVideo} small />
                </Link>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">No data available.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
