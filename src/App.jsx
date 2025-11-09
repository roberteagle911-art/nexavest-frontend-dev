import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = "https://nexavest-backend-dev.vercel.app";

  const analyze = async () => {
    if (!query || !amount) {
      setError("Please enter both a company/crypto name and amount.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, amount: parseFloat(amount) }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server error: ${res.status} ${errText}`);
      }

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
        background: "radial-gradient(circle at top, #00181f 0%, #000 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, sans-serif",
        padding: "20px",
      }}
    >
      <img
        src="/favicon.png.png"
        alt="NexaVest Logo"
        onError={(e) => (e.target.style.display = "none")}
        style={{
          width: "70px",
          marginBottom: "20px",
          borderRadius: "12px",
          boxShadow: "0 0 15px #00e6e6",
        }}
      />

      <h1
        style={{
          color: "#00e6e6",
          textShadow: "0 0 25px #00e6e6",
          marginBottom: "10px",
          fontWeight: "900",
        }}
      >
        NexaVest AI
      </h1>
      <p style={{ color: "#aaa", marginBottom: "25px", fontSize: "14px" }}>
        Enter a stock, company, crypto, or fund — NexaVest will detect and analyze it.
      </p>

      <input
        type="text"
        placeholder="e.g. Tata Motors / Bitcoin / Apple"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "12px",
          width: "280px",
          borderRadius: "8px",
          border: "none",
          marginBottom: "10px",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          color: "#000",
          fontWeight: "600",
        }}
      />

      <input
        type="number"
        placeholder="Investment Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          padding: "12px",
          width: "280px",
          borderRadius: "8px",
          border: "none",
          marginBottom: "15px",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          color: "#000",
          fontWeight: "600",
        }}
      />

      <button
        onClick={analyze}
        disabled={loading}
        style={{
          padding: "12px 25px",
          backgroundColor: "#00e6e6",
          color: "#000",
          border: "none",
          borderRadius: "10px",
          cursor: loading ? "not-allowed" : "pointer",
          width: "280px",
          fontWeight: "bold",
          boxShadow: "0 0 25px #00e6e6",
          transition: "all 0.2s ease",
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
            maxWidth: "300px",
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
            width: "320px",
            boxShadow: "0 0 25px #00e6e6",
            textAlign: "left",
            lineHeight: "1.6",
          }}
        >
          <h3 style={{ color: "#00e6e6", marginBottom: "10px" }}>📊 Analysis Result</h3>

          <p>
            <strong>Asset:</strong> {result.name || result.symbol}
          </p>
          <p>
            <strong>Type:</strong> {result.asset_type || "Unknown"}
          </p>
          <p>
            <strong>Symbol:</strong> {result.symbol}
          </p>
          <p>
            <strong>Market:</strong> {result.market || "N/A"}
          </p>
          <p>
            <strong>Currency:</strong> {result.currency}
          </p>

          {result.current_price && (
            <p>
              <strong>Current Price:</strong> {result.currency} {result.current_price}
            </p>
          )}

          {result.current_price_usd && (
            <p>
              <strong>USD Price:</strong> ${result.current_price_usd}
            </p>
          )}
          {result.current_price_inr && (
            <p>
              <strong>INR Price:</strong> ₹{result.current_price_inr}
            </p>
          )}

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

          {result.estimated_value && (
            <p>
              <strong>Est. Value:</strong> {result.currency} {result.estimated_value}
            </p>
          )}

          {result.gain_loss !== null && (
            <p
              style={{
                color:
                  Number(result.gain_loss) > 0
                    ? "#00ff7f"
                    : Number(result.gain_loss) < 0
                    ? "#ff4d4d"
                    : "#ccc",
              }}
            >
              <strong>Gain/Loss:</strong>{" "}
              {result.gain_loss > 0 ? "+" : ""}
              {result.currency} {result.gain_loss}
            </p>
          )}

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

      <footer style={{ marginTop: "40px", color: "#007a7a", fontSize: "13px" }}>
        © {new Date().getFullYear()} NexaVest | Retail AI Investing
      </footer>
    </div>
  );
}

export default App;
