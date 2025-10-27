const express = require('express');
const app = express();

app.use(express.json());

let contacts = [];
let terminals = [];

app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Backend running' });
});

app.post('/api/upload-contacts', (req, res) => {
  console.log('Received upload request:', req.body);
  contacts = req.body.contacts || [];
  terminals = req.body.terminals || [];
  res.json({
    success: true,
    message: `Uploaded ${contacts.length} contacts and ${terminals.length} terminals`
  });
});

app.get('/api/contacts', (req, res) => {
  res.json({ contacts, terminals });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
}); 