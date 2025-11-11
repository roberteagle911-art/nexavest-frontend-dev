// app.js
(async () => {
  const queryEl = document.getElementById("query");
  const amountEl = document.getElementById("amount");
  const btn = document.getElementById("analyzeBtn");
  const status = document.getElementById("status");
  const resultSec = document.getElementById("result");
  const resultBody = document.getElementById("resultBody");

  function showStatus(msg, isError=false){
    status.innerText = msg;
    status.style.color = isError ? "#ff8a80" : "#9fded6";
  }

  function clearResult(){
    resultBody.innerHTML = "";
    resultSec.classList.add("hidden");
  }

  function renderKeyValue(k,v){
    return `<div class="result-row"><div class="k">${k}</div><div class="v">${v}</div></div>`;
  }

  btn.addEventListener("click", async ()=>{
    clearResult();
    const query = queryEl.value.trim();
    const amount = amountEl.value.trim();
    if(!query){
      showStatus("Please enter an asset name, symbol or forex pair", true);
      return;
    }
    showStatus("Analyzing… please wait");
    btn.disabled = true;

    try {
      const payload = { query: query, amount: amount || 0 };
      const res = await fetch(`${BACKEND_BASE}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if(res.status === 404){
        const err = await res.json().catch(()=>({error:"Asset not found"}));
        showStatus(err.error || "Asset not found", true);
        btn.disabled = false;
        return;
      }
      if(!res.ok){
        const err = await res.json().catch(()=>({error:"Server error"}));
        showStatus(err.error || "Server error", true);
        btn.disabled = false;
        return;
      }
      const data = await res.json();
      // Build UI
      let html = "";
      // Common fields
      if(data.asset) html += renderKeyValue("Asset:", data.asset);
      if(data.type) html += renderKeyValue("Type:", data.type);
      if(data.symbol) html += renderKeyValue("Symbol:", data.symbol);
      if(data.market) html += renderKeyValue("Market:", data.market || "—");
      if(data.currency) html += renderKeyValue("Currency:", data.currency);

      if(data.current_price !== undefined) html += renderKeyValue("Current Price:", (data.currency ? data.currency + " " : "") + (data.current_price));
      if(data.current_rate !== undefined) html += renderKeyValue("Current Rate:", data.current_rate);
      if(data.volatility_annual !== undefined) html += renderKeyValue("Volatility (annual):", data.volatility_annual);
      if(data.expected_return_annual !== undefined) html += renderKeyValue("Expected Return (annual):", data.expected_return_annual);
      if(data.risk) html += renderKeyValue("Risk:", data.risk);
      if(data.holding_period) html += renderKeyValue("Suggested Holding Period:", data.holding_period);
      if(data.est_value !== undefined) html += renderKeyValue("Est. Value:", data.currency ? `${data.currency} ${data.est_value}` : data.est_value);
      if(data.gain_loss !== undefined && data.gain_loss !== null) {
        const gl = data.gain_loss;
        const formatted = (gl >= 0 ? "+" : "") + (data.currency ? `${data.currency} ${gl}` : gl);
        html += renderKeyValue("Gain/Loss:", `<span style="color:${gl>=0? '#4ef58f':'#ff7b7b'};font-weight:800">${formatted}</span>`);
      }

      if(data.explanation) html += `<div style="margin-top:10px;color:#cfe7e5">${data.explanation}</div>`;
      if(data.disclaimer) html += `<div style="margin-top:10px;color:#e8d4d4;font-size:12px">${data.disclaimer}</div>`;

      resultBody.innerHTML = html;
      resultSec.classList.remove("hidden");
      showStatus("Analysis complete");
    } catch (e){
      console.error(e);
      showStatus("Error connecting to backend. Please check backend URL and that the service is up.", true);
    } finally {
      btn.disabled = false;
    }
  });

})();
