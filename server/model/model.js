const db = require('../../database/database.js');

module.exports = {
  getAllProducts: (page, count) => {
    const productCount = page * count;
    const query = {
      text: 'SELECT * FROM product WHERE id >= 1 and id <= $1',
      values: [productCount]
    }
    return db.query(query);
  },
  getSingleProduct: (product_id) => {
    const query = {
      text: 'SELECT * FROM product WHERE id = $1',
      values: [product_id]
    }
    return db.query(query);
  }
}