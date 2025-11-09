import React from "react";

export default function Landing() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #001220, #012F47, #0B5C5E)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#00e6e6" }}>NexaVest</h1>
      <p
        style={{
          fontSize: "1.2rem",
          maxWidth: "400px",
          marginTop: "10px",
          lineHeight: "1.6",
          opacity: 0.9,
        }}
      >
        AI-Powered Market Intelligence for Smarter Investing.
        <br />
        Analyze risk, return, and holding period — instantly.
      </p>

      <button
        onClick={() => (window.location.href = "/analyzer")}
        style={{
          marginTop: "30px",
          background: "#00e6e6",
          border: "none",
          color: "#001220",
          fontSize: "1.1rem",
          padding: "12px 28px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "0.3s",
        }}
      >
        Analyze Stocks 🚀
      </button>

      <footer style={{ marginTop: "60px", opacity: 0.6 }}>
        © 2025 NexaVest | AI for Investors
      </footer>
    </div>
  );
}
