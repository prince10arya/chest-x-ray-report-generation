import React from "react";
import XrayUploader from "./components/XrayUploader";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-gray-200 text-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">
        🩻 Chest X-ray Report Generator
      </h1>
      <XrayUploader />
      <footer className="mt-12 text-sm text-gray-600">
        Built with ❤️ using React + FastAPI + Transformers
      </footer>
    </div>
  );
}

export default App;
