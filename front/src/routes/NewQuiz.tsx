import { FormEvent, useState } from "react";
import useSocket from "../hooks/useSocket.ts";

export default function NewQuiz() {
  const socket = useSocket();
  const [question, setQuestion] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    socket.emit("createForm", {
      question,
    });

    setQuestion("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={question}
        onChange={({ currentTarget }) => {
          setQuestion(currentTarget.value);
        }}
        placeholder="Question"
      />
    </form>
  );
}
