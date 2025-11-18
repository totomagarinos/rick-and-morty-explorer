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
      <div>
        <h1>Favorites</h1>
        <p>You haven't added any favorites yet!</p>
        <p>
          Click the heart icon on any character to add them to your favorites.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Favorites ({favorites.length})</h1>
      <CharacterList characters={characters} loading={loading} error={error} />
    </div>
  );
};
