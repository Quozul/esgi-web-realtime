import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { SocketProvider } from "./hooks/SocketProvider.tsx";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto flex-1">
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </div>
    </div>
  </React.StrictMode>,
);
