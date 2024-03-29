import { useParams } from "react-router-dom";
import { useSocket } from "../hooks/SocketProvider.tsx";
import { FormEvent, useEffect, useState } from "react";
import { Answer } from "./NewQuiz.tsx";
import { toast, ToastContainer } from "react-toastify";
import clsx from "clsx";

type RoomData = {
  elapsed: number;
  playerCount: number;
  quiz: {
    question: string;
    answers: Answer[];
  };
};

type Feedback = { isValid: boolean; answers: Answer[] };

export default function Room() {
  const socket = useSocket();
  const { id } = useParams();

  const [data, setData] = useState<RoomData>({
    elapsed: 0,
    playerCount: 0,
    quiz: {
      question: "",
      answers: [],
    },
  });
  const [checkedAnswers, setCheckedAnswers] = useState<string[]>([]);
  const [questionStates, setQuestionStates] = useState<{
    [key: string]: { isSubmitted: boolean };
  }>({});

  useEffect(() => {
    socket.emit("joinRoom", { id });

    const infoListener = (data: RoomData) => {
      setData(data);
    };

    const feedbackListener = (data: Feedback) => {
      if (data.isValid) {
        toast.success("Bravo, c'est la bonne réponse !");
      } else {
        toast.error("Mauvaise réponse");
      }
    };

    socket.on("roomInfo", infoListener);
    socket.on("feedback", feedbackListener);

    return () => {
      socket.emit("leaveRoom", { id });
      socket.off("roomInfo", infoListener);
      socket.off("feedback", feedbackListener);
    };
  }, [socket, id]);

  const handleSubmit = (event: FormEvent, questionId: string) => {
    event.preventDefault();

    if (checkedAnswers.length === 0) {
      toast.error("Il y a au moins une bonne réponse");
      return;
    }

    socket.emit("submitAnswers", {
      id,
      answers: checkedAnswers,
    });

    setQuestionStates((prev) => ({
      ...prev,
      [questionId]: { ...prev[questionId], isSubmitted: true },
    }));

    setCheckedAnswers([]);
  };

  const millisecondsToSeconds = (ms: number) => Math.floor(ms / 1000);

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-4">Room {id}</h1>
      <div className="flex justify-between mb-8 md:flex-row flex-col-reverse">
        <p className="text-lg mb-2">
          Temps écoulé: {millisecondsToSeconds(data.elapsed) ?? 0} secondes
        </p>
        {data.playerCount > 0 && (
          <div className="flex gap-2 items-center bg-white md:px-2 pr-3 pl-2 pt-0.5 md:pb-2 md:p-0 pb-4 rounded-lg shadow max-w-max">
            {Array.from({ length: Math.min(data.playerCount, 4) }).map(
              (_, i) => (
                <span key={i} className="w-4 h-4 text-xl">
                  🦸
                </span>
              )
            )}
            {data.playerCount > 5 && (
              <span className="text-teal-700 font-semibold">
                +{data.playerCount - 5}
              </span>
            )}
          </div>
        )}
      </div>
      {data.quiz.question ? (
        <>
          <h2 className="text-2xl font-semibold mb-6">
            Question : {data.quiz.question ?? "Soyez prêt..."}
          </h2>
          <form onSubmit={(event) => handleSubmit(event, data.quiz.question)}>
            <ul className="list-none pl-0 flex flex-col md:flex-row md:gap-8 gap-4 flex-wrap">
              {data.quiz.answers.map((answer, i) => {
                const className = clsx(
                  "flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:scale-105",
                  {
                    "bg-teal-700 text-white animate-bounce":
                      questionStates[data.quiz.question]?.isSubmitted &&
                      answer.isValid,
                    "bg-red-700 text-white":
                      questionStates[data.quiz.question]?.isSubmitted &&
                      !answer.isValid &&
                      !checkedAnswers.includes(answer.content),
                    "bg-teal-700 text-white":
                      checkedAnswers.includes(answer.content) &&
                      !questionStates[data.quiz.question]?.isSubmitted,
                    "bg-white border-teal-700":
                      !checkedAnswers.includes(answer.content) &&
                      !questionStates[data.quiz.question]?.isSubmitted,
                  }
                );

                return (
                  <li key={i} className="mb-2 flex-1">
                    <div className={className}
                      onClick={() => {
                        if (questionStates[data.quiz.question]?.isSubmitted)
                          return;
                        const isSelected = checkedAnswers.includes(
                          answer.content
                        );
                        setCheckedAnswers((prevState) =>
                          isSelected
                            ? prevState.filter(
                                (prevAnswer) => prevAnswer !== answer.content
                              )
                            : [...prevState, answer.content]
                        );
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          readOnly
                          checked={checkedAnswers.includes(answer.content)}
                          onClick={(event) => event.stopPropagation()}
                          className="opacity-0 absolute"
                          aria-hidden="true"
                        />
                        {answer.content}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <button
              type="submit"
              disabled={questionStates[data.quiz.question]?.isSubmitted}
              className={`py-2 px-4 ${questionStates[data.quiz.question]?.isSubmitted ? "bg-gray-500" : "bg-teal-700"} text-white rounded-lg shadow hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors w-full mt-4`}
            >
              {questionStates[data.quiz.question]?.isSubmitted
                ? "La prochaine question arrive"
                : "Envoyer"}
            </button>
          </form>
        </>
      ) : (
        <p className="text-center text-2xl font-bold">Préparez-vous...</p>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
