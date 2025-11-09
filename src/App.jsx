import React, { useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function App() {
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Dev backend URL
  const BACKEND_URL = "https://nexavest-backend-dev.vercel.app/api/analyze";

  const analyzeStock = async () => {
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symbol, amount }),
    });

    if (!res.ok) {
      throw new Error(`Backend responded with ${res.status}`);
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
        background: "radial-gradient(circle at top, #000814, #001a33)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, sans-serif",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#00e6e6", marginBottom: "20px" }}>NexaVest AI (Dev)</h1>

      <input
        type="text"
        placeholder="Stock Symbol (e.g. RELIANCE.NS)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        style={{
          padding: "10px",
          width: "260px",
          borderRadius: "5px",
          border: "none",
          marginBottom: "10px",
          textAlign: "center",
          backgroundColor: "#1e293b",
          color: "#fff",
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
          backgroundColor: "#1e293b",
          color: "#fff",
        }}
      />

      <button
        onClick={analyzeStock}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#00e6e6",
          color: "#000",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          width: "260px",
          marginBottom: "20px",
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}

      {result && (
        <div
          style={{
            backgroundColor: "#0f172a",
            padding: "20px",
            borderRadius: "10px",
            width: "300px",
            textAlign: "left",
            boxShadow: "0 0 10px rgba(0,230,230,0.2)",
          }}
        >
          <h3 style={{ color: "#00e6e6" }}>📊 Analysis Result</h3>
          <p><strong>Symbol:</strong> {result.symbol}</p>
          <p><strong>Volatility:</strong> {result.volatility}</p>
          <p><strong>Expected Return:</strong> {result.expected_return}</p>
          <p><strong>Risk:</strong> {result.risk_category}</p>
          <p style={{ color: "#38bdf8" }}>{result.ai_recommendation}</p>

          {chartData && (
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ color: "#00e6e6" }}>📈 7-Day Price Chart</h4>
              <Line data={chartData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
