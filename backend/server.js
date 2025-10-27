const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let contacts = [];
let terminals = [];

app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Backend running' });
});

// ADD THIS ENDPOINT:
app.post('/api/upload-contacts', (req, res) => {
  contacts = req.body.contacts || [];
  terminals = req.body.terminals || [];
  res.json({
    success: true,
    message: `Uploaded ${contacts.length} contacts and ${terminals.length} terminals`
  });
});

// ADD THIS ENDPOINT:
app.get('/api/contacts', (req, res) => {
  res.json({ contacts, terminals });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
}); 