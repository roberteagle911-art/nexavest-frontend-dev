import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "https://nexavest-backend-dev.vercel.app/analyze";

  const handleAnalyze = async () => {
    if (!query.trim()) {
      setError("Please enter a stock, company, crypto, or fund name.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query.trim(),
          amount: parseFloat(amount) || 0,
        }),
      });

      if (!res.ok) {
        const msg = await res.json();
        throw new Error(msg.detail || "Failed to analyze asset.");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Unable to reach NexaVest API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-4 font-mono">
      {/* LOGO */}
      <div className="mt-6 mb-3">
        <img
          src="/favicon.png.png"
          alt="NexaVest Logo"
          className="w-20 h-20 rounded-2xl shadow-[0_0_30px_#00FFFF]"
        />
      </div>

      {/* TITLE */}
      <h1 className="text-4xl font-extrabold text-cyan-400 text-center mb-2 drop-shadow-[0_0_8px_#00FFFF]">
        NexaVest AI
      </h1>
      <p className="text-gray-400 text-center mb-6 text-sm max-w-md">
        Enter a stock, company, crypto, or fund name — NexaVest will automatically detect and analyze it.
      </p>

      {/* INPUTS */}
      <div className="w-full max-w-sm space-y-3">
        <input
          type="text"
          placeholder="e.g. Reliance, AAPL, Bitcoin"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-200 text-black font-bold text-center focus:outline-none"
        />
        <input
          type="number"
          placeholder="Enter Investment Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-200 text-black font-bold text-center focus:outline-none"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full py-3 bg-cyan-400 text-black font-extrabold text-lg rounded-md hover:bg-cyan-300 transition-all shadow-[0_0_20px_#00FFFF]"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/20 border border-red-400 text-red-400 px-4 py-2 rounded-md mt-5 max-w-sm text-center">
          {error}
        </div>
      )}

      {/* RESULT */}
      {result && (
        <div className="mt-8 bg-black/60 border border-cyan-400 p-6 rounded-2xl shadow-[0_0_40px_#00FFFF] max-w-md w-full">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center">
            📊 Analysis Result
          </h2>

          <p>
            <strong>Asset:</strong> {result.asset || "N/A"}
          </p>
          <p>
            <strong>Type:</strong> {result.type || "N/A"}
          </p>
          <p>
            <strong>Symbol:</strong> {result.symbol || "N/A"}
          </p>
          <p>
            <strong>Market:</strong> {result.market || "N/A"}
          </p>
          <p>
            <strong>Currency:</strong> {result.currency || "N/A"}
          </p>
          <p>
            <strong>Current Price:</strong>{" "}
            {result.currency === "INR"
              ? `₹${result.current_price}`
              : `$${result.current_price}`}
          </p>
          <p>
            <strong>Volatility:</strong> {result.volatility}
          </p>
          <p>
            <strong>Expected Return:</strong> {result.expected_return}
          </p>
          <p>
            <strong>Risk:</strong> {result.risk_category}
          </p>
          <p>
            <strong>Holding Period:</strong> {result.holding_period}
          </p>

          {result.est_value && (
            <p>
              <strong>Est. Value:</strong>{" "}
              {result.currency === "INR"
                ? `₹${result.est_value}`
                : `$${result.est_value}`}
            </p>
          )}

          {result.gain_loss !== null && (
            <p>
              <strong>Gain/Loss:</strong>{" "}
              <span
                className={`font-bold ${
                  result.gain_loss >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {result.currency === "INR"
                  ? `${result.gain_loss >= 0 ? "+" : ""}₹${result.gain_loss}`
                  : `${result.gain_loss >= 0 ? "+" : ""}$${result.gain_loss}`}
              </span>
            </p>
          )}

          <hr className="border-cyan-400 my-4" />

          <p className="text-gray-300 leading-relaxed text-sm">
            {result.ai_recommendation || ""}
          </p>
        </div>
      )}

      {/* FOOTER */}
      <footer className="text-gray-500 text-xs mt-10 mb-4 text-center">
        © {new Date().getFullYear()} NexaVest. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
