import React, { useState } from "react";

function App() {
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = "https://nexavest-backend-dev.vercel.app";

  const analyzeStock = async () => {
    if (!symbol || !amount) {
      setError("Please enter both stock symbol and amount.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symbol, amount: parseFloat(amount) }),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("⚠️ Unable to reach NexaVest API. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #00151a 0%, #000 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, sans-serif",
        padding: "20px",
      }}
    >
      {/* Logo */}
      <img
        src="/favicon.png.png"
        alt="NexaVest Logo"
        onError={(e) => (e.target.style.display = "none")}
        style={{
          width: "80px",
          marginBottom: "20px",
          borderRadius: "12px",
          boxShadow: "0 0 20px #00e6e6",
        }}
      />

      <h1
        style={{
          color: "#00e6e6",
          marginBottom: "25px",
          textShadow: "0 0 25px #00e6e6",
          fontWeight: "900",
          letterSpacing: "1px",
          textAlign: "center",
        }}
      >
        NexaVest AI (Dev)
      </h1>

      <input
        type="text"
        placeholder="Stock Symbol (e.g. AAPL, RELIANCE.NS)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        style={{
          padding: "10px",
          width: "260px",
          borderRadius: "5px",
          border: "none",
          marginBottom: "10px",
          textAlign: "center",
          backgroundColor: "#e0e0e0",
          fontWeight: "600",
        }}
      />

      <input
        type="number"
        placeholder="Investment Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          padding: "10px",
          width: "260px",
          borderRadius: "5px",
          border: "none",
          marginBottom: "15px",
          textAlign: "center",
          backgroundColor: "#e0e0e0",
          fontWeight: "600",
        }}
      />

      <button
        onClick={analyzeStock}
        disabled={loading}
        style={{
          padding: "12px 25px",
          backgroundColor: "#00e6e6",
          color: "#000",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          width: "260px",
          boxShadow: "0 0 25px #00e6e6",
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && (
        <p
          style={{
            color: "#ff4d4d",
            marginTop: "15px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}

      {result && (
        <div
          style={{
            marginTop: "30px",
            backgroundColor: "#0a0a0a",
            padding: "20px",
            borderRadius: "12px",
            width: "300px",
            boxShadow: "0 0 25px #00e6e6",
            textAlign: "left",
            lineHeight: "1.6",
          }}
        >
          <h3
            style={{
              color: "#00e6e6",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
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
            <span style={{ color: result.gain_loss < 0 ? "#ff4d4d" : "#00ff7f" }}>
              ${result.gain_loss}
            </span>
          </p>
          <hr
            style={{
              margin: "15px 0",
              border: "1px solid #00e6e6",
              opacity: 0.3,
            }}
          />
          <p style={{ color: "#ccc" }}>{result.ai_recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default App;
