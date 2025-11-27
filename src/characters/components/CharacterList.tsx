import type { AxiosError } from "axios";
import type { Character } from "../models";
import { CharacterItem } from "./CharacterItem";

interface Props {
  characters: Character[];
  loading: boolean;
  error: Error | null;
}

export const CharacterList = ({ characters, loading, error }: Props) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading characters...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 404) {
      return (
        <div className="text-center py-12 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-xl text-yellow-800 font-medium">
            No characters found
          </p>
          <p className="text-gray-600 mt2">Try a different search or filter</p>
        </div>
      );
    }

    return (
      <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200">
        <p className="text-xl text-red-800 font-medium">Error</p>
        <p className="text-gray-600 mt-2">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {characters.map((character) => (
        <CharacterItem key={character.id} character={character} />
      ))}
    </div>
  );
};
