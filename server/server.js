const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.post('/process-image', (req, res) => {
  // Process the image URL received from the client
  // You can implement your image processing logic here

  res.send('Image processing completed.');
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
