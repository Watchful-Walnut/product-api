const express = require('express');
const controller = require('./controller/controller.js');
require('newrelic');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// ROUTES

// GET REQUESTS
app.get('/products', controller.getProducts);
app.get('/products/:product_id', controller.getSingleProduct);
app.get('/products/:product_id/styles', controller.getStyles);
app.get('/products/:product_id/related', controller.getRelated);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
