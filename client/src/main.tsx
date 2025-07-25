import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import "./assets/styles/global.css";
import App from "./App";
import Search from "./components/search/search.tsx";
import About from "./pages/about/about";
import AdvancedSearch from "./pages/advancedSearchConstruct/advancedSearchConstruct.tsx";
import { SignUp } from "./pages/auth/index.ts";
import SignIn from "./pages/auth/signIn.tsx";
import Creator from "./pages/creator/creator";
import Error404 from "./pages/error/error404.tsx";
import GCU from "./pages/gcu/gcu.tsx";
import Home from "./pages/home/home";
import LegalNotices from "./pages/legalNotices/legalNotices";
import Results from "./pages/results/results";
import ToDoList from "./pages/todolist/todolist";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/search",
        element: <Search />,
      },

      {
        path: "/advanced_search",
        element: <AdvancedSearch />,
      },

      {
        path: "/results",
        element: <Results />,
      },

      {
        path: "/todolist/:gameId",
        element: <ToDoList />,
      },

      {
        path: "/Connexion",
        element: <SignIn />,
      },

      {
        path: "/Inscription",
        element: <SignUp />,
      },

      {
        path: "/CGU",
        element: <GCU />,
      },

      {
        path: "/mentions-legales",
        element: <LegalNotices />,
      },

      {
        path: "/creator",
        element: <Creator />,
      },
      {
        path: "/a_propos",
        element: <About />,
      },
      {
        path: "/Erreur",
        element: <Error404 />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
