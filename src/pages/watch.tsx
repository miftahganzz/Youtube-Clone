import Nav from '@/components/nav/nav';
import VideoSearchCard from '@/components/page/VideoSearchCard';
import { IVideoInfo, VideoJSON, ChannelInfo } from '@/components/page/common'; // Pastikan ChannelInfo atau tipe yang sesuai dengan properti subscribers ada di sini
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

  const { data, error, isValidating } = useSWR<IVideoInfo>(() => {
    if (!v) {
      router.replace('/');
      return null;
    }
    return `/api/video?id=${encodeURIComponent(
      `https://www.youtube.com/watch?v=${v}`
    )}`;
  }, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data || isValidating) return <div>Loading...</div>;

  // Menambahkan tipe data untuk channelInfo
  const channelInfo = data.video.channel as ChannelInfo;

  return (
    <>
      <Nav />
      <main className="px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4 my-4">
          <div className="flex-1">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${data.video.id}?autoplay=1&enablejsapi=1`}
                className="border-none w-full h-full"
                allowFullScreen
              />
            </div>
            <div>
              <div className="py-2 flex justify-between items-center flex-col lg:flex-row">
                <div>
                  <h1 className="text-xl font-semibold">{data.video.title}</h1>
                </div>
                <div className="flex gap-2 items-center bg-secondary rounded-full p-3">
                  <div className="flex items-center gap-2 border-r dark:border-white/60 pr-4 cursor-pointer select-none">
                    <ThumbsUp className="h-5 w-5" />
                    <span>{formatNumber(data.video.ratings.likes)}</span>
                  </div>
                  <div>
                    <ThumbsDown className="h-5 w-5 cursor-pointer select-none" />
                  </div>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <Avatar>
                  <AvatarFallback>{acronym(channelInfo.name)}</AvatarFallback>
                  <AvatarImage src={channelInfo.icon} />
                </Avatar>
                <div>
                  <h1 className="font-semibold">{channelInfo.name}</h1>
                  <p className="text-xs text-muted-foreground">
                    {channelInfo.subscribers ? `${channelInfo.subscribers} subscribers` : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="bg-secondary my-5 p-3 rounded-lg">
                <div className="text-sm font-semibold gap-3 flex">
                  <span>{formatNumber(data.video.views)} views</span>
                  <span>{data.video.uploadedAt}</span>
                </div>
                <div className="overflow-auto">
                  <pre className={cn(interFont.className, 'break-words text-sm')}>
                    {data.video.description}
                  </pre>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-sm font-semibold">Related Videos</h1>
            {data?.related?.map((video) => (
              <Link href={`/watch?v=${video.id}`} key={video.id}>
                <a>
                  <VideoSearchCard key={video.id} video={video} small />
                </a>
              </Link>
            )) || (
              <p className="text-xs text-muted-foreground">
                No related videos available.
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
