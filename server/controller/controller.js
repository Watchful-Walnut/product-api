const model = require('../model/model.js')

module.exports = {
  getProducts: (req, res) => {
    let page = !isNaN(req.query.page) ? req.query.page : 1;
    let count = !isNaN(req.query.count) ? req.query.count : 5;
    if (page > 0 && count > 0) {
      model.getAllProducts(page, count)
        .then((response) => {
          res.send(response.rows);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      res.status(400).send('Please provide a page/count above 0.')
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
  getStyles: (req, res) => {
    model.getStyles(req.params.product_id)
      .then((response) => {
        const results = {
          product_id: req.params.product_id,
          results: response.rows[0].results
        }
        res.send(results);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      })
  }
}