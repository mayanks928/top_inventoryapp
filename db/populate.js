require("dotenv").config();
const { Client } = require("pg");

CREATE_1 = `
CREATE TABLE IF NOT EXISTS categories(
category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
category_name VARCHAR(100) NOT NULL);`;

CREATE_2 = `CREATE TABLE IF NOT EXISTS brands(
brand_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
brand_name VARCHAR(100) NOT NULL);`;

CREATE_3 = `CREATE TABLE IF NOT EXISTS attributes(
attribute_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
attribute_name VARCHAR(100) NOT NULL);`;

CREATE_4 = `CREATE TABLE IF NOT EXISTS products(
product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
product_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
description TEXT,
category_id INT REFERENCES categories(category_id),
brand_id INT REFERENCES brands(brand_id),
quantity INT NOT NULL DEFAULT 0,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
CREATE_5 = `CREATE TABLE IF NOT EXISTS product_attr(
product_id INTEGER REFERENCES products(product_id),
attribute_id INTEGER REFERENCES attributes(attribute_id),
attribute_value VARCHAR(100) NOT NULL,
PRIMARY KEY(product_id,attribute_id));
`;
INSERT_1 = `INSERT INTO categories(category_name)
VALUES ('Shirt'),('T-Shirt'),('Shoes'),('Jeans'),('Pants'),('Jacket'),('Skirt'),('Shorts');`;
INSERT_2 = `INSERT INTO brands(brand_name) VALUES ('Nice'),('Abidas'),('Pume'),('DCC'),('Zala'),('Ven Hezen'),('Max n Spendz'),('Generic');`;
INSERT_3 = `INSERT INTO attributes(attribute_name) VALUES('Color'),('Size');`;
INSERT_4 = `INSERT INTO products (product_name, price, description, category_id, brand_id) VALUES
-- Shirts
('Classic Button-Down Shirt', 29.99, 'A classic button-down shirt in various colors.', 1, 1),
('Slim Fit Shirt', 34.99, 'A slim fit shirt with a modern design.', 1, 2),
('Casual Short-Sleeve Shirt', 24.99, 'A casual short-sleeve shirt for everyday wear.', 1, 3),

-- T-Shirts
('Graphic T-Shirt', 19.99, 'A graphic t-shirt with a bold design.', 2, 4),
('Plain Cotton T-Shirt', 14.99, 'A plain cotton t-shirt available in multiple colors.', 2, 5),
('Vintage Print T-Shirt', 22.99, 'A vintage print t-shirt with retro style.', 2, 6),

-- Shoes
('Running Shoes', 49.99, 'Comfortable running shoes for all activities.', 3, 7),
('Leather Dress Shoes', 79.99, 'Elegant leather dress shoes for formal occasions.', 3, 8),
('Casual Sneakers', 39.99, 'Stylish casual sneakers for everyday use.', 3, 1),

-- Jeans
('Dark Wash Jeans', 44.99, 'Dark wash jeans with a classic fit.', 4, 2),
('Distressed Denim Jeans', 54.99, 'Distressed denim jeans with a trendy look.', 4, 3),
('Bootcut Jeans', 49.99, 'Bootcut jeans for a relaxed fit.', 4, 4),

-- Pants
('Chinos', 39.99, 'Casual chinos with a comfortable fit.', 5, 5),
('Formal Trousers', 59.99, 'Formal trousers for professional settings.', 5, 6),
('Cargo Pants', 44.99, 'Durable cargo pants with multiple pockets.', 5, 7),

-- Jackets
('Leather Jacket', 89.99, 'A premium leather jacket with a stylish design.', 6, 8),
('Denim Jacket', 69.99, 'Classic denim jacket with a timeless appeal.', 6, 1),
('Puffer Jacket', 99.99, 'Warm puffer jacket for cold weather.', 6, 2),

-- Skirts
('A-Line Skirt', 29.99, 'Elegant A-line skirt for formal or casual wear.', 7, 3),
('Pencil Skirt', 34.99, 'Form-fitting pencil skirt for a sleek look.', 7, 4),
('Flared Skirt', 24.99, 'Flared skirt with a comfortable fit.', 7, 5),

-- Shorts
('Cargo Shorts', 27.99, 'Cargo shorts with multiple pockets for practicality.', 8, 6),
('Denim Shorts', 23.99, 'Stylish denim shorts for summer.', 8, 7),
('Athletic Shorts', 21.99, 'Comfortable athletic shorts for workouts.', 8, 8),

-- Additional Products
('Graphic T-Shirt 2', 19.99, 'Another graphic t-shirt with unique design.', 2, 1),
('Casual Sneakers 2', 35.99, 'Another pair of stylish casual sneakers.', 3, 2),
('Formal Trousers 2', 59.99, 'Another pair of formal trousers for professional settings.', 5, 3),
('Distressed Denim Jeans 2', 56.99, 'Another pair of distressed denim jeans with a trendy look.', 4, 4),
('Bootcut Jeans 2', 48.99, 'Another pair of bootcut jeans for a relaxed fit.', 4, 5),
('Slim Fit Shirt 2', 32.99, 'Another slim fit shirt with a modern design.', 1, 6),
('Vintage Print T-Shirt 2', 23.99, 'Another vintage print t-shirt with retro style.', 2, 7),
('Leather Jacket 2', 92.99, 'Another premium leather jacket with a stylish design.', 6, 8),
('A-Line Skirt 2', 31.99, 'Another elegant A-line skirt for formal or casual wear.', 7, 1),
('Cargo Shorts 2', 29.99, 'Another pair of cargo shorts with multiple pockets.', 8, 2),
('Running Shoes 2', 52.99, 'Another pair of comfortable running shoes.', 3, 3),
('Plain Cotton T-Shirt 2', 16.99, 'Another plain cotton t-shirt available in multiple colors.', 2, 4),
('Puffer Jacket 2', 101.99, 'Another warm puffer jacket for cold weather.', 6, 5),
('Chinos 2', 41.99, 'Another pair of casual chinos with a comfortable fit.', 5, 6),
('Pencil Skirt 2', 36.99, 'Another form-fitting pencil skirt for a sleek look.', 7, 7),
('Denim Shorts 2', 25.99, 'Another stylish pair of denim shorts for summer.', 8, 8),
('Casual Short-Sleeve Shirt 2', 26.99, 'Another casual short-sleeve shirt for everyday wear.', 1, 1),
('Graphic T-Shirt 3', 21.99, 'A third graphic t-shirt with a different design.', 2, 2),
('Leather Dress Shoes 2', 82.99, 'Another pair of elegant leather dress shoes.', 3, 3),
('Dark Wash Jeans 2', 46.99, 'Another pair of dark wash jeans with a classic fit.', 4, 4),
('Athletic Shorts 2', 23.99, 'Another comfortable pair of athletic shorts.', 8, 5),
('Cargo Pants 2', 47.99, 'Another pair of durable cargo pants with multiple pockets.', 5, 6),
('Denim Jacket 2', 72.99, 'Another classic denim jacket with a timeless appeal.', 6, 7),
('Puffer Jacket 3', 104.99, 'A third warm puffer jacket for cold weather.', 6, 8),
('Flared Skirt 2', 26.99, 'Another flared skirt with a comfortable fit.', 7, 1),
('Vintage Print T-Shirt 3', 25.99, 'A third vintage print t-shirt with retro style.', 2, 2),
('Formal Trousers 3', 61.99, 'A third pair of formal trousers for professional settings.', 5, 3),
('Distressed Denim Jeans 3', 58.99, 'A third pair of distressed denim jeans with a trendy look.', 4, 4),
('Slim Fit Shirt 3', 35.99, 'A third slim fit shirt with a modern design.', 1, 5),
('Plain Cotton T-Shirt 3', 18.99, 'A third plain cotton t-shirt available in multiple colors.', 2, 6),
('Running Shoes 3', 55.99, 'A third pair of comfortable running shoes.', 3, 7),
('Casual Sneakers 3', 37.99, 'A third pair of stylish casual sneakers.', 3, 8),
('Bootcut Jeans 3', 50.99, 'A third pair of bootcut jeans for a relaxed fit.', 4, 1)`;

async function main() {
  console.log("Starting populating");
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  });
  await client.connect();
  // await client.query(CREATE_1);
  // await client.query(CREATE_2);
  // await client.query(CREATE_3);
  // await client.query(CREATE_4);
  // await client.query(CREATE_5);
  // console.log("Created Tables");

  // await client.query(INSERT_1);
  // await client.query(INSERT_2);
  // await client.query(INSERT_3);
  // await client.query(INSERT_4);
  console.log("Inserted Data");

  await client.end();

  console.log("Done");
}
main();
