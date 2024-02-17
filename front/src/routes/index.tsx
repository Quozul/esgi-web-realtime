import { createBrowserRouter } from "react-router-dom";
import NewQuiz from "./NewQuiz.tsx";
import QuizList from "./QuizList.tsx";
import Quiz from "./Quiz.tsx";

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
    path: "/quiz/:id",
    element: <Quiz />,
  },
  {
    path: "/quiz",
    element: <QuizList />,
  },
]);
