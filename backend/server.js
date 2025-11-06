// ULTRA SIMPLE BACKEND - NO PACKAGE.JSON NEEDED
const http = require('http');

// Simple data storage
let segments = [];
let campaigns = [];

const server = http.createServer((req, res) => {
    // Allow all origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
   
    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
   
    // Parse JSON body
    let body = '';
    req.on('data', chunk => body += chunk.toString());
   
    req.on('end', () => {
        let data = {};
        if (body && req.method === 'POST') {
            try { data = JSON.parse(body); } catch (e) {}
        }
       
        // API Routes
        if (req.url === '/api/test' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: '🚀 Backend WORKING!',
                timestamp: new Date().toISOString()
            }));
            return;
        }
       
        if (req.url === '/api/upload-csv' && req.method === 'POST') {
            const newSegment = {
                id: 'seg-' + Date.now(),
                name: data.segmentName || 'Test Segment',
                contact_count: 50,
                created_at: new Date().toISOString()
            };
            segments.push(newSegment);
           
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                segment: newSegment,
                stats: { total: 50, successful: 47, errors: 3 }
            }));
            return;
        }
       
        if (req.url === '/api/segments' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(segments));
            return;
        }
       
        if (req.url === '/api/contacts' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify([
                {
                    id: '1',
                    customer_name: 'John Doe',
                    phone: '+2348012345678',
                    whatsapp_opt_in: true,
                    terminals: [{ serial_number: 'POS12345', status: 'inactive' }]
                }
            ]));
            return;
        }
       
        if (req.url === '/api/campaigns' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(campaigns));
            return;
        }
       
        if (req.url === '/api/campaigns' && req.method === 'POST') {
            const newCampaign = {
                id: 'camp-' + Date.now(),
                name: data.name || 'New Campaign',
                template_text: data.template || 'Hello {name}',
                status: 'draft',
                created_at: new Date().toISOString()
            };
            campaigns.push(newCampaign);
           
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newCampaign));
            return;
        }
       
        if (req.url.startsWith('/api/campaigns/') && req.method === 'POST') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                message: 'Campaign sent!',
                messagesSent: 25
            }));
            return;
        }
       
        if (req.url === '/api/dashboard/stats' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                totalContacts: 156,
                contacted: 124,
                agreedReturns: 67,
                returned: 45,
                recoveryRate: '28.8'
            }));
            return;
        }
       
        if (req.url === '/api/messages' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify([
                {
                    id: '1',
                    contact_name: 'John Doe',
                    content: 'Test message',
                    status: 'sent',
                    sent_at: new Date().toISOString()
                }
            ]));
            return;
        }
       
        if (req.url === '/api/quick-reply' && req.method === 'POST') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                message: 'Quick reply sent!'
            }));
            return;
        }
       
        // 404
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🚀 BACKEND RUNNING - NO PACKAGE.JSON!');
    console.log('='.repeat(50));
    console.log('📍 http://localhost:' + PORT);
    console.log('✅ Ready for frontend!');
    console.log('='.repeat(50));
}); 