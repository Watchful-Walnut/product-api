SELECT
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
      INNER JOIN (
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
      INNER JOIN (
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
      WHERE product_id = 1;