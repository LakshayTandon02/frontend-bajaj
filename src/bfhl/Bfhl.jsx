import React, { useState } from "react";
import axios from "axios";

const Bfhl = () => {
  const [jsonInput, setJsonInput] = useState('{"data": ["A","B","z"]}');
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState(null);

  const BACKEND_API = "https://backend-bajaj-lovat.vercel.app";

  const handleSubmit = async () => {
    try {
      setError(null);
      const parsedJson = JSON.parse(jsonInput);
      const { data } = await axios.post(`${BACKEND_API}/bfhl`, parsedJson);
      setResponseData(data);
    } catch (err) {
      setError("Invalid JSON or API Error");
    }
  };

  const handleFilterChange = (event) => {
    const options = event.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedFilters(selected);
  };

  const getFilteredData = () => {
    if (!responseData) return {};
    const { numbers, alphabets, highest_alphabet } = responseData;
    const filtered = {};
    if (selectedFilters.includes("Numbers")) filtered.numbers = numbers;
    if (selectedFilters.includes("Alphabets")) filtered.alphabets = alphabets;
    if (selectedFilters.includes("Highest Alphabet"))
      filtered.highest_alphabet = highest_alphabet;
    return filtered;
  };

  return (
    <div className="flex flex-col items-center gap-2 p-6">
      <h1 className="text-lg font-bold">Bajaj Task</h1>
      <div className="w-full max-w-md border p-4 ">
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter JSON input"
          className="w-full border p-1"
        />
        <br />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <br />
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-sm"
        >
          Check
        </button>
      </div>
      {responseData && (
        <>
          <select
            multiple
            onChange={handleFilterChange}
            className="w-full max-w-md border p-2"
          >
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest Alphabet">Highest Alphabet</option>
          </select>
          <div className="w-full max-w-md border p-4 rounded-lg bg-gray-100">
            <pre className="text-sm">
              {JSON.stringify(getFilteredData(), null, 2)}
            </pre>
          </div>
        </>
      )}
    </div>
  );
};

export default Bfhl;
