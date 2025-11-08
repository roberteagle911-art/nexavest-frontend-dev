import { useState } from "react";

export default function App() {
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeInvestment = async () => {
    if (!symbol || !amount) {
      alert("Please enter both fields");
      return;
    }
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
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #0a0a0f, #000308 70%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "600",
          marginBottom: "1rem",
          letterSpacing: "1px",
        }}
      >
        💼 NexaVest
      </h1>
      <p
        style={{
          opacity: 0.7,
          marginBottom: "2rem",
          textAlign: "center",
          maxWidth: "350px",
          fontSize: "0.95rem",
        }}
      >
        AI-Powered Investment Risk & Return Advisor
      </p>

      <div
        style={{
          background: "rgba(255,255,255,0.06)",
          borderRadius: "20px",
          padding: "2rem",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 0 40px rgba(0,255,180,0.08)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.08)",
          textAlign: "center",
        }}
      >
        <input
          type="text"
          placeholder="Enter Stock Symbol (e.g. RELIANCE.NS)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            marginBottom: "1rem",
            textAlign: "center",
            fontSize: "1rem",
            outline: "none",
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
          }}
        />

        <input
          type="number"
          placeholder="Enter Investment Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            marginBottom: "1.5rem",
            textAlign: "center",
            fontSize: "1rem",
            outline: "none",
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
          }}
        />

        <button
          onClick={analyzeInvestment}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            background:
              loading
                ? "linear-gradient(90deg, #666, #333)"
                : "linear-gradient(90deg, #00ffcc, #007bff)",
            color: "#fff",
            fontWeight: "600",
            fontSize: "1rem",
            letterSpacing: "0.5px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(0,255,200,0.3)",
            transition: "0.3s ease",
          }}
        >
          {loading ? "Analyzing..." : "Analyze Investment"}
        </button>

        {result && (
          <div
            style={{
              marginTop: "1.8rem",
              textAlign: "left",
              fontSize: "0.95rem",
              background: "rgba(255,255,255,0.05)",
              padding: "1rem",
              borderRadius: "12px",
            }}
          >
            <p><b>Symbol:</b> {result.symbol}</p>
            <p><b>Volatility:</b> {result.volatility}</p>
            <p><b>Expected Return:</b> {result.expected_return}</p>
            <p><b>Risk Category:</b> {result.risk_category}</p>
            <p><b>AI Recommendation:</b> {result.ai_recommendation}</p>
          </div>
        )}
      </div>

      <p
        style={{
          opacity: 0.4,
          fontSize: "0.8rem",
          marginTop: "2rem",
        }}
      >
        © 2025 NexaVest • Powered by AI
      </p>
    </div>
  );
    }
