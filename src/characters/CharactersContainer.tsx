import { useEffect, useState } from "react";
import { CharacterList } from "./components";
import { useApi } from "../shared/hooks";
import { GetCharacters } from "./services";
import type { CharacterApiResponse } from "./models";
import { FilterBar } from "./components/filters";
import { useSearchParams } from "react-router-dom";

export const CharactersContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const nameParam = searchParams.get("name") || "";
  const statusParam = searchParams.get("status") || "";
  const speciesParam = searchParams.get("species") || "";

  const [searchValue, setSearchValue] = useState<string>(nameParam);
  const [statusValue, setStatusValue] = useState<string>(statusParam);
  const [speciesValue, setSpeciesValue] = useState<string>(speciesParam);

  const { loading, data, error, fetch } = useApi<CharacterApiResponse>(() =>
    GetCharacters({
      name: searchValue,
      status: statusValue,
      species: speciesValue,
    })
  );

  useEffect(() => {
    fetch();

    setSearchValue(nameParam);
    setStatusValue(statusParam);
    setSpeciesValue(speciesParam);
  }, [nameParam, statusParam, speciesParam]);

  const handleSearch = () => {
    const params: Record<string, string> = {};
    if (searchValue) params.name = searchValue;
    if (statusValue) params.status = statusValue;
    if (speciesValue) params.species = speciesValue;

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
    </div>
  );
};
