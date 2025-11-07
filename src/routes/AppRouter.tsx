import { Route, Routes } from "react-router-dom";
import { CharactersContainer } from "../characters/CharactersContainer";
import { CharacterDetail } from "../characters/components";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CharactersContainer />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
    </Routes>
  );
};
