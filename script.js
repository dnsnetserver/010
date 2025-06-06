const allowedSymbols = ['TSLA', 'TQQQ', 'SOXL', 'SPY', 'UVXY', 'QQQ'];
const stockData = {
  TSLA: { iv: 78, price: 6.10, oi: 1200000 },
  TQQQ: { iv: 91, price: 4.25, oi: 1800000 },
  SOXL: { iv: 84, price: 3.40, oi: 900000 },
  SPY: { iv: 42, price: 7.90, oi: 2500000 },
  UVXY: { iv: 110, price: 2.50, oi: 800000 },
  QQQ: { iv: 38, price: 8.00, oi: 2000000 }
};

const shortlist = [];

function addSymbol() {
  const input = document.getElementById('searchInput');
  const symbol = input.value.toUpperCase().trim();

  if (allowedSymbols.includes(symbol) && !shortlist.includes(symbol)) {
    shortlist.push(symbol);
    updateShortlist();
    updateMetrics();
    updateTable();
    updateAI();
  }

  input.value = '';
}

function updateShortlist() {
  const container = document.getElementById('shortlist');
  container.innerHTML = '';
  shortlist.forEach(sym => {
    const item = document.createElement('div');
    item.className = 'shortlist-item';
    item.textContent = sym;
    container.appendChild(item);
  });
}

function updateMetrics() {
  const container = document.getElementById('metrics');
  container.innerHTML = '';
  shortlist.forEach(sym => {
    const data = stockData[sym];
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<strong>${sym}</strong><span>IV: ${data.iv}%</span><span>Price: $${data.price}</span>`;
    container.appendChild(card);
  });
}

function updateTable() {
  const body = document.getElementById('strategy-table-body');
  body.innerHTML = '';
  shortlist.forEach(sym => {
    const data = stockData[sym];
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${sym}</td>
      <td>${data.iv}%</td>
      <td>$${data.price}</td>
      <td>${data.oi.toLocaleString()}</td>
      <td>${suggestStrategy(sym, data)}</td>
    `;
    body.appendChild(row);
  });
}

function suggestStrategy(symbol, data) {
  if (data.iv > 70 && data.price < 5) return '💰 Straddle + Put Hedge';
  if (data.price < 3) return '⚖️ Cash-Secured Put';
  if (data.iv > 90) return '🚀 Long Call Spread';
  return '📊 Covered Call';
}

function toggleAssistant() {
  document.getElementById('assistant').classList.toggle('visible');
}

function updateAI() {
  const aiOutput = document.getElementById('ai-output');
  aiOutput.innerHTML = `
    <p><strong>Analyzed Symbols:</strong> ${shortlist.join(', ')}</p>
    <p><strong>Optimal Weekly Strategy:</strong></p>
    <ul>
      <li>✅ Combine straddles with leveraged ETF spreads</li>
      <li>🔒 Hedge downside with put protection on SOXL or TQQQ</li>
      <li>📆 Target expiry: Friday next week</li>
    </ul>
  `;
}

// Volatility Chart (sample)
new Chart(document.getElementById('volatilityChart'), {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Implied Volatility (%)',
      data: [72, 74, 75, 77, 78],
      borderColor: '#00ff99',
      backgroundColor: 'rgba(0,255,100,0.1)',
      tension: 0.3
    }]
  },
  options: {
    scales: {
      x: { ticks: { color: '#00ff99' }},
      y: { ticks: { color: '#00ff99' }}
    },
    plugins: { legend: { labels: { color: '#00ff99' }}}
  }
});
