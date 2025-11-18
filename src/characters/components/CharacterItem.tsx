import { useNavigate } from "react-router-dom";
import type { Character } from "../models";
import { FavoriteButton } from "../../shared/components";

interface Props {
  character: Character;
}

export const CharacterItem = ({ character }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/character/${character.id}`);
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <div>
        <h2>{character.name}</h2>
        <FavoriteButton characterId={character.id} />
      </div>
      <img src={character.image} alt={character.name} />
      <p>{character.status}</p>
      <p>{character.species}</p>
    </div>
  );
};
