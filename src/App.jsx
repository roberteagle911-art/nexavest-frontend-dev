import React, { useState } from "react";

const API_BASE = "https://nexavest-backend-evlu3d27w-roberteagle911-arts-projects.vercel.app";

export default function App() {
  const [page, setPage] = useState("launch");
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!symbol || !amount) {
      setError("Enter stock name & amount first.");
      return;
    }
    setError("");
    setLoading(true); ki
    setResult(null);

    try {
      const response = await fetch(`${API_BASE}/ai_recommend`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    symbol: symbol.toUpperCase(),
    amount: parseFloat(amount),
  }),

      if (!response.ok) throw new Error("API not reachable.");

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Unable to reach NexaVest AI API. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (page === "launch") {
    return (
      <div
        style={{
          background:
            "radial-gradient(circle at 20% 20%, #00111C, #000814 70%)",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#00FFC6",
          textAlign: "center",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>NexaVest</h1>
        <p
          style={{
            color: "#9ae6b4",
            maxWidth: "300px",
            fontSize: "1rem",
            marginBottom: "2rem",
          }}
        >
          AI-powered risk & return analysis for smarter investing.
        </p>
        <button
          onClick={() => setPage("analyze")}
          style={{
            background: "linear-gradient(90deg, #00FFC6, #0077FF)",
            color: "#000",
            fontWeight: "bold",
            border: "none",
            padding: "0.8rem 2rem",
            borderRadius: "12px",
            cursor: "pointer",
            boxShadow: "0 0 15px #00FFC680",
          }}
        >
          Launch App 🚀
        </button>
      </div>
    );
  }

  // Analyze Page
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #000814, #000)",
        color: "#E2E8F0",
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(17,17,17,0.85)",
          padding: "2rem",
          borderRadius: "20px",
          width: "90%",
          maxWidth: "420px",
          textAlign: "center",
          boxShadow: "0 0 40px rgba(0,255,198,0.15)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          style={{
            color: "#00FFC6",
            fontSize: "2rem",
            marginBottom: "1.2rem",
          }}
        >
          NexaVest AI
        </h2>

        <input
          placeholder="Enter Stock Symbol (e.g. RELIANCE.NS)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "12px",
            border: "1px solid #00FFC6",
            background: "#0a0a0a",
            color: "#00FFC6",
            textAlign: "center",
            fontWeight: "bold",
          }}
        />

        <input
          type="number"
          placeholder="Investment Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "12px",
            border: "1px solid #0077FF",
            background: "#0a0a0a",
            color: "#00BFFF",
            textAlign: "center",
            fontWeight: "bold",
          }}
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          style={{
            width: "100%",
            background: "linear-gradient(90deg, #00FFC6, #0077FF)",
            color: "#000",
            fontWeight: "bold",
            padding: "12px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {error && (
          <p style={{ color: "#FF6B6B", marginTop: "15px" }}>{error}</p>
        )}

        {result && (
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "rgba(0,0,0,0.3)",
              padding: "1rem",
              borderRadius: "12px",
              textAlign: "left",
            }}
          >
            <p>
              <strong>Volatility:</strong> {result.volatility}
            </p>
            <p>
              <strong>Expected Return:</strong> {result.expected_return}
            </p>
            <p>
              <strong>Risk Category:</strong> {result.risk_category}
            </p>
            <p style={{ color: "#00FFC6", fontWeight: "600" }}>
              <strong>AI Insight:</strong> {result.ai_recommendation}
            </p>
          </div>
        )}

        <button
          onClick={() => setPage("launch")}
          style={{
            marginTop: "15px",
            background: "none",
            border: "1px solid #00FFC6",
            color: "#00FFC6",
            padding: "8px 16px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          ← Home
        </button>
      </div>

      <p
        style={{
          fontSize: "0.8rem",
          color: "#5EEAD4",
          marginTop: "25px",
          opacity: 0.8,
        }}
      >
        © 2025 NexaVest | Powered by AI Market Intelligence
      </p>
    </div>
  );
            }
