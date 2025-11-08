import { useState } from "react";

export default function App() {
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("https://nexavest-backend.vercel.app/ai_recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol, amount: parseFloat(amount) }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      alert("Error connecting to NexaVest API");
    }
    setLoading(false);
  };

  return (
    <div style={{
      fontFamily: "Poppins, sans-serif",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0a, #1c2331)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    }}>
      <h1>💼 NexaVest</h1>
      <p>AI Investment Risk & Return Advisor</p>

      <input placeholder="Stock Symbol (AAPL)" value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        style={{ padding: 10, margin: 10, width: 200 }} />
      <input placeholder="Amount" value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: 10, margin: 10, width: 200 }} />
      <button onClick={analyze} disabled={loading}
        style={{ padding: 10, marginTop: 10, width: 200, background: "#00e6b8", border: "none", borderRadius: 5 }}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div style={{ marginTop: 20, textAlign: "left" }}>
          <p><b>Symbol:</b> {result.symbol}</p>
          <p><b>Volatility:</b> {result.volatility}</p>
          <p><b>Expected Return:</b> {result.expected_return}</p>
          <p><b>Risk:</b> {result.risk_category}</p>
          <p><b>AI Suggestion:</b> {result.ai_recommendation}</p>
        </div>
      )}
    </div>
  );
      }
