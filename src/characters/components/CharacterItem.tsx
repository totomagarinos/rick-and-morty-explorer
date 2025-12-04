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

  const getStatusColor = () => {
    switch (character.status) {
      case "Alive":
        return "bg-green-500";
      case "Dead":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden group"
    >
      <div className="relative">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <FavoriteButton characterId={character.id} />

        <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className={`w-2 h-2 rounded-full ${getStatusColor()}`}></span>
          <span className="text-white text-sm font-medium">
            {character.status}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
          {character.name}
        </h2>

        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-semibold">Species:</span> {character.species}
          </p>
          <p className="truncate">
            <span className="font-semibold">Location:</span>{" "}
            {character.location.name}
          </p>
        </div>
      </div>
    </div>
  );
};
