const express = require('express');

const app = express();

app.set('PORT', process.env.PORT || 3333);

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World'  });
});

app.listen(app.get('PORT'), () => {
  console.log(`Server running on *:${app.get('PORT')}`);
});
