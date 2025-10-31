// SIMPLE POS BACKEND - NO INSTALLATION NEEDED
const http = require('http');
const fs = require('fs');
const path = require('path');

// Simple data storage
let segments = [];
let campaigns = [];
let contacts = [];
let messages = [];

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
   
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
   
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
   
    req.on('end', () => {
        let jsonData = {};
        if (body && req.method === 'POST') {
            try {
                jsonData = JSON.parse(body);
            } catch (e) {
                // Ignore parse errors
            }
        }
       
        // API Routes
        if (req.url === '/api/test' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: '🚀 Cosmic POS Backend - NO INSTALLATION!',
                timestamp: new Date().toISOString(),
                status: 'working'
            }));
            return;
        }
       
        if (req.url === '/api/segments' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(segments));
            return;
        }
       
        if (req.url === '/api/upload-csv' && req.method === 'POST') {
            const segmentId = 'seg-' + Date.now();
            const newSegment = {
                id: segmentId,
                name: jsonData.segmentName || 'New Segment',
                contact_count: 50,
                created_at: new Date().toISOString()
            };
            segments.push(newSegment);
           
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                segment: newSegment,
                stats: {
                    total: 50,
                    successful: 47,
                    errors: 3
                }
            }));
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
                    terminals: [
                        { id: 't1', serial_number: 'POS12345', status: 'inactive' }
                    ]
                },
                {
                    id: '2',
                    customer_name: 'Jane Smith',
                    phone: '+2348023456789',
                    whatsapp_opt_in: true,
                    terminals: [
                        { id: 't2', serial_number: 'POS67890', status: 'contacted' }
                    ]
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
                name: jsonData.name || 'New Campaign',
                template_text: jsonData.template || 'Hello {name}, return terminal {serial} for ₦5,000',
                status: 'draft',
                created_at: new Date().toISOString()
            };
            campaigns.push(newCampaign);
           
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newCampaign));
            return;
        }
       
        if (req.url.startsWith('/api/campaigns/') && req.url.endsWith('/send') && req.method === 'POST') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                message: 'Campaign sent successfully!',
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
                    content: 'Hello, please return your terminal POS12345 for ₦5,000',
                    status: 'sent',
                    sent_at: new Date().toISOString(),
                    direction: 'outbound'
                }
            ]));
            return;
        }
       
        if (req.url === '/api/quick-reply' && req.method === 'POST') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                message: 'Quick reply sent successfully!'
            }));
            return;
        }
       
        // 404 for unknown routes
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            error: 'Route not found: ' + req.url,
            available_routes: [
                'GET  /api/test',
                'GET  /api/segments',
                'POST /api/upload-csv',
                'GET  /api/contacts',
                'GET  /api/campaigns',
                'POST /api/campaigns',
                'POST /api/campaigns/:id/send',
                'GET  /api/dashboard/stats',
                'GET  /api/messages',
                'POST /api/quick-reply'
            ]
        }));
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🚀 COSMIC POS BACKEND - NO INSTALLATION!');
    console.log('='.repeat(50));
    console.log('📍 http://localhost:' + PORT);
    console.log('✅ Ready to connect with frontend!');
    console.log('='.repeat(50));
}); 