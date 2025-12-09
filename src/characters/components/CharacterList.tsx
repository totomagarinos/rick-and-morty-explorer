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
      <div className="flex justify-center items-center min-h-[400px] bg-gray-900 rounded-xl p-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
          <p className="mt-4 text-green-400 font-bold text-xl">
            Loading characters...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    const axiosError = error as AxiosError;
    let errorMessage = error.message;

    if (axiosError.response?.status === 404) {
      errorMessage = "No characters found";
    }

    return (
      <div className="max-w-xl mx-auto p-6 bg-gray-900 border border-red-500 rounded-xl shadow-xl shadow-red-900/50">
        <h2 className="text-2xl font-extrabold text-red-500 mb-2">Error!</h2>
        <p className="text-gray-300">{errorMessage}</p>
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
