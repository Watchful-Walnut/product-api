const express = require('express');
const controller = require('./controller/controller.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/products', controller.getProducts);
app.get('/api/products/:product_id', controller.getSingleProduct);
app.get('/api/products/:product_id/styles', controller.getStyles);
app.get('/api/products/:product_id/related', controller.getRelated);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
