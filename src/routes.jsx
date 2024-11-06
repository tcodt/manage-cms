import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./layout/home/Home";
import Income from "./layout/home/Income";
import Reports from "./layout/home/Reports";
import Tasks from "./layout/home/Tasks";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/income", element: <Income /> },
      { path: "/reports", element: <Reports /> },
      { path: "/tasks", element: <Tasks /> },
    ],
  },
]);

export default routes;
