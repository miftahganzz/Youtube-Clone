import type { Video, Channel } from 'youtube-sr';

export type VideoJSON = ReturnType<Video['toJSON']>;

export interface IVideoInfo {
  video: VideoJSON;
  related: VideoJSON[];
}

export interface ChannelInfo extends Channel {
  subscribers?: string; 
}
