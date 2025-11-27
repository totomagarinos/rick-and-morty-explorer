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
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SearchInput value={searchValue} onChange={onSearchChange} />
        <StatusFilter value={statusValue} onChange={onStatusChange} />
        <SpeciesFilter value={speciesValue} onChange={onSpeciesChange} />
        <button
          onClick={onApplyFilters}
          className="w-full px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
    </div>
  );
};
