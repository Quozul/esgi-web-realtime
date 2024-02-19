import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { SocketProvider } from "./hooks/SocketProvider.tsx";
import "./style.css";
import {Navbar} from "./components/Navbar.tsx";
import {Footer} from "./components/Footer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto flex-1">
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </div>
      <Footer />
    </div>
  </React.StrictMode>,
);
