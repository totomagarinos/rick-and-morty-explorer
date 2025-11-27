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
      className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors cursor-pointer shadow-lg"
    >
      <span className="text-2xl">{isFavorite(characterId) ? "❤️" : "🤍"}</span>
    </button>
  );
};
