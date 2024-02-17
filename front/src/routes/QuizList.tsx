import useSocket from "../hooks/useSocket.ts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Quiz } from "../types/Quiz.ts";

export default function QuizList() {
  const socket = useSocket();
  const [quizzes, setQuizzes] = useState<Record<string, Quiz>>({});

  useEffect(() => {
    socket.on("quizList", setQuizzes);
  }, [socket]);

  return (
    <div>
      {Object.entries(quizzes).map(([id, quiz]) => {
        return (
          <Link to={`/quiz/${id}`} key={id}>
            {quiz.question}
          </Link>
        );
      })}

      <Link to="/create-quiz">Créer un quiz</Link>
    </div>
  );
}
