import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://nexavest-backend-dev.onrender.com/analyze";

function App() {
  const [asset, setAsset] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!asset || !amount) {
      setError("Please enter both asset and amount.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(API_URL, {
        asset,
        amount: parseFloat(amount),
        amount_currency: currency
      });
      setResult(response.data);
    } catch (err) {
      setError("Unable to fetch data. Check asset name or server status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-black via-gray-900 to-black">
      {/* LOGO */}
      <div className="flex flex-col items-center mb-6">
        <img src="/favicon.png.png" alt="NexaVest logo" className="w-16 h-16 mb-2" />
        <h1 className="text-4xl font-extrabold text-brand drop-shadow-md">
          NexaVest AI
        </h1>
        <p className="text-gray-300 mt-2 text-center max-w-md">
          Enter a stock, crypto, or forex name — NexaVest auto-detects, analyzes, and guides retail investors.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <input
          type="text"
          value={asset}
          onChange={(e) => setAsset(e.target.value)}
          placeholder="Enter company, stock, or crypto (e.g., Reliance, BTC, AAPL)"
          className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-700"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Investment amount"
          className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-700"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full bg-brand text-black font-bold py-3 rounded-md hover:bg-cyan-300 transition"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      </div>

      {/* Result Section */}
      {result && (
        <div className="bg-gray-900 mt-6 p-6 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
          <h2 className="text-xl font-bold text-brand mb-3">Analysis Result</h2>
          <p><strong>Asset:</strong> {result.asset}</p>
          <p><strong>Symbol:</strong> {result.symbol}</p>
          <p><strong>Price:</strong> {result.current_price} {result.currency}</p>
          <p><strong>Risk:</strong> {result.risk}</p>
          <p><strong>Expected Return:</strong> {result.expected_return}</p>
          <p><strong>Holding Period:</strong> {result.holding_period}</p>
          <p><strong>Suggestion:</strong> {result.suggestion}</p>
          <p className="text-xs text-gray-400 mt-4">{result.disclaimer}</p>
        </div>
      )}

      {/* Footer */}
      <footer className="text-gray-500 text-sm mt-8 mb-4">
        © 2025 <span className="text-brand font-semibold">NexaVest</span>. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
