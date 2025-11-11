import { useNavigate } from "react-router-dom";
import type { Episode } from "../models";

interface Props {
  episode: Episode;
}

export const EpisodeItem = ({ episode }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/episode/${episode.id}`);
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <h2>{episode.name}</h2>
      <p>Air date: {episode.air_date}</p>
      <h4>Characters: {episode.characters.length}</h4>
    </div>
  );
};
