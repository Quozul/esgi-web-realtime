import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { SocketProvider } from "./hooks/SocketProvider.tsx";
import "./style.css";
import {Navbar} from "./components/Navbar.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="h-screen container mx-auto">
      <Navbar />
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </div>
  </React.StrictMode>,
);
