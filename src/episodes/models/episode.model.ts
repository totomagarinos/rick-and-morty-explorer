import type { ApiInfo } from "../../characters/models";

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface EpisodeApiResponse {
  info: ApiInfo;
  results: Episode[];
}
