import { io } from "socket.io-client";
import { useMemo } from "react";

export default function useSocket() {
  return useMemo(() => {
    return io("ws://localhost:3000");
  }, []);
}
