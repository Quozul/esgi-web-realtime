import { useSocket } from "../hooks/SocketProvider.tsx";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RoomList() {
  const socket = useSocket();
  const [rooms, setRooms] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const listener = (data: string[]) => {
      setRooms(data);
      console.log(data);
    };

    socket.on("roomList", listener);

    return () => {
      socket.off("roomList", listener);
    };
  }, [socket]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {rooms.map((id) => {
        return (
          <Link to={`/room/${id}`} key={id}>
            {id}
          </Link>
        );
      })}

      <button
        onClick={() => {
          const randomId = crypto.randomUUID();
          navigate(`/room/${randomId}`);
        }}
      >
        Créer une salle
      </button>

      <Link to="/create-quiz">Créer un quiz</Link>
    </div>
  );
}
