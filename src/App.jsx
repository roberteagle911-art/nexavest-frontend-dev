import React, { useState } from "react";

function App() {
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeStock = async () => {
    if (!symbol || !amount) {
      setError("⚠️ Please enter both stock symbol and amount.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("https://nexavest-backend-dev.vercel.app/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol, amount }),
      });

      if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("⚠️ Unable to reach NexaVest API. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getGainColor = (gain) => {
    if (gain > 0) return "#00ff88"; // Green
    if (gain < 0) return "#ff4d4d"; // Red
    return "#cccccc"; // Neutral
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b0b0b",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, Arial, sans-serif",
        padding: "20px",
      }}
    >
      <h1
        style={{
          color: "#00e6e6",
          marginBottom: "20px",
          textShadow: "0 0 20px #00e6e6",
          fontWeight: "bold",
        }}
      >
        NexaVest AI (Dev)
      </h1>

      <input
        type="text"
        placeholder="Stock Symbol (e.g. RELIANCE.NS)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        style={{
          padding: "12px",
          width: "280px",
          borderRadius: "6px",
          border: "none",
          marginBottom: "12px",
          textAlign: "center",
          fontSize: "15px",
          outline: "none",
        }}
      />

      <input
        type="number"
        placeholder="Investment Amount ($)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          padding: "12px",
          width: "280px",
          borderRadius: "6px",
          border: "none",
          marginBottom: "15px",
          textAlign: "center",
          fontSize: "15px",
          outline: "none",
        }}
      />

      <button
        onClick={analyzeStock}
        disabled={loading}
        style={{
          padding: "12px 20px",
          backgroundColor: "#00e6e6",
          color: "#000",
          fontWeight: "bold",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          width: "280px",
          fontSize: "16px",
          boxShadow: "0 0 15px #00e6e6",
          transition: "0.3s",
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && (
        <p
          style={{
            color: "red",
            marginTop: "15px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}

      {result && (
        <div
          style={{
            marginTop: "25px",
            backgroundColor: "#141414",
            padding: "18px",
            borderRadius: "12px",
            width: "300px",
            textAlign: "left",
            boxShadow: "0 0 25px #00e6e6",
            animation: "fadeIn 0.5s ease-in-out",
          }}
        >
          <h3 style={{ color: "#00e6e6", marginBottom: "12px" }}>
            📊 Analysis Result
          </h3>
          <p>
            <strong>Symbol:</strong> {result.symbol}
          </p>
          <p>
            <strong>Current Price:</strong> ${result.current_price}
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
            <strong>Est. Value:</strong> ${result.estimated_value}
          </p>
          <p>
            <strong>Gain/Loss:</strong>{" "}
            <span style={{ color: getGainColor(result.gain_or_loss) }}>
              {result.gain_or_loss >= 0
                ? `+$${result.gain_or_loss}`
                : `-$${Math.abs(result.gain_or_loss)}`}
            </span>
          </p>
          <hr
            style={{
              border: "0.5px solid #00e6e6",
              margin: "12px 0",
              opacity: "0.5",
            }}
          />
          <p style={{ color: "#cccccc", fontSize: "14px" }}>
            {result.ai_recommendation}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
