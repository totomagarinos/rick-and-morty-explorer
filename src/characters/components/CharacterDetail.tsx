import { useParams } from "react-router-dom";
import { useApi } from "../../shared/hooks";
import type { Character } from "../models";
import { GetCharacterById } from "../services";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { extractUrlIds } from "../../utilities";
import type { Episode } from "../../episodes/models";
import { GetEpisodesById } from "../../episodes/services";

export const CharacterDetail = () => {
  const { id } = useParams();
  const [episodeIds, setEpisodesIds] = useState<number[]>([]);

  const {
    loading: characterLoading,
    error: characterError,
    data: characterData,
    fetch: fetchCharacter,
  } = useApi<Character>(() => GetCharacterById(Number(id)));

  const {
    loading: episodesLoading,
    error: episodesError,
    data: episodesData,
    fetch: fetchEpisodes,
  } = useApi<Episode[]>(() => GetEpisodesById(episodeIds));

  useEffect(() => {
    if (id) {
      fetchCharacter();
    }
  }, [id]);

  useEffect(() => {
    if (characterData && characterData?.episode.length > 0) {
      const ids = extractUrlIds(characterData.episode);
      setEpisodesIds(ids);
    }
  }, [characterData]);

  useEffect(() => {
    if (episodeIds.length > 0) {
      fetchEpisodes();
    }
  }, [episodeIds]);

  if (characterLoading) {
    return <div>Loading...</div>;
  }

  if (characterError) {
    const axiosError = characterError as AxiosError;

    if (axiosError.response?.status === 404) {
      return <div>Character with id: {id} not found</div>;
    }

    return <div>Error: {characterError.message}</div>;
  }

  return (
    <div>
      <h2>{characterData?.name}</h2>
      <img src={characterData?.image} alt={characterData?.name} />
      <p>Status: {characterData?.status}</p>
      <p>Species: {characterData?.species}</p>
      <p>Gender: {characterData?.gender}</p>
      <p>Origin: {characterData?.origin.name}</p>
      <p>Location: {characterData?.location.name}</p>

      <h3>Episodes: ({characterData?.episode.length})</h3>

      {episodesLoading && <p>Loading episodes...</p>}

      {episodesError && <p>Error loading episodes</p>}

      {episodesData && episodesData.length > 0 && (
        <ul>
          {episodesData.map((episode) => (
            <li key={episode.id}>
              <strong>{episode.episode}</strong> - {episode.name}
              <br />
              <small>Air date: {episode.air_date}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
