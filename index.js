const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/hello', (req, res) => {
  const delay = parseInt(req.query.delay) || 0;
  console.log(`Received request, delaying by ${delay}ms`);
  setTimeout(() => {
    res.json({ message: `Response delayed by ${delay} ms` });
  }, delay);
});

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});