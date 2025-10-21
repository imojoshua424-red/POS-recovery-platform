const http = require('http');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('terminals.db', (err) => {
  if (err) console.error('Database error:', err);
});

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS terminals (id INTEGER PRIMARY KEY, terminal_id TEXT, customer_name TEXT, phone TEXT, status TEXT, notes TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS campaigns (id TEXT PRIMARY KEY, name TEXT, message TEXT, status TEXT, created_at DATETIME)");
});

function handleUpload(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk.toString(); });
 
  req.on('end', () => {
    try {
      const results = [];
      const lines = body.split('\n');
     
      lines.forEach((line, i) => {
        if (line.trim() && i > 0) {
          const columns = line.split(',');
          if (columns.length >= 3) {
            results.push({
              terminal_id: columns[0]?.trim() || 'Unknown',
              customer_name: columns[1]?.trim() || 'Unknown',
              phone: columns[2]?.trim() || '+234000000000',
              status: 'inactive',
              notes: columns[4]?.trim() || 'No notes'
            });
          }
        }
      });
     
      const stmt = db.prepare("INSERT INTO terminals (terminal_id, customer_name, phone, status, notes) VALUES (?, ?, ?, ?, ?)");
      results.forEach(terminal => {
        stmt.run(terminal.terminal_id, terminal.customer_name, terminal.phone, terminal.status, terminal.notes);
      });
      stmt.finalize();
     
      console.log(`Uploaded ${results.length} terminals`);
      res.end(JSON.stringify({ message: 'CSV processed successfully', records: results.length }));
    } catch (error) {
      console.error('Upload error:', error);
      res.end(JSON.stringify({ error: 'CSV processing failed' }));
    }
  });
}

function handleCreateCampaign(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk.toString(); });
 
  req.on('end', () => {
    try {
      const { name, message } = JSON.parse(body);
      const campaignId = Date.now().toString();
     
      db.run("INSERT INTO campaigns (id, name, message, status, created_at) VALUES (?, ?, ?, 'draft', datetime('now'))",
        [campaignId, name, message],
        function(err) {
          if (err) {
            console.error('Campaign error:', err);
            res.end(JSON.stringify({ error: 'Failed to create campaign' }));
            return;
          }
         
          console.log(`Created campaign: ${name}`);
          res.end(JSON.stringify({
            message: 'Campaign created successfully',
            campaignId: campaignId
          }));
        }
      );
    } catch (error) {
      console.error('Campaign error:', error);
      res.end(JSON.stringify({ error: 'Invalid campaign data' }));
    }
  });
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
 
  console.log(`${req.method} ${req.url}`);
 
  if (req.method === 'GET' && req.url === '/') {
    res.end(JSON.stringify({ message: 'API Working' }));
    return;
  }
 
  if (req.method === 'POST' && req.url === '/upload') {
    handleUpload(req, res);
    return;
  }
 
  if (req.method === 'GET' && req.url === '/terminals') {
    db.all("SELECT * FROM terminals", (err, rows) => {
      if (err) console.error('Terminals error:', err);
      res.end(JSON.stringify(rows || []));
    });
    return;
  }
 
  if (req.method === 'POST' && req.url === '/create-campaign') {
    handleCreateCampaign(req, res);
    return;
  }

  if (req.method === 'POST' && req.url === '/create-campaign') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        try {
            const { name, segment_id, retry_policy, schedule } = JSON.parse(body);
           
            if (!name || !segment_id) {
                res.writeHead(400);
                return res.end(JSON.stringify({ error: 'Name and segment ID are required' }));
            }

            const newCampaign = {
                id: Date.now().toString(),
                name,
                segment_id,
                retry_policy,
                schedule,
                status: 'draft',
                created_at: new Date().toISOString()
            };

            res.writeHead(201);
            res.end(JSON.stringify(newCampaign));
           
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: error.message }));
        }
    });
    return;
} 
 
  res.end(JSON.stringify({ error: 'Route not found' }));
});

server.listen(3000, () => {
  console.log('Server: http://localhost:3000');
}); 