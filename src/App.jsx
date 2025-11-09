import React, { useState } from "react";

function App() {
  const [symbol, setSymbol] = useState("AAPL");
  const [amount, setAmount] = useState(500);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // <-- put your backend dev URL here (you provided earlier)
  const BACKEND_URL = "https://nexavest-backend-dev.vercel.app";

  const analyzeStock = async () => {
    if (!symbol || !amount) {
      setError("Please enter both stock symbol and amount.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${BACKEND_URL}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: symbol.trim(), amount: Number(amount) })
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Backend error ${res.status}: ${txt}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Unable to reach NexaVest API. Please check backend status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0b0b0b",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      fontFamily: "Arial, sans-serif",
      padding: "24px"
    }}>
      <h1 style={{ color: "#00e6e6", textShadow: "0 0 20px #00e6e6" }}>NexaVest AI (Dev)</h1>

      <input
        type="text"
        placeholder="Stock symbol (e.g. AAPL or RELIANCE.NS)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        style={{
          padding: "14px",
          width: "320px",
          borderRadius: "8px",
          border: "none",
          marginBottom: "12px",
          textAlign: "center"
        }}
      />

      <input
        type="number"
        placeholder="Investment Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          padding: "14px",
          width: "320px",
          borderRadius: "8px",
          border: "none",
          marginBottom: "18px",
          textAlign: "center"
        }}
      />

      <button
        onClick={analyzeStock}
        disabled={loading}
        style={{
          padding: "12px 20px",
          backgroundColor: "#00e6e6",
          color: "#000",
          border: "none",
          borderRadius: "10px",
          cursor: loading ? "default" : "pointer",
          width: "320px",
          fontWeight: "700",
          marginBottom: "20px"
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && (
        <div style={{ color: "#ff6b6b", marginBottom: "18px", fontWeight: "700" }}>
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div style={{
          width: "340px",
          background: "#111213",
          borderRadius: "14px",
          padding: "18px",
          boxShadow: "0 0 30px rgba(0,230,230,0.14)",
          color: "#ddd"
        }}>
          <h3 style={{ color: "#00e6e6" }}>📊 Analysis Result</h3>
          <p><strong>Symbol:</strong> {result.symbol}</p>

          {result.current_price !== undefined && (
            <p><strong>Current Price:</strong> ${result.current_price}</p>
          )}

          <p><strong>Volatility:</strong> {result.volatility}</p>
          <p><strong>Expected Return:</strong> {result.expected_return}</p>
          <p><strong>Risk:</strong> {result.risk_category}</p>
          <p><strong>Est. Value:</strong> ${result.estimated_value}</p>
          <p style={{ color: Number(result.gain_loss) < 0 ? "#ff4d4f" : "#28a745" }}>
            <strong>Gain/Loss:</strong> {Number(result.gain_loss) < 0 ? "-" : ""}${Math.abs(Number(result.gain_loss))}
          </p>

          <hr style={{ borderColor: "#1f6f6f", margin: "12px 0" }} />

          <p style={{ color: "#cfcfcf" }}>{result.ai_recommendation}</p>
        </div>
      )}

      <footer style={{ marginTop: "32px", color: "#3fbfbf" }}>
        © {new Date().getFullYear()} NexaVest | Dev
      </footer>
    </div>
  );
}

export default App;
