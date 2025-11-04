export interface ApiInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface ApiLinkedElement {
  name: string;
  url: string;
}

interface Origin extends ApiLinkedElement {}
interface Location extends ApiLinkedElement {}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type?: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterApiResponse {
  info: ApiInfo;
  results: Character[];
}
