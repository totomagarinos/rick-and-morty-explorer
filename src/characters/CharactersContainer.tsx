import { useState } from "react";
import { CharacterList } from "./components";
import { useApi } from "../shared/hooks";
import { GetCharacter } from "./services";
import type { CharacterApiResponse } from "./models";
import { FilterBar } from "./components/filters";

export const CharactersContainer = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [statusValue, setStatusValue] = useState<string>("");
  const [speciesValue, setSpeciesValue] = useState<string>("");

  const { loading, data, error, fetch } = useApi<CharacterApiResponse>(
    () =>
      GetCharacter({
        name: searchValue,
        status: statusValue,
        species: speciesValue,
      }),
    { autoFetch: true }
  );

  const handleSearch = () => {
    fetch();
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
        characters={data?.results || []}
        error={error}
      />
    </div>
  );
};
