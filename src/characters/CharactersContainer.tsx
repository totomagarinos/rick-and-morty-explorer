import { useEffect, useState } from "react";
import { CharacterList } from "./components";
import { useApi } from "../shared/hooks";
import { GetCharacters } from "./services";
import type { CharacterApiResponse } from "./models";
import { FilterBar } from "./components/filters";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "../shared/components";

export const CharactersContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const nameParam = searchParams.get("name") || "";
  const statusParam = searchParams.get("status") || "";
  const speciesParam = searchParams.get("species") || "";
  const pageParam = Number(searchParams.get("page")) || 1;

  const [searchValue, setSearchValue] = useState<string>(nameParam);
  const [statusValue, setStatusValue] = useState<string>(statusParam);
  const [speciesValue, setSpeciesValue] = useState<string>(speciesParam);

  const { loading, data, error, fetch } = useApi<CharacterApiResponse>(() =>
    GetCharacters({
      name: searchValue,
      status: statusValue,
      species: speciesValue,
      page: pageParam,
    })
  );

  useEffect(() => {
    fetch();

    setSearchValue(nameParam);
    setStatusValue(statusParam);
    setSpeciesValue(speciesParam);
  }, [nameParam, statusParam, speciesParam, pageParam]);

  const handleSearch = () => {
    const params: Record<string, string> = {};
    if (searchValue) params.name = searchValue;
    if (statusValue) params.status = statusValue;
    if (speciesValue) params.species = speciesValue;
    params.page = "1";

    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params: Record<string, string> = {};
    if (searchValue) params.name = searchValue;
    if (statusValue) params.status = statusValue;
    if (speciesValue) params.species = speciesValue;
    params.page = String(newPage);

    setSearchParams(params);
  };

  return (
    <div>
      <FilterBar
        searchValue={searchValue}
        statusValue={statusValue}
        speciesValue={speciesValue}
        onSearchChange={setSearchValue}
        onStatusChange={setStatusValue}
        onSpeciesChange={setSpeciesValue}
        onApplyFilters={handleSearch}
      />

      <CharacterList
        loading={loading}
        error={error}
        characters={data?.results || []}
      />

      <Pagination currentPage={pageParam} onPageChange={handlePageChange} />
    </div>
  );
};
