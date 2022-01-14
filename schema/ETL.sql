\COPY product(id, product_name, slogan, product_description, category, default_price)
FROM '/Users/brantsai/Downloads/product.csv'
DELIMITER ','
CSV HEADER;

\COPY styles(id, product_id, style_name, sale_price, original_price, isDefault)
FROM '/Users/brantsai/Downloads/styles.csv'
DELIMITER ','
CSV HEADER;

\COPY style_photos(id, style_id, regular_url, thumbnail_url)
FROM '/Users/brantsai/Downloads/photos.csv'
DELIMITER ','
CSV HEADER;

\COPY style_skus(id, style_id, size, quantity)
FROM '/Users/brantsai/Downloads/skus.csv'
DELIMITER ','
CSV HEADER;

\COPY features(id, product_id, feature, value)
FROM '/Users/brantsai/Downloads/features.csv'
DELIMITER ','
CSV HEADER;

\COPY related(id, current_product_id, related_product_id)
FROM '/Users/brantsai/Downloads/related.csv'
DELIMITER ','
CSV HEADER;