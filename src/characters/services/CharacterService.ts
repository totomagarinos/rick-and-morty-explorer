import type { Character, CharacterApiResponse } from "../models";
import { axiosService } from "./AxiosService";

const axiosInstance = axiosService.getAxiosInstance();

export const GetCharacter = (params?: {
  name?: string;
  status?: string;
  species?: string;
}) => {
  const controller = new AbortController();
  return {
    call: axiosInstance.get<CharacterApiResponse>(`/character`, {
      params,
      signal: controller.signal,
    }),
    controller,
  };
};

export const GetCharacterById = (id: number) => {
  const controller = new AbortController();
  return {
    call: axiosInstance.get<Character>(`/character/${id}`, {
      signal: controller.signal,
    }),
    controller,
  };
};
