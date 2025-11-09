const http = require('http');

let dashboardData = {
  metrics: {
    total_contacts: 1247,
    recovered_terminals: 847,
    recovery_rate: '68%',
    active_campaigns: 5,
    pending_returns: 400
  },
  recent_activity: [
    { action: 'CSV Upload', details: '500 contacts imported', time: '2 hours ago' },
    { action: 'Campaign Sent', details: 'WhatsApp to Lagos segment', time: '5 hours ago' },
    { action: 'Terminal Returned', details: 'POS001 verified', time: '1 day ago' }
  ]
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
 
  if (req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(dashboardData));
  }
 
  if (req.method === 'POST') {
    dashboardData.metrics.active_campaigns += 1;
    dashboardData.recent_activity.unshift({
      action: 'New Campaign',
      details: 'Campaign created via dashboard',
      time: 'Just now'
    });
   
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      success: true,
      message: 'New campaign created successfully!'
    }));
  }
});

server.listen(3000, () => {
  console.log('Dashboard Server: http://localhost:3000');
}); 