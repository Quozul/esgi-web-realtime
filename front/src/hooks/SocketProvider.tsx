import { io, Socket } from "socket.io-client";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

type Context = {
  socket: Socket | null;
};

const SocketContext = createContext<Context>({ socket: null });

export function SocketProvider({ children }: PropsWithChildren<{}>) {
  const socket = useMemo(() => {
    return io("ws://localhost:3000");
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {socket !== null ? children : "Chargement..."}
    </SocketContext.Provider>
  );
}

export function useSocket(): Socket {
  return useContext(SocketContext).socket!;
}
