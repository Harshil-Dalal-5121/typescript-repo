import { createBrowserRouter } from "react-router-dom";

import Index from "./views";
import Projects from "./views/projects";
import Tasks from "./views/tasks";
import Tickets from "./views/tickets";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "tickets",
        element: <Tickets />,
      },
    ],
  },
]);

export default router;
