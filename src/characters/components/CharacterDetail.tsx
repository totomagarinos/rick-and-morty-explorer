import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../shared/hooks";
import type { Character } from "../models";
import { GetCharacterById } from "../services";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { extractUrlIds } from "../../utilities";
import type { Episode } from "../../episodes/models";
import { GetEpisodesById } from "../../episodes/services";
import { FavoriteButton } from "../../shared/components";
import { EpisodeItem } from "../../episodes/components/EpisodeItem";

export const CharacterDetail = () => {
  const { id } = useParams();
  const [episodeIds, setEpisodesIds] = useState<number[]>([]);
  const navigate = useNavigate();

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

  const getStatusColor = () => {
    switch (characterData?.status) {
      case "Alive":
        return "text-green-300 bg-green-900 border-green-500";
      case "Dead":
        return "text-red-300 bg-red-900 border-red-500";
      default:
        return "text-gray-300 bg-gray-900 border-gray-500";
    }
  };

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
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-gray-900 rounded-xl p-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
          <p className="mt-4 text-green-400 font-bold text-xl">
            Loading character...
          </p>
        </div>
      </div>
    );
  }

  if (characterError) {
    const axiosError = characterError as AxiosError;
    let errorMessage = characterError.message;

    if (axiosError.response?.status === 404) {
      errorMessage = `Character with ID: ${id} doesn't exist.`;
    }

    return (
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-gray-900 border border-red-500 rounded-xl p-6 text-center shadow-2xl shadow-red-900/50">
          <p className="text-2xl text-red-500 font-extrabold mb-2">Error!</p>
          <p className="text-gray-300 mt-2">{errorMessage}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-2 bg-green-500 text-gray-900 rounded-xl font-bold hover:bg-green-400 transition-colors"
          >
            Back to Characters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-green-400 hover:text-green-300 font-bold transition-colors cursor-pointer text-lg"
      >
        <span>←</span> Back to Characters
      </button>

      <div className="bg-gray-800 rounded-xl shadow-2xl shadow-green-500/10 overflow-hidden border border-gray-700">
        <div className="md:flex">
          <div className="md:w-1/3 relative">
            <img
              src={characterData?.image}
              alt={characterData?.name}
              className="w-full h-full object-cover min-h-[300px]"
            />
            <div
              className={`absolute top-4 left-4 px-3 py-1 rounded-full font-bold border ${getStatusColor()} shadow-lg`}
            >
              {characterData?.status}
            </div>
          </div>

          <div className="md:w-2/3 p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 drop-shadow-md">
                {characterData?.name}
              </h1>
              {characterData?.id !== undefined && (
                <FavoriteButton characterId={characterData?.id} />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <p className="text-sm text-gray-400 mb-1">Species</p>
                <p className="text-lg font-bold text-white">
                  {characterData?.species}
                </p>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <p className="text-sm text-gray-400 mb-1">Gender</p>
                <p className="text-lg font-bold text-white">
                  {characterData?.gender}
                </p>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <p className="text-sm text-gray-400 mb-1">Origin</p>
                <p className="text-lg font-bold text-white">
                  {characterData?.origin.name}
                </p>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <p className="text-sm text-gray-400 mb-1">Current Location</p>
                <p className="text-lg font-bold text-white">
                  {characterData?.location.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-800 rounded-xl shadow-2xl shadow-black/30 p-6 md:p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3">
          Episodes ({characterData?.episode.length})
        </h2>

        {episodesLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>

            <p className="mt-2 text-gray-600">Loading episodes...</p>
          </div>
        )}

        {episodesError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p4 text-center">
            <p className="text-red-800">Error loading episodes</p>
          </div>
        )}

        {episodesData && episodesData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {episodesData.map((episode) => (
              <EpisodeItem key={episode.id} episode={episode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
