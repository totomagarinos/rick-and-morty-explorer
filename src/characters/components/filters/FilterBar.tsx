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
    <div className="bg-gray-800 rounded-xl shadow-2xl shadow-green-500/10 p-6 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SearchInput value={searchValue} onChange={onSearchChange} />
        <StatusFilter value={statusValue} onChange={onStatusChange} />
        <SpeciesFilter value={speciesValue} onChange={onSpeciesChange} />

        {/* Botón de Búsqueda (Acento Portal) */}
        <button
          onClick={onApplyFilters}
          className="
            w-full px-6 py-2 
            bg-green-500 text-gray-900 font-extrabold text-lg 
            rounded-xl shadow-lg 
            hover:bg-green-400 active:bg-green-600 transition-colors 
            focus:outline-none focus:ring-4 focus:ring-green-500/50
          "
        >
          Search
        </button>
      </div>
    </div>
  );
};
