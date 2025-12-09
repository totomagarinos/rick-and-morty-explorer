import { Link, useLocation } from "react-router-dom";

export const NavBar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const linkClass = (path: string) => {
    return `
      px-5 py-2 rounded-full font-bold transition-all duration-300 text-sm tracking-wider
      ${
        isActive(path)
          ? "bg-green-400 text-gray-900 shadow-lg shadow-green-400/50"
          : "text-gray-200 hover:bg-gray-700 hover:text-green-400"
      }
    `;
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 p-4 mb-8 shadow-2xl shadow-black/70">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1
            // Título: Verde vibrante (300) y sombra de texto para que resalte
            className="
              font-extrabold text-4xl sm:text-5xl 
              text-green-300 text-center sm:text-left 
              drop-shadow-[0_0_5px_rgba(134,239,172,0.8)]
            "
          >
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
