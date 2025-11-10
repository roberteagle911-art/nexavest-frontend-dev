import React, { useState } from "react";
import "./index.css";

function App() {
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!symbol || !amount) return alert("Enter both symbol and amount");
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://nexavest-backend-dev.vercel.app/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol, amount }),
      });
      const data = await response.json();
      setResult(data);
    } catch {
      alert("Unable to reach NexaVest API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-black text-white">
      <img src="/favicon.png.png" alt="NexaVest Logo" className="w-20 h-20 mb-4 rounded-xl shadow-cyan-400 shadow-md" />
      <h1 className="text-4xl font-extrabold text-cyan-400 drop-shadow-[0_0_15px_#00ffff] mb-2">
        NexaVest AI
      </h1>
      <p className="text-gray-400 mb-6 max-w-md">
        Enter a <span className="text-cyan-400">stock, company, crypto, or fund name</span> – NexaVest will automatically detect and analyze it.
      </p>

      <div className="flex flex-col w-full max-w-sm gap-3 mb-6">
        <input
          type="text"
          placeholder="e.g. Reliance, AAPL, Bitcoin"
          className="w-full p-3 rounded-lg bg-gray-900 text-center border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Investment Amount"
          className="w-full p-3 rounded-lg bg-gray-900 text-center border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full py-3 bg-cyan-500 text-black font-bold rounded-lg shadow-md hover:shadow-cyan-400 transition-all"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {result && (
        <div className="bg-black/60 border border-cyan-400 rounded-2xl p-6 max-w-md text-left">
          <h2 className="text-2xl font-bold text-cyan-400 mb-3">📊 Analysis Result</h2>
          <p><strong>Asset:</strong> {result.asset}</p>
          <p><strong>Type:</strong> {result.type}</p>
          <p><strong>Symbol:</strong> {result.symbol}</p>
          <p><strong>Market:</strong> {result.market}</p>
          <p><strong>Currency:</strong> {result.currency}</p>
          <p><strong>Current Price:</strong> {result.price}</p>
          <p><strong>Volatility:</strong> {result.volatility}</p>
          <p><strong>Expected Return:</strong> {result.expected_return}</p>
          <p><strong>Risk:</strong> {result.risk}</p>
          <p><strong>Estimated Value:</strong> {result.estimated_value}</p>
          <p className={`${result.gain_loss > 0 ? "text-green-400" : "text-red-400"}`}>
            <strong>Gain/Loss:</strong> {result.gain_loss}
          </p>
        </div>
      )}

      <footer className="mt-8 text-gray-600 text-xs">
        © 2025 NexaVest. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
