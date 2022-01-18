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
      text: `SELECT
        json_agg(
          json_build_object(
            'style_id', styles.id,
            'name', styles.style_name,
            'original_price', styles.original_price,
            'sale_price', styles.sale_price,
            'default?', styles.isDefault,
            'photos', photos,
            'skus', skus
          )
        ) results
      FROM styles
      LEFT JOIN (
        SELECT
          style_id,
          json_agg(
            json_build_object(
              'thumbnail_url', style_photos.thumbnail_url,
              'url', style_photos.regular_url
            )
          ) photos
        FROM
          style_photos
        GROUP BY style_id
      ) style_photos ON (styles.id = style_photos.style_id)
      LEFT JOIN (
        SELECT
          style_id,
          json_object_agg(
            style_skus.id,
            json_build_object(
              'quantity', style_skus.quantity,
              'size', style_skus.size
            )
          ) skus
        FROM
          style_skus
        GROUP BY style_id
      ) style_skus ON (styles.id = style_skus.style_id)
      WHERE product_id = $1`,
      values: [product_id]
    }
    return db.query(query);
  },
  getRelated: (product_id) => {
    const query = {
      text: `SELECT
        json_agg(
          related_product_id
        )
        FROM related
        WHERE current_product_id = $1`,
      values: [product_id]
    }
    return db.query(query);
  }
}
