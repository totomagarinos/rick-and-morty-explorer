import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../shared/hooks";
import type { Episode } from "../models";
import { GetEpisodeById } from "../services";
import type { AxiosError } from "axios";
import { GetCharactersById } from "../../characters/services";
import type { Character } from "../../characters/models";
import { extractUrlIds } from "../../utilities";
import { CharacterItem } from "../../characters/components";

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
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-gray-900 rounded-xl p-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
          <p className="mt-4 text-green-400 font-bold text-xl">
            Loading episode...
          </p>
        </div>
      </div>
    );
  }

  if (episodeError) {
    const axiosError = episodeError as AxiosError;
    let errorMessage = episodeError.message;

    if (axiosError.response?.status === 404) {
      errorMessage = `Episode with ID: ${id} doesn't exist.`;
    }

    return (
      <div className="max-w-xl mx-auto p-6 bg-gray-900 border border-red-500 rounded-xl shadow-xl shadow-red-900/50 mt-8">
        <h2 className="text-2xl font-extrabold text-red-500 mb-2">Error!</h2>
        <p className="text-gray-300">{errorMessage}</p>
        <button
          onClick={() => navigate("/episodes")}
          className="mt-4 px-6 py-2 bg-green-500 text-gray-900 rounded-xl font-bold hover:bg-green-400 transition-colors"
        >
          Back to Episodes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/episodes")}
        className="mb-6 flex items-center gap-2 text-green-400 hover:text-green-300 font-bold transition-colors cursor-pointer text-lg"
      >
        <span>←</span> Back to Episodes
      </button>

      <div className="bg-gray-800 rounded-xl shadow-2xl shadow-green-500/10 p-6 md:p-10 border border-gray-700">
        <div className="border-b border-gray-700 pb-4 mb-6">
          <p className="text-xl font-extrabold text-green-400 mb-2">
            {episodeData?.episode}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            {episodeData?.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <p className="text-sm text-gray-400 mb-1">Air Date</p>
            <p className="text-lg font-bold text-white">
              {episodeData?.air_date}
            </p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <p className="text-sm text-gray-400 mb-1">Creation Date</p>
            <p className="text-lg font-bold text-white">
              {episodeData?.created
                ? new Date(episodeData.created).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <p className="text-sm text-gray-400 mb-1">Total Characters</p>
            <p className="text-3xl font-extrabold text-green-400">
              {episodeData?.characters.length}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-extrabold text-green-400 mb-6 border-b border-gray-700 pb-3">
          Characters: ({episodeData?.characters.length})
        </h2>

        {charactersLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            <p className="mt-2 text-gray-300">Loading Characters...</p>
          </div>
        )}

        {charactersError && (
          <p className="text-red-500 p-4 bg-gray-900 rounded-lg">
            Error loading characters for this episode.
          </p>
        )}

        {charactersData && charactersData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {charactersData.map((character) => (
              <CharacterItem key={character.id} character={character} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
