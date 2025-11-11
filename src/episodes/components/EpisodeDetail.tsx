import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../shared/hooks";
import type { Episode } from "../models";
import { GetEpisodeById } from "../services";
import type { AxiosError } from "axios";
import { GetCharactersById } from "../../characters/services";
import type { Character } from "../../characters/models";
import { extractUrlIds } from "../../utilities";

export const EpisodeDetail = () => {
  const { id } = useParams();
  const [characterIds, setCharactersIds] = useState<number[]>([]);
  const navigate = useNavigate();

  const {
    loading: episodeLoading,
    error: episodeError,
    data: episodeData,
    fetch: fetchEpisode,
  } = useApi<Episode>(() => GetEpisodeById(Number(id)));

  const {
    loading: charactersLoading,
    error: charactersError,
    data: charactersData,
    fetch: fetchCharacters,
  } = useApi<Character[]>(() => GetCharactersById(characterIds));

  useEffect(() => {
    if (id) {
      fetchEpisode();
    }
  }, [id]);

  useEffect(() => {
    if (episodeData && episodeData.characters.length > 0) {
      const ids = extractUrlIds(episodeData.characters);
      setCharactersIds(ids);
    }
  }, [episodeData]);

  useEffect(() => {
    if (characterIds.length > 0) {
      fetchCharacters();
    }
  }, [characterIds]);

  if (episodeLoading) {
    return <div>Loading...</div>;
  }

  if (episodeError) {
    const axiosError = episodeError as AxiosError;

    if (axiosError.response?.status === 404) {
      return <div>Episode with id: {id} not found</div>;
    }

    return <div>Error: {episodeError.message}</div>;
  }

  return (
    <div>
      <h1>{episodeData?.name}</h1>
      <p>
        <strong>Episode: </strong>
        {episodeData?.episode}
      </p>
      <p>
        <strong>Air date: </strong>
        {episodeData?.air_date}
      </p>
      <p>
        <strong>Created: </strong>
        {episodeData?.created}
      </p>

      <h3>Characters in this episode: ({episodeData?.characters.length})</h3>

      {charactersLoading && <p>Loading...</p>}

      {charactersError && <p>Error loading characters</p>}

      {charactersData && charactersData.length > 0 && (
        <ul>
          {charactersData.map((character) => (
            <li key={character.id}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/character/${character.id}`);
                }}
              >
                {character.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
