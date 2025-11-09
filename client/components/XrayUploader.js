import React, { useState } from "react";
import axios from "axios";

function XrayUploader() {
  const [image, setImage] = useState(null);
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setReport("");
    setError("");
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please upload a chest X-ray image first!");
      return;
    }

    setLoading(true);
    setReport("");
    setError("");

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generate_report/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setReport(response.data.generated_report);
    } catch (err) {
      setError("Something went wrong while generating the report.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-[400px] text-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full mb-4 border p-2 rounded-md"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Report"}
      </button>

      {report && (
        <div className="mt-6 text-left bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-600 mb-2">Generated Report:</h3>
          <p className="text-gray-800 whitespace-pre-wrap">{report}</p>
        </div>
      )}

      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
    </div>
  );
}

export default XrayUploader;
