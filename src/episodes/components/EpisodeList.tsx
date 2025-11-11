import type { AxiosError } from "axios";
import type { Episode } from "../models";
import { EpisodeItem } from "./EpisodeItem";

interface Props {
  episodes: Episode[];
  loading: boolean;
  error: Error | null;
}

export const EpisodeList = ({ episodes, loading, error }: Props) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 404) {
      return <div>Episodes not found</div>;
    }

    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {episodes.map((episode) => (
        <EpisodeItem key={episode.id} episode={episode} />
      ))}
    </div>
  );
};
