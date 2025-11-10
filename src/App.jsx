// src/App.jsx
import React, { useState } from "react";

const BACKEND_URL = "https://nexavest-backend-dev.vercel.app"; 
// <-- REPLACE THIS EXACT LINE if you ever change backend URL

export default function App() {
  const [query, setQuery] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleAnalyze(e) {
    e && e.preventDefault();
    setError(null);
    setResult(null);

    if (!query.trim()) {
      setError("Enter a stock / company / crypto / fund name.");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(`${BACKEND_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), amount: amount ? Number(amount) : null })
      });
      const json = await resp.json();
      if (!resp.ok && json && json.error) {
        setError(json.error || "Backend error");
      } else {
        setResult(json);
      }
    } catch (err) {
      setError("Unable to reach backend. Check backend URL and CORS.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-xl w-full">
        <div className="text-center mb-6">
          <img src="/public/favicon.png.png" alt="logo" className="mx-auto w-24 h-24 rounded-lg shadow-neon"/>
          <h1 className="text-4xl font-bold text-neon my-4">NexaVest AI</h1>
          <p className="text-gray-300">Enter a stock, company, crypto, or fund name — NexaVest will automatically detect and analyze it.</p>
        </div>

        <form onSubmit={handleAnalyze} className="space-y-4">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g. Reliance, AAPL, Bitcoin" className="w-full p-4 rounded-lg bg-slate-800 text-white border border-cyan-500"/>
          <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter investment amount (optional)" className="w-full p-4 rounded-lg bg-slate-800 text-white border border-cyan-500"/>
          <button disabled={loading} type="submit" className="w-full p-4 rounded-lg bg-cyan-400 text-black font-bold">
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </form>

        {error && <div className="mt-4 text-red-400">{error}</div>}

        {result && (
          <div className="mt-6 bg-slate-900 p-6 rounded-xl border border-cyan-600 shadow-neon">
            <h2 className="text-2xl text-cyan-300 mb-4">📊 Analysis Result</h2>
            <div className="space-y-2 text-lg">
              <div><strong>Asset:</strong> {result.asset || result.query || "—"}</div>
              <div><strong>Type:</strong> {result.detected_type || "—"}</div>
              <div><strong>Symbol:</strong> {result.symbol || "—"}</div>
              <div><strong>Market:</strong> {result.market || "—"}</div>
              <div><strong>Currency:</strong> {result.currency || "—"}</div>
              <div><strong>Current Price:</strong> {result.current_price ?? "—"}</div>
              <div><strong>Volatility:</strong> {result.volatility ?? "—"}</div>
              <div><strong>Expected Return:</strong> {result.expected_return ?? "—"}</div>
              <div><strong>Estimated Value:</strong> {result.estimated_value ?? "—"}</div>
              <div><strong>Gain/Loss:</strong> <span className={result.gain_loss > 0 ? "text-green-400" : "text-red-400"}>{result.gain_loss ?? "—"}</span></div>
            </div>

            {result.notes && result.notes.length > 0 && (
              <div className="mt-4 text-sm text-yellow-300">
                <strong>Notes:</strong>
                <ul className="list-disc ml-6">
                  {result.notes.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
        }
