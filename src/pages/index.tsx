import Nav from '@/components/nav/nav';
import VideoCard from '@/components/page/VideoCard';
import { VideoJSON } from '@/components/page/common';
import { fetcher } from '@/src/lib/utils';
import Link from 'next/link';
import useSWR from 'swr';

export default function Home() {
  const {
    data: videos,
    error,
    isLoading,
  } = useSWR<VideoJSON[]>('/api/home', fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Nav />
      <main className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-row gap-5 my-5">
          {videos!.map((video) => {
            return (
              <Link key={video.id} href={/watch?v=${video.id}}>
                <VideoCard key={video.id} video={video} />
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
