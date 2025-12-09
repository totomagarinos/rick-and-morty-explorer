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
        return "bg-green-400";
      case "Dead":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      onClick={handleClick}
      className="
        bg-gray-800 rounded-xl shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group border border-transparent
        hover:shadow-green-500/20 hover:border-green-500
      "
    >
      <div className="relative">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-56 object-cover group-hover:scale-[1.03] transition-transform duration-200"
        />
        <FavoriteButton characterId={character.id} />

        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full">
          <span
            className={`w-3 h-3 rounded-full ${getStatusColor()} shadow-md shadow-black/50`}
          ></span>
          <span className="text-white text-sm font-semibold tracking-wider">
            {character.status}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-extrabold text-green-400 mb-2 truncate group-hover:text-green-300 transition-colors">
          {character.name}
        </h2>

        <div className="space-y-1 text-sm text-gray-300">
          <p>
            <span className="font-semibold text-gray-400">Species:</span>{" "}
            {character.species}
          </p>
          <p className="truncate">
            <span className="font-semibold text-gray-400">Location:</span>{" "}
            {character.location.name}
          </p>
        </div>
      </div>
    </div>
  );
};
