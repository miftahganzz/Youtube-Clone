import Nav from '@/components/nav/nav';
import VideoSearchCard from '@/components/page/VideoSearchCard';
import { VideoJSON } from '@/components/page/common';
import { fetcher } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Search() {
  const router = useRouter();
  const { q } = router.query;

  const {
    data: videos,
    error,
    isLoading,
  } = useSWR<VideoJSON[]>(() => {
    if (!q) {
      router.replace('/');
      return null;
    }
    return `/api/search?query=${q}`;
  }, fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Nav />
      <main className="container">
        <div className="flex flex-col gap-4 my-4">
          {videos?.map((video) => (
            <Link key={video.id} href={`/watch?v=${video.id}`}>
              <VideoSearchCard key={video.id} video={video} />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
