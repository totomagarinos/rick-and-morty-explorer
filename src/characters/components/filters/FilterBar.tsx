import { SearchInput } from "./SearchInput";
import { SpeciesFilter } from "./SpeciesFilter";
import { StatusFilter } from "./StatusFilter";

interface Props {
  searchValue: string;
  statusValue: string;
  speciesValue: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSpeciesChange: (value: string) => void;
  onApplyFilters: () => void;
}

export const FilterBar = ({
  searchValue,
  statusValue,
  speciesValue,
  onSearchChange,
  onStatusChange,
  onSpeciesChange,
  onApplyFilters,
}: Props) => {
  return (
    <div>
      <SearchInput value={searchValue} onChange={onSearchChange} />
      <StatusFilter value={statusValue} onChange={onStatusChange} />
      <SpeciesFilter value={speciesValue} onChange={onSpeciesChange} />
      <button onClick={onApplyFilters}>Buscar</button>
    </div>
  );
};
