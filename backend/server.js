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

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
}); 