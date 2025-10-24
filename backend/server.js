const express = require('express');
const app = express();
app.use(express.json());

let data = { contacts: [], terminals: [] };

app.get('/', (req, res) => {
  res.json({ status: 'OK' });
});

app.post('/api/upload-contacts', (req, res) => {
  data = req.body;
  res.json({ success: true, message: 'Uploaded' });
});

app.get('/api/contacts', (req, res) => {
  res.json(data);
});

app.post('/api/create-campaign', (req, res) => {
  res.json({ success: true, data: req.body });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running');
}); 