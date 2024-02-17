import { useParams } from "react-router-dom";
import { useSocket } from "../hooks/SocketProvider.tsx";
import {FormEvent, useEffect, useState} from "react";
import {Answer} from "./NewQuiz.tsx";

interface RoomData {
  elapsed: number;
  playerCount: number;
  quiz: {
    question: string;
    answers: Answer[];
  }
}

export default function Room() {
  const socket = useSocket();
  const { id } = useParams();

  const [data, setData] = useState<RoomData>({
    elapsed: 0,
    playerCount: 0,
    quiz: {
      question: "",
      answers: []
    }
  });
  const [checkedAnswers, setCheckedAnswers] = useState<string[]>([]);

  useEffect(() => {
    socket.emit("joinRoom", { id });

    const listener = (data: RoomData) => {
      setData(data);
    };

    socket.on("roomInfo", listener);

    return () => {
      socket.emit("leaveRoom", { id });
      socket.off("roomInfo", listener);
    };
  }, [socket, id]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    socket.emit("submitAnswers", {
      id,
      answers: checkedAnswers
    });

    setCheckedAnswers([]);
  }

  return (
    <div>
      <h1>Room {id}</h1>
      <p>Elapsed: {data.elapsed}</p>
      <p>Players: {data.playerCount}</p>
      <h2>Question : {data.quiz.question}</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {data.quiz.answers.map((answer, i) => {
            return (
              <li key={i}>
                <label>
                  <input type={"checkbox"} checked={checkedAnswers.includes(answer.content)} onChange={(event) => {
                    event.target.checked ? setCheckedAnswers((prevState) => {
                      return [...prevState, answer.content]
                    }) : setCheckedAnswers((prevState) => {
                      return prevState.filter((prevAnswer) => prevAnswer !== answer.content)
                    })
                  }}/>
                  {answer.content}
                </label>
              </li>
            )
          })}
        </ul>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
