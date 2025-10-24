const express = require('express');
const app = express();
app.use(express.json());

let contacts = [];
let terminals = [];

app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Backend running' });
});

app.post('/api/upload-contacts', (req, res) => {
  try {
    const { contacts: newContacts, terminals: newTerminals } = req.body;
    contacts = newContacts || [];
    terminals = newTerminals || [];
    res.json({
      success: true,
      message: `Uploaded ${contacts.length} contacts and ${terminals.length} terminals`,
      contacts: contacts,
      terminals: terminals
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get('/api/contacts', (req, res) => {
  res.json({ contacts, terminals });
});

app.post('/api/create-campaign', (req, res) => {
  res.json({
    success: true,
    message: 'Campaign created',
    data: req.body
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port ' + PORT);
}); 