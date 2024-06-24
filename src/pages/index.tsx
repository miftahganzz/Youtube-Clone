import useSWR from 'swr';
import Link from 'next/link';
import Nav from '@/components/nav/nav';
import VideoCard from '@/components/page/VideoCard';
import { VideoJSON } from '@/components/page/common';
import { fetcher } from '@/lib/utils';
import styles from '@/styles/globals.css'; 

export default function Home() {
  const { data: results, error } = useSWR<any[]>('/api/home', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!results) return (
    <div className="spinner"></div>
  );

  return (
    <>
      <Nav />
      <main className="container">
        {results.map((videos, index) => (
          <div key={index} className="my-5">
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
