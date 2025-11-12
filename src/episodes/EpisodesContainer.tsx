import { useSearchParams } from "react-router-dom";
import { useApi } from "../shared/hooks";
import { EpisodeList } from "./components/EpisodeList";
import type { EpisodeApiResponse } from "./models";
import { GetEpisodes } from "./services";
import { Pagination } from "../shared/components";
import { useEffect } from "react";

export const EpisodesContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page") || 1);

  const { loading, data, error, fetch } = useApi<EpisodeApiResponse>(() =>
    GetEpisodes({ page: pageParam })
  );

  useEffect(() => {
    fetch();
  }, [pageParam]);

  const handlePageChange = (newPage: number) => {
    const params: Record<string, string> = {};
    params.page = String(newPage);

    setSearchParams(params);
  };

  return (
    <div>
      <EpisodeList
        loading={loading}
        error={error}
        episodes={data?.results || []}
      />

      <Pagination currentPage={pageParam} onPageChange={handlePageChange} />
    </div>
  );
};
