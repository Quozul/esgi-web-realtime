import { FormEvent, useState } from "react";
import { useSocket } from "../hooks/SocketProvider.tsx";

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

    socket.emit("createForm", {
      question,
      answers
    });

    setQuestion("");
    setAnswers([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={question}
        required={true}
        onChange={({ currentTarget }) => {
          setQuestion(currentTarget.value);
        }}
        placeholder="Question"
      />
      <button onClick={addAnswer} type={"button"}>Ajouter une réponse</button>
      {answers.map((answer, i) => {
          return (
            <div key={i}>
              <input type="text" required={true} value={answer.content} onChange={(event) => {
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
              }}></input>
              <input type={"checkbox"} checked={answer.isValid} onChange={(event) => {
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
              }}></input>
              <button type={"button"} onClick={() => {
                setAnswers((prevState) => {
                  return prevState.filter((_, j) => j !== i)
                })
              }}>Supprimer</button>
            </div>
          )
      })}
      <button type="submit">Créer</button>
    </form>
  );
}
