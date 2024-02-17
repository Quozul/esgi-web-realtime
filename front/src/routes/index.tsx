import { createBrowserRouter } from "react-router-dom";
import NewQuiz from "./NewQuiz.tsx";
import RoomList from "./RoomList.tsx";
import Room from "./Room.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/create-quiz",
    element: <NewQuiz />,
  },
  {
    path: "/room/:id",
    element: <Room />,
  },
  {
    path: "/room",
    element: <RoomList />,
  },
]);
