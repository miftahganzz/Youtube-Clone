import useSWR from 'swr';
import Link from 'next/link';
import Nav from '@/components/nav/nav';
import VideoCard from '@/components/page/VideoCard';
import { VideoJSON } from '@/components/page/common';
import { fetcher } from '@/lib/utils';

export default function Home() {
  const { data: results, error, isValidating } = useSWR<any[]>('/api/home', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!results) return <div>Loading...</div>;

  return (
    <>
      <Nav />
      <main className="container">
        {results.map((videos, index) => (
          <div key={index} className="my-5">
            <h2 className="text-xl font-bold mb-3">Query {index + 1}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-row gap-5">
              {videos.map((video: VideoJSON) => (
                <Link key={video.id} href={`/watch?v=${video.id}`}>
                  <a>
                    <VideoCard key={video.id} video={video} />
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
