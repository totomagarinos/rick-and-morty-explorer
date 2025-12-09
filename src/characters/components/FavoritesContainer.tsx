import { useContext, useEffect, useState } from "react";
import type { Character } from "../models";
import { GetCharactersById } from "../services";
import { CharacterList } from "./CharacterList";
import { AxiosError } from "axios";
import { FavoritesContext } from "../../shared/context";

export const FavoritesContainer = () => {
  const { favorites } = useContext(FavoritesContext);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    if (favorites.length === 0) {
      setCharacters([]);
      return;
    }

    const fetchFavorites = async () => {
      try {
        setLoading(true);
        setError(null);

        const { call } = GetCharactersById(favorites);
        const response = await call;
        setCharacters(response.data);
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  if (favorites.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-10 bg-gray-800 rounded-xl shadow-2xl shadow-green-500/10 border border-gray-700 text-center">
        <h1 className="text-4xl font-extrabold text-green-400 mb-4">
          No Favorites Found
        </h1>
        <p className="text-xl text-white mb-4">
          You haven't added any favorites yet!
        </p>
        <p className="text-lg text-gray-300">
          Click the{" "}
          <span className="text-red-500 font-bold">🤍 heart icon</span> on any
          character to add them to your favorites list.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-green-400 mb-8 border-b border-gray-700 pb-3">
        My Favorites ({favorites.length})
      </h1>
      <CharacterList characters={characters} loading={loading} error={error} />
    </div>
  );
};
