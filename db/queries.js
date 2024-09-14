const pool = require("./pool");
async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories;");
  return rows;
}
async function getBrands() {
  const { rows } = await pool.query("SELECT * FROM brands;");
  return rows;
}
async function getProductsByCategory(category_id) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE category_id=$1;",
    [category_id]
  );
  return rows;
}
async function getProductsByBrand(brand_id) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE brand_id=$1;",
    [brand_id]
  );
  return rows;
}
async function getAllProducts() {
  const { rows } = await pool.query("SELECT * FROM products;");
  return rows;
}
async function getProductById(product_id) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE product_id=$1;",
    [product_id]
  );
  return rows[0];
}
async function editProductById(item) {
  await pool.query(
    "UPDATE products SET product_name=$2,description=$3, price=$4, quantity=$5, updated_at=DEFAULT WHERE product_id=$1;",
    [
      item.product_id,
      item.product_name,
      item.description,
      item.price,
      item.quantity,
    ]
  );
}
module.exports = {
  getCategories,
  getBrands,
  getAllProducts,
  getProductById,
  getProductsByBrand,
  getProductsByCategory,
  editProductById,
};
