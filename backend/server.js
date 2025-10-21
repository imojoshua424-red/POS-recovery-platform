const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// SQLite database setup
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Use in-memory database for now

// Create tables
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS terminals (id INTEGER PRIMARY KEY, terminal_id TEXT, customer_name TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS campaigns (id INTEGER PRIMARY KEY, name TEXT, message TEXT, status TEXT)");
});

// Health check route
app.get('/', (req, res) => {
    res.json({ status: 'OK', message: 'POS Recovery Backend is running' });
});

// CSV upload endpoint
app.post('/api/upload-contacts', (req, res) => {
    // Simple response for now - we'll add CSV processing later
    res.json({
        success: true,
        message: 'Upload endpoint ready',
        received: req.body
    });
});

// Campaign creation endpoint
app.post('/api/create-campaign', (req, res) => {
    res.json({
        success: true,
        message: 'Campaign endpoint ready',
        data: req.body
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
}); 