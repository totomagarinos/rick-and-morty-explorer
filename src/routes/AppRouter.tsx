import { Route, Routes } from "react-router-dom";
import { CharactersContainer } from "../characters/CharactersContainer";
import { CharacterDetail } from "../characters/components";
import { EpisodesContainer } from "../episodes/EpisodesContainer";
import { EpisodeDetail } from "../episodes/components/EpisodeDetail";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CharactersContainer />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
      <Route path="/episodes" element={<EpisodesContainer />} />
      <Route path="/episode/:id" element={<EpisodeDetail />} />
    </Routes>
  );
};
