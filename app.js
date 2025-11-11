// app.js
const BACKEND_BASE = "https://nexavest-backend-dev.onrender.com"; // ✅ your backend link

const assetEl = document.getElementById("asset");
const amountEl = document.getElementById("amount");
const currencyEl = document.getElementById("amountCurrency");
const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");

function setStatus(msg, error = false) {
  statusEl.innerText = msg;
  statusEl.style.color = error ? "#ff8a80" : "#9fded6";
}

function renderResult(data) {
  resultEl.classList.remove("hidden");
  resultEl.innerHTML = `
    <h2 class="text-xl font-bold text-cyan-300 mb-3">📊 Analysis Result</h2>
    <div class="grid gap-2 text-gray-200 text-sm">
      <div><b>Asset:</b> ${data.asset || "N/A"} ${data.symbol ? `(${data.symbol})` : ""}</div>
      <div><b>Type:</b> ${data.type || "N/A"}</div>
      <div><b>Current Price:</b> ${data.current_price ?? "N/A"} ${data.currency ?? ""}</div>
      <div><b>Risk Level:</b> ${data.risk || "N/A"}</div>
      <div><b>Expected Return:</b> ${data.expected_return || "N/A"}</div>
      <div><b>Holding Period:</b> ${data.holding_period || "N/A"}</div>
      <div><b>Estimated Value:</b> ${data.estimated_value ?? ""} ${data.currency ?? ""}</div>
      <div class="mt-2 text-gray-400">${data.summary || ""}</div>
      <div class="mt-2 text-xs text-gray-500">${data.disclaimer || ""}</div>
    </div>
  `;
}

analyzeBtn.addEventListener("click", async () => {
  const asset = assetEl.value.trim();
  const amount = parseFloat(amountEl.value);
  const amount_currency = currencyEl.value || undefined;

  if (!asset || !amount || amount <= 0) {
    setStatus("⚠️ Please enter valid asset and positive amount", true);
    return;
  }

  setStatus("Analyzing... please wait ⏳");
  analyzeBtn.disabled = true;

  try {
    const res = await fetch(`${BACKEND_BASE}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ asset, amount, amount_currency }),
    });

    console.log("Response status:", res.status);
    const data = await res.json();
    console.log("Response data:", data);

    if (!res.ok) {
      setStatus(data.detail || data.error || "Analysis failed ❌", true);
      return;
    }

    renderResult(data);
    setStatus("✅ Analysis complete");
  } catch (e) {
    console.error("Error:", e);
    setStatus("❌ Unable to reach NexaVest backend", true);
  } finally {
    analyzeBtn.disabled = false;
  }
});

clearBtn.addEventListener("click", () => {
  assetEl.value = "";
  amountEl.value = "";
  currencyEl.value = "";
  resultEl.classList.add("hidden");
  setStatus("");
});
