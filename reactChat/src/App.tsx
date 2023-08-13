import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import { createMuiTheme } from "./theme/theme";
import Explore from "./pages/Explore";
import ToggleColorMode from "./components/ToggleColorMode";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/explore/:categoryName" element={<Explore />} />
    </Route>
  )
);

const App: React.FC = () => {
  const theme = createMuiTheme();

  return (
    <ToggleColorMode>
      <RouterProvider router={router} />;
    </ToggleColorMode>
  );
};

export default App;
