const queries = require("../db/queries");

exports.getHome = async (req, res) => {
  const categories = await queries.getCategories();
  const brands = await queries.getBrands();
  //   console.log(categories, brands);

  return res.render("index", {
    title: "Home",
    categories: categories,
    brands: brands,
  });
};
exports.getAllProducts = async (req, res) => {
  const products = await queries.getAllProducts();
  //   console.log(products);
  res.send(products.map((p) => p.product_name));
};

exports.getByBrand = async (req, res) => {
  const products = await queries.getProductsByBrand(req.params.brand_id);
  res.render("display", {
    title: "Products by Brand",
    brandProducts: products,
  });
};
exports.getByCategory = async (req, res) => {
  const products = await queries.getProductsByCategory(req.params.category_id);
  res.render("display", {
    title: "Products by Category",
    categoryProducts: products,
  });
};
