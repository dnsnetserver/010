// Toggle assistant panel
function toggleAssistant() {
  const assistant = document.getElementById('assistant');
  assistant.classList.toggle('visible');
}

// Dummy data for table
const stockData = [
  { symbol: 'TSLA', name: 'Tesla Inc.', iv: '78%', price: '$6.00', oi: '1.2M', strategy: 'Bull Put Spread' },
  { symbol: 'TQQQ', name: 'ProShares UltraPro QQQ', iv: '91%', price: '$4.10', oi: '1.8M', strategy: 'Straddle' },
  { symbol: 'SOXL', name: 'Direxion Daily Semi 3x', iv: '84%', price: '$3.20', oi: '900K', strategy: 'Iron Condor' }
];
const tableBody = document.getElementById('stock-table-body');
stockData.forEach(stock => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${stock.symbol}</td>
    <td>${stock.name}</td>
    <td>${stock.iv}</td>
    <td>${stock.price}</td>
    <td>${stock.oi}</td>
    <td>${stock.strategy}</td>
  `;
  tableBody.appendChild(row);
});

// Dummy volatility chart
const ctx = document.getElementById('volatilityChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Implied Volatility (%)',
      data: [68, 72, 70, 75, 78],
      borderColor: '#00e1ff',
      backgroundColor: 'rgba(0, 225, 255, 0.2)',
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: '#fff'
        }
      },
      x: {
        ticks: {
          color: '#fff'
        }
      }
    },
    plugins: {
      legend: {
        labels: { color: '#fff' }
      }
    }
  }
});

// Simulated AI Assistant Output
setTimeout(() => {
  document.getElementById('ai-output').innerHTML = `
    <strong>Strategy Recommendation:</strong><br>
    💡 Sell Weekly $TQQQ ATM Covered Calls<br>
    🔒 Hedge with $SOXL Put Spread<br>
    📈 Expected ROI: 4.2% this week
  `;
}, 2000);
