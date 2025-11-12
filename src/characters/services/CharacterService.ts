import { axiosService } from "../../shared/services";
import { loadAbort } from "../../utilities/load-abort.utility";
import type { Character, CharacterApiResponse } from "../models";

const axiosInstance = axiosService.getAxiosInstance();

export const GetCharacters = (params?: {
  name?: string;
  status?: string;
  species?: string;
  page?: number;
}) => {
  const controller = loadAbort();

  return {
    call: axiosInstance.get<CharacterApiResponse>("/character", {
      params,
      signal: controller.signal,
    }),
    controller,
  };
};

export const GetCharacterById = (id: number) => {
  const controller = loadAbort();

  return {
    call: axiosInstance.get<Character>(`/character/${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const GetCharactersById = (ids: number[]) => {
  const controller = loadAbort();
  const idsString = ids.join(",");

  return {
    call: axiosInstance.get<Character[]>(`/character/${idsString}`, {
      signal: controller.signal,
    }),
    controller,
  };
};
