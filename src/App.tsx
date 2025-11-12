import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./routes/AppRouter";
import { NavBar } from "./shared/components";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
