async function analyzeAsset() {
  const asset = document.getElementById("asset").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const resultDiv = document.getElementById("result");

  // Clear and show loading state
  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = `
    <div class="text-center text-gray-300">
      <p class="animate-pulse">🔍 Analyzing <span class="text-cyan-400 font-semibold">${asset}</span>...</p>
    </div>
  `;

  // Validation
  if (!asset || isNaN(amount) || amount <= 0) {
    resultDiv.innerHTML = `
      <p class="text-red-400 text-center font-medium">⚠️ Please enter a valid asset and investment amount.</p>
    `;
    return;
  }

  try {
    // API call to backend
    const response = await fetch("https://nexavest-backend-dev.vercel.app/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ asset, amount }),
    });

    // Handle non-OK responses
    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const data = await response.json();

    // Display results in styled format
    resultDiv.innerHTML = `
      <h2 class="text-xl font-bold mb-4 glow">📊 Analysis Result</h2>
      <div class="space-y-2 text-sm md:text-base text-gray-200">
        <p><strong>Asset:</strong> ${data.asset || asset}</p>
        <p><strong>Type:</strong> ${data.type || "N/A"}</p>
        <p><strong>Market:</strong> ${data.market || "N/A"}</p>
        <p><strong>Currency:</strong> ${data.currency || "N/A"}</p>
        <p><strong>Current Price:</strong> ${data.current_price ? formatValue(data.current_price, data.currency) : "N/A"}</p>
        <p><strong>Volatility:</strong> ${data.volatility || "N/A"}</p>
        <p><strong>Expected Return:</strong> ${data.expected_return || "N/A"}</p>
        <p><strong>Risk Level:</strong> <span class="${riskColor(data.risk)} font-semibold">${data.risk || "N/A"}</span></p>
        <p><strong>Suggested Holding Period:</strong> ${data.holding_period || "N/A"}</p>
        <p><strong>Estimated Value:</strong> ${data.estimated_value ? formatValue(data.estimated_value, data.currency) : "N/A"}</p>
        <hr class="border-gray-700 my-3" />
        <p class="text-cyan-400">${data.summary || "No detailed summary available."}</p>
      </div>
    `;
  } catch (error) {
    console.error("Error:", error);
    resultDiv.innerHTML = `
      <p class="text-red-400 text-center font-medium">
        ❌ Unable to reach NexaVest servers. Please check your connection or try again later.
      </p>
    `;
  }
}

// Helper: Format currency
function formatValue(value, currency) {
  if (!value) return "N/A";
  const symbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : "";
  return `${symbol}${parseFloat(value).toLocaleString()} ${currency}`;
}

// Helper: Risk color
function riskColor(risk) {
  if (!risk) return "text-gray-300";
  const r = risk.toLowerCase();
  if (r.includes("high")) return "text-red-400";
  if (r.includes("medium")) return "text-yellow-400";
  if (r.includes("low")) return "text-green-400";
  return "text-gray-300";
                                        }
