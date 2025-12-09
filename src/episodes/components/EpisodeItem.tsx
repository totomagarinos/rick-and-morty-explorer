import { Link } from "react-router-dom";
import type { Episode } from "../models";

interface Props {
  episode: Episode;
}

export const EpisodeItem = ({ episode }: Props) => {
  return (
    <Link
      to={`/episode/${episode.id}`}
      className="
        bg-gray-800 p-5 rounded-xl shadow-lg transition-all duration-300 cursor-pointer border border-gray-700
        hover:bg-gray-700 hover:shadow-xl hover:shadow-green-500/15 hover:border-green-500/50
      "
    >
      <h2 className="text-xl font-bold text-white mb-2 truncate">
        {episode.name}
      </h2>
      <p className="text-sm text-gray-400">
        <span className="font-semibold text-gray-300">Air date:</span>
        {episode.air_date}
      </p>
      <p className="text-sm text-gray-400 mt-1">
        <span className="font-semibold text-gray-300">Characters:</span>
        <span className="text-green-400 font-bold ml-1">
          {episode.characters.length}
        </span>
      </p>
    </Link>
  );
};
