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
      <h1 className="text-4xl font-extrabold text-green-400 mb-8 border-b border-gray-700 pb-3">
        Episodes
      </h1>

      <EpisodeList
        loading={loading}
        error={error}
        episodes={data?.results || []}
      />

      <Pagination
        currentPage={pageParam}
        totalPages={data?.info.pages || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
