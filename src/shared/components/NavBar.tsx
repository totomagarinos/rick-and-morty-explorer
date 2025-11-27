import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FavoritesContainer } from "../../characters/components/FavoritesContainer";
import { FavoritesContext } from "../context";

export const NavBar = () => {
  const location = useLocation();
  const { favorites } = useContext(FavoritesContext);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const linkClass = (path: string) => {
    return `px-4 py-2 rounded-lg font-medium transition-colors ${
      isActive(path)
        ? "bg-green-400 text-black"
        : "text-gray-300 hover:bg-gray-700 hover:text-green-600"
    }`;
  };

  return (
    <nav className="bg-gray-800 p-4 mb-8 shadow-md">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="font-bangers text-3xl sm:text-4xl font-bold text-green-400 text-center sm:text-left">
            Rick and Morty Explorer
          </h1>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 max-w-xs sm:max-w-none mx-auto sm:mx-0">
            <Link to={`/`} className={linkClass("/")}>
              Characters
            </Link>
            <Link to={`/episodes`} className={linkClass("/episodes")}>
              Episodes
            </Link>
            <Link to={`/favorites`} className={linkClass("/favorites")}>
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
