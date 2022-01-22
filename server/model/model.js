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
          'photos', (SELECT coalesce(style_photos, '[]'::json)
              FROM (
              SELECT json_agg(
              json_build_object(
                  'thumbnail_url', style_photos.thumbnail_url,
                  'url', style_photos.regular_url
              )
              ) AS style_photos from style_photos WHERE style_photos.style_id = styles.id
              ) as photos
                    ),
            'skus', (SELECT coalesce(style_skus, '{}'::json)
                    FROM (
                        SELECT
                        json_object_agg(
                            style_skus.id,
                            json_build_object(
                                'quantity', style_skus.quantity,
                                'size', style_skus.size
                            )
                        ) AS style_skus from style_skus WHERE style_skus.style_id = styles.id
                    ) as skus
                    )
        )
      ) AS results from styles where styles.product_id = $1`,
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
