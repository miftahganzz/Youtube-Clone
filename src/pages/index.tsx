import useSWR from 'swr';
import Link from 'next/link';
import Nav from '@/components/nav/nav';
import VideoCard from '@/components/page/VideoCard';
import { fetcher } from '@/lib/utils';

interface VideoJSON {
  id: string;
  title: string;
  thumbnail: { url: string };
}

interface QueryResult {
  query: string;
  videos: VideoJSON[];
}

export default function Home() {
  const { data: results, error } = useSWR<QueryResult[]>('/api/home', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!results) return <div>Loading...</div>;

  return (
    <>
      <Nav />
      <main className="container">
        {results.map((result, index) => (
          <div key={index} className="my-5">
            <h2 className="text-xl font-bold mb-3">Category: {result.query}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-row gap-5">
              {result.videos.map((video) => (
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
