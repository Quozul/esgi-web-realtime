import { FormEvent, useState } from "react";
import { useSocket } from "../hooks/SocketProvider.tsx";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export interface Answer {
  content: string,
  isValid: boolean
}

export default function NewQuiz() {
  const socket = useSocket();
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([])

  const addAnswer = () => {
    setAnswers((prevState) => {
      return [
        ...prevState,
        {content: "", isValid: false}
      ]
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (answers.length < 2) {
      toast.error("Il faut au moins 2 réponses pour créer un quiz");
      return;
    }

    socket.emit("createForm", {
      question,
      answers
    });

    setQuestion("");
    setAnswers([]);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Créer un quiz</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          value={question}
          required={true}
          onChange={({currentTarget}) => setQuestion(currentTarget.value)}
          placeholder="Question"
          type="text"
          autoFocus={true}
          className="p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={addAnswer}
          type="button"
          className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          Ajouter une réponse
        </button>
        {answers.map((answer, i) => (
          <div key={i} className="flex items-center gap-4">
            <input
              type="text"
              required={true}
              value={answer.content}
              onChange={(event) => {
                setAnswers((prevState) => {
                  return prevState.map((prevAnswer, j) => {
                    if (j === i) {
                      return {
                        ...prevAnswer,
                        content: event.target.value
                      }
                    }
                    return prevAnswer
                  })
                })
              }}
              className="flex-1 p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="checkbox"
              checked={answer.isValid}
              onChange={(event) => {
                setAnswers((prevState) => {
                  return prevState.map((prevAnswer, j) => {
                    if (j === i) {
                      return {
                        ...prevAnswer,
                        isValid: event.target.checked
                      }
                    }
                    return prevAnswer
                  })
                })
              }}
              className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => {
                setAnswers((prevState) => {
                  return prevState.filter((_, j) => j !== i)
                })
              }}
              className="py-2 px-4 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
            >
              Supprimer
            </button>
          </div>
        ))}
        <button
          type="submit"
          className="py-3 px-6 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
        >
          Créer
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
