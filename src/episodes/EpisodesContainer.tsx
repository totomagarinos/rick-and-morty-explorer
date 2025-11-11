import { useApi } from "../shared/hooks";
import { EpisodeList } from "./components/EpisodeList";
import type { EpisodeApiResponse } from "./models";
import { GetEpisodes } from "./services";

export const EpisodesContainer = () => {
  const { loading, data, error } = useApi<EpisodeApiResponse>(GetEpisodes, {
    autoFetch: true,
  });

  return (
    <EpisodeList
      loading={loading}
      error={error}
      episodes={data?.results || []}
    />
  );
};
