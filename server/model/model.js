const db = require('../../database/database.js');

module.exports = {
  getAllProducts: (page, count) => {
    const currentId = (count * (page - 1)) + 1;
    const lastId = currentId + (count - 1);
    const query = {
      text: 'SELECT * FROM product WHERE id >= $1 and id <= $2',
      values: [currentId, lastId]
    }
    return db.query(query);
  },
  getSingleProduct: (product_id) => {
    const query = {
      text: 'SELECT * FROM product WHERE id = $1',
      values: [product_id]
    }
    return db.query(query);
  },
  getStyles: (product_id) => {
    const query = {
      text: `SELECT json_agg(
        json_build_object(
          'style_id', styles.id,
          'name', styles.style_name,
          'original_price', styles.original_price,
          'sale_price', styles.sale_price,
          'default?', styles.isDefault
        )
      ) results
      FROM styles WHERE product_id = $1`,
      values: [product_id]
    }
    return db.query(query);
  }
}