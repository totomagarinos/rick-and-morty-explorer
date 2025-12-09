import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export const FavoriteButton = ({ characterId }: { characterId: number }) => {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(characterId);
  };

  return (
    <button
      onClick={handleFavoriteClick}
      className="absolute top-2 right-2 rounded-full p-2 shadow-xl z-10 transition-all duration-200 bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800"
    >
      <span className="text-2xl">{isFavorite(characterId) ? "❤️" : "🤍"}</span>
    </button>
  );
};
