import type { Character } from "../models";

interface Props {
  character: Character;
}

export const CharacterItem = ({ character }: Props) => {
  return (
    <div>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>{character.status}</p>
      <p>{character.species}</p>
    </div>
  );
};
