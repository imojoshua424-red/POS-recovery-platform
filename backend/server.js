const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Backend running' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
}); 