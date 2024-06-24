import { formatNumber, shorten } from "@/lib/utils";
import { VideoJSON } from "./common";

interface IProps {
  video: VideoJSON;
}

export default function VideoCard({ video }: IProps) {
  return (
    <div>
      <div className="relative">
        <img
          src={video.thumbnail.url}
          alt={video.id}
          width={360}
          height={200}
          className="rounded-xl"
        />
        <span className="absolute bottom-[5px] right-[5px] bg-gray-900 text-gray-50 text-sm px-1 rounded-sm">
          {video.duration_formatted}
        </span>
      </div>
      <div className="mt-3">
        <h1 className="font-semibold" title={video.title}>
          {shorten(video.title)}
        </h1>
        <p className="text-muted-foreground text-sm">{video.channel.name}</p>
        <p className="text-xs text-muted-foreground">
          <span>{formatNumber(video.views)}</span> •{" "}
          <span>{video.uploadedAt}</span>
        </p>
      </div>
    </div>
  );
}
