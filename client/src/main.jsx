import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

import { ImageProvider } from "./contexts/ImageContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ImageProvider>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: "12px",
            padding: "14px 18px",
          },
        }}
      />
    </ImageProvider>
  </StrictMode>,
);
