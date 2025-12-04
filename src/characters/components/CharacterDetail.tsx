import { Link, useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../shared/hooks";
import type { Character } from "../models";
import { GetCharacterById } from "../services";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { extractUrlIds } from "../../utilities";
import type { Episode } from "../../episodes/models";
import { GetEpisodesById } from "../../episodes/services";
import { FavoriteButton } from "../../shared/components";

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
        return "text-green-600 bg-green-50";
      case "Dead":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
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
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading character...</p>
        </div>
      </div>
    );
  }

  if (characterError) {
    const axiosError = characterError as AxiosError;

    if (axiosError.response?.status === 404) {
      return (
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-xl text-yellow-500 font-medium">
              Character not found
            </p>
            <p className="text-gray-600 mt-2">
              Character with ID {id} doesn't exist
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Characters
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-xl text-red-800 font-medium">Error</p>
          <p className="text-gray-600 mt-2">{characterError.message}</p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
      >
        <span>←</span> Back to Characters
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 relative">
            <img
              src={characterData?.image}
              alt={characterData?.name}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute top-4 left-4 px-3 py-1 rounded-full font-medium ${getStatusColor()}`}
            >
              {characterData?.status}
            </div>
          </div>

          <div className="md:w-2/3 p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                {characterData?.name}
              </h1>
              {characterData?.id !== undefined && (
                <FavoriteButton characterId={characterData?.id} />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounde-lg">
                <p className="text-sm text-gray-500 mb-1">Species</p>
                <p className="text-lg font-semibold text-gray-800">
                  {characterData?.status}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounde-lg">
                <p className="text-sm text-gray-500 mb-1">Gender</p>
                <p className="text-lg font-semibold text-gray-800">
                  {characterData?.gender}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Origin</p>
                <p className="text-lg font-semibold text-gray-800">
                  {characterData?.origin.name}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Current Location</p>
                <p className="text-lg font-semibold text-gray-800">
                  {characterData?.location.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {episodesData.map((episode) => (
              <Link
                key={episode.id}
                to={`/episode/${episode.id}`}
                className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors border border-gray-200 hover:border-blue-300"
              >
                <p className="text-sm font-bold text-blue-600 mb-1">
                  {episode.episode}
                </p>
                <p className="font-semibold text-gray-800 mb-2">
                  {episode.name}
                </p>
                <p className="text-xs text-gray-500">
                  Aired: {episode.air_date}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
