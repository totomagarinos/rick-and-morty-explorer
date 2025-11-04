import type { CharacterApiResponse } from "../models";
import { axiosService } from "./AxiosService";

export const BASE_URL = "https://rickandmortyapi.com/api";

const axiosInstance = axiosService.getAxiosInstance();

export const GetCharacter = (params?: {
  name?: string;
  status?: string;
  species?: string;
}) => {
  const controller = new AbortController();
  return {
    call: axiosInstance.get<CharacterApiResponse>(`${BASE_URL}/character`, {
      params,
      signal: controller.signal,
    }),
    controller,
  };
};
