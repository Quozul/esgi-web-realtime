import { useParams } from "react-router-dom";
import { useSocket } from "../hooks/SocketProvider.tsx";
import { useEffect } from "react";

export default function Room() {
  const socket = useSocket();
  const { id } = useParams();

  useEffect(() => {
    socket.emit("joinRoom", { id });

    const listener = (data: object) => {
      console.log(data);
    };

    socket.on("roomInfo", listener);

    return () => {
      socket.emit("leaveRoom", { id });
      socket.off("roomInfo", listener);
    };
  }, [socket, id]);

  return <div>{id}</div>;
}
