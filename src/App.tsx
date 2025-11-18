import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./routes/AppRouter";
import { NavBar } from "./shared/components";
import { FavoritesProvider } from "./shared/context";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <FavoritesProvider>
        <AppRouter />
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
