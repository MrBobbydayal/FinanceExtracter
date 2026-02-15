import { useState } from "react";
import { uploadFiles } from "../api";

export default function UploadCard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    try {
      setLoading(true);
      setError("");

      const blob = await uploadFiles(files);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "income_statement.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();

    } catch (err) {
      setError("Extraction failed. Please ensure backend is running and API key is active.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg">

      <h1 className="text-2xl font-semibold text-center mb-6">
        Financial Statement Extraction Tool
      </h1>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={(e) => setFiles([...e.target.files])}
          className="block mx-auto"
        />

        <p className="text-sm text-gray-500 mt-2">
          Upload annual report PDFs (Max 5 files)
        </p>
      </div>

      {files.length > 0 && (
        <div className="mb-4 text-sm text-gray-600">
          <p className="font-medium mb-1">Selected files:</p>
          <ul className="list-disc list-inside">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading || files.length === 0}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Extract to Excel"}
      </button>

      {error && (
        <p className="text-red-500 mt-4 text-center text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
