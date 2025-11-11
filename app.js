async function analyzeAsset() {
  const asset = document.getElementById('asset').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const resultDiv = document.getElementById('result');
  
  if (!asset || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid asset and amount.");
    return;
  }

  resultDiv.classList.remove('hidden');
  resultDiv.innerHTML = `<p class="text-gray-400 text-center">Analyzing <span class="text-cyan-400">${asset}</span>...</p>`;

  try {
    const response = await fetch('https://nexavest-backend-dev.vercel.app/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ asset, amount })
    });

    if (!response.ok) {
      throw new Error('Backend not reachable');
    }

    const data = await response.json();
    resultDiv.innerHTML = `
      <h2 class="text-xl font-bold mb-4 glow">📊 Analysis Result</h2>
      <p><strong>Asset:</strong> ${data.asset || asset}</p>
      <p><strong>Type:</strong> ${data.type || 'N/A'}</p>
      <p><strong>Market:</strong> ${data.market || 'N/A'}</p>
      <p><strong>Currency:</strong> ${data.currency || 'N/A'}</p>
      <p><strong>Current Price:</strong> ${data.current_price || 'N/A'}</p>
      <p><strong>Expected Return:</strong> ${data.expected_return || 'N/A'}</p>
      <p><strong>Risk Level:</strong> ${data.risk || 'N/A'}</p>
      <p><strong>Suggested Holding Period:</strong> ${data.holding_period || 'N/A'}</p>
      <p class="mt-4 text-cyan-400">${data.summary || ''}</p>
    `;
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = `<p class="text-red-400">Error: Unable to fetch data. Please try again later.</p>`;
  }
}
