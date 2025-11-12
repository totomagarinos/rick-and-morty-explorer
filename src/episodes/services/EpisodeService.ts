import { axiosService } from "../../shared/services";
import { loadAbort } from "../../utilities/load-abort.utility";
import type { EpisodeApiResponse, Episode } from "../models";

const axiosInstance = axiosService.getAxiosInstance();

export const GetEpisodes = (params?: { page?: number }) => {
  const controller = loadAbort();

  return {
    call: axiosInstance.get<EpisodeApiResponse>("/episode", {
      params,
      signal: controller.signal,
    }),
    controller,
  };
};

export const GetEpisodeById = (id: number) => {
  const controller = loadAbort();

  return {
    call: axiosInstance.get<Episode>(`/episode/${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const GetEpisodesById = (ids: number[]) => {
  const controller = loadAbort();
  const idsString = ids.join(",");

  return {
    call: axiosInstance
      .get<Episode | Episode[]>(`/episode/${idsString}`, {
        signal: controller.signal,
      })
      .then((response) => {
        const data = Array.isArray(response.data)
          ? response.data
          : [response.data];
        return { ...response, data };
      }),
    controller,
  };
};
