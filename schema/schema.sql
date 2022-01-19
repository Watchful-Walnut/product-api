DROP DATABASE IF EXISTS products WITH (FORCE);

CREATE DATABASE products;

\c products

CREATE TABLE product (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  product_name VARCHAR(50) NOT NULL,
  slogan TEXT,
  product_description TEXT,
  category VARCHAR(25) NOT NULL,
  default_price INTEGER NOT NULL
);

CREATE TABLE styles (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  product_id INTEGER NOT NULL,
  style_name VARCHAR(50) NOT NULL,
  sale_price TEXT,
  original_price INTEGER NOT NULL CHECK (original_price >= 0),
  isDefault BOOLEAN NOT NULL,
  FOREIGN KEY(product_id)
  REFERENCES product(id)
);

CREATE TABLE style_photos (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  style_id INTEGER NOT NULL,
  regular_url TEXT,
  thumbnail_url TEXT,
  FOREIGN KEY(style_id)
  REFERENCES styles(id)
);

CREATE TABLE style_skus (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  style_id INTEGER NOT NULL,
  size VARCHAR(10) NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY(style_id)
  REFERENCES styles(id)
);

CREATE TABLE related (
  id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  current_product_id INTEGER NOT NULL,
  FOREIGN KEY(current_product_id)
  REFERENCES product(id),
  related_product_id INTEGER NOT NULL
);

CREATE INDEX ON styles (product_id);
CREATE INDEX ON style_skus (style_id);
CREATE INDEX ON style_photos (style_id);
CREATE INDEX ON features (product_id);
CREATE INDEX ON related (current_product_id);

--primary product and related product id