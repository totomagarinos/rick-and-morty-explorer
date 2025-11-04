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
    return <div>Loading...</div>;
  }

  if (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 404) {
      return <div>No characters found</div>;
    }

    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {characters.map((character) => (
        <CharacterItem key={character.id} character={character} />
      ))}
    </div>
  );
};
