SELECT * from styles
INNER JOIN style_photos ON (styles.id = style_photos.style_id)
INNER JOIN style_skus ON (styles.id = style_skus.style_id)
WHERE styles.product_id = 5;