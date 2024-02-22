import { createBrowserRouter } from "react-router-dom";
import NewQuiz from "./NewQuiz.tsx";
import RoomList from "./RoomList.tsx";
import Room from "./Room.tsx";
import NotFound from "./NotFound.tsx";
import Layout from "../Layout.tsx";
import { ComponentType } from "react";

const wrapInLayout = (PageComponent: ComponentType) => (
  <Layout>
    <PageComponent />
  </Layout>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: wrapInLayout(RoomList),
  },
  {
    path: "/create-quiz",
    element: wrapInLayout(NewQuiz),
  },
  {
    path: "/room/:id",
    element: wrapInLayout(Room),
  },
  {
    path: "*",
    element: wrapInLayout(NotFound),
  },
]);
