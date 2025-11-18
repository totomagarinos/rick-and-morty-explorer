import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export const FavoriteButton = ({ characterId }: { characterId: number }) => {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(characterId);
  };

  return (
    <button onClick={handleFavoriteClick}>
      {isFavorite(characterId) ? "❤️" : "🤍"}
    </button>
  );
};
