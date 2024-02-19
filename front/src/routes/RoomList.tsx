import { useSocket } from "../hooks/SocketProvider.tsx";
import {Suspense, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Puzzle from "../components/Puzzle.tsx";
import {Canvas} from "@react-three/fiber";
import {FaPlus} from "react-icons/fa";

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
    <main>
      <div className="flex justify-between md:py-10 md:flex-row flex-col items-center gap-8">
        <div className="flex flex-col gap-8 max-w-xl">
          <h1 className="text-5xl font-bold text-teal-700">
            Improve your mind
          </h1>
          <p className="bg-teal-700 text-teal-100 p-6 rounded-b-lg rounded-tr-lg shadow">
            Créez une salle ou rejoignez-en une pour jouer avec vos amis. Vous pouvez aussi créer un quiz pour jouer
            avec vos amis.
          </p>
        </div>
        <div style={{height: "300px", width: "auto"}}>
          <Canvas>
            <ambientLight intensity={1}/>
            <directionalLight position={[0, 10, 5]} intensity={1}/>
            <Suspense fallback={null}>
              <Puzzle scale={1}/>
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-teal-700">Salles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.length === 0 ? (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white shadow rounded-lg p-4 text-center">
              <p className="text-teal-700 font-semibold">Aucune salle pour le moment</p>
            </div>
          ) : (
            rooms.map((id) => (
              <div key={id} className="bg-white shadow rounded-lg p-4 hover:bg-custom-tertiary">
                <Link to={`/room/${id}`} className="text-teal-700 hover:text-teal-900">
                  {id}
                </Link>
              </div>
            ))
          )}
        </div>
        <button
          onClick={() => {
            const randomId = crypto.randomUUID();
            navigate(`/room/${randomId}`);
          }}
          className="inline-flex items-center justify-center bg-teal-700 text-teal-100 p-4 rounded-lg shadow hover:bg-teal-800 transition duration-150 ease-in-out"
        >
          <FaPlus className="mr-2"/>
          Créer une salle
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-teal-700">Quizzes</h2>
        <Link to="/create-quiz"
              className="inline-block bg-teal-700 text-teal-100 p-4 rounded-lg shadow hover:bg-teal-800 transition duration-150 ease-in-out mt-4">
          Créer un quiz
        </Link>
      </div>
    </main>
  );
}
