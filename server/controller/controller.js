const model = require('../model/model.js')

module.exports = {
  getProducts: (req, res) => {
    let page = !isNaN(req.query.page) ? req.query.page : 1;
    let count = !isNaN(req.query.count) ? req.query.count : 5;
    if (!req.query.product_id) {
      model.getAllProducts(page, count)
        .then((response) => {
          res.send(response.rows);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (!isNaN(req.query.product_id)) {
      model.getSingleProduct(req.query.product_id)
        .then((response) => {
          res.send(response.rows);
        })
        .catch((error) => {
          console.log(error);
          res.send(error);
        });
    } else {
      res.status(400).send('Please provide a valid product id.')
    }
  },
  getSingleProduct: (req, res) => {
    if (!isNaN(req.params.product_id)) {
      model.getSingleProduct(req.params.product_id)
        .then((response) => {
          res.send(response.rows);
        })
        .catch((error) => {
          console.log(error);
          res.send(error);
        });
    } else {
      res.status(400).send('Please provide a valid product id.')
    }
  },
}