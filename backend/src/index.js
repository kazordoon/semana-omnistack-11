const express = require('express');

const routes = require('./routes');

const app = express();

app.set('PORT', process.env.PORT || 3333);

app.use(express.json());

app.use(routes);

app.listen(app.get('PORT'), () => {
  console.log(`Server running on *:${app.get('PORT')}`);
});
